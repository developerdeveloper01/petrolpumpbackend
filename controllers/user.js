const Adminlogin = require("../models/adminlogin");
const resp = require("../helpers/apiresponse");
const bcrypt = require("bcrypt");

const validatePassword = (password, dbpassword) => {
  bcrypt.compareSync(password, dbpassword);
  return true;
};

exports.adminlogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Adminlogin.findOne({ email: email });

  if (admin) {
    const validPass = await bcrypt.compare(password, admin.cnfmPassword);
    if (validPass) {
      const token = jwt.sign(
        {
          adminId: admin._id,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: 86400000,
        }
      );
      res.header("auth-admintoken", token).status(200).send({
        status: true,
        token: token,
        msg: "success",
        user: admin,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "Incorrect Password",
        error: "error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "User Doesnot Exist",
      error: "error",
    });
  }
};

// const Adminlogin = require("../models/adminlogin");
// // const bcrypt = require("bcrypt");
// // const saltRounds = 10;
// // const jwt = require("jsonwebtoken");
// // const cloudinary = require("cloudinary").v2;
// // const fs = require("fs");

// // const validatePassword = (password, dbpassword) => {
// //   bcrypt.compareSync(password, dbpassword);
// //   return true;
// // };

// // function generateAccessToken(mobile) {
// //   return jwt.sign(mobile, process.env.TOKEN_SECRET, { expiresIn: "1800h" });
// // }

// const validatePassword = (password, dbpassword) => {
//   bcrypt.compareSync(password, dbpassword);
//   return true;
// };

// exports.adminlogin = async (req, res) => {
//   const { admin_name, email, mobile, password, cnfmPassword } = req.body;
//   const salt = bcrypt.genSaltSync(saltRounds);
//   const hashpassword = bcrypt.hashSync(cnfmPassword, salt);
//   const newAdminlogin = new Adminlogin({
//     admin_name: admin_name,
//     mobile: mobile,
//     email: email,
//     password: hashpassword,
//     cnfmPassword: hashpassword,
//   });

//   newAdminlogin
//     .save()
//     .then((data) => {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: data,
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         status: false,
//         msg: "error",
//         error: error,
//       });
//     });
// };
