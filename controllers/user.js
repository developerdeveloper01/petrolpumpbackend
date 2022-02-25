// const Adminlogin = require("../models/adminlogin");
// const bcrypt = require("bcrypt");

// const validatePassword = (password, dbpassword) => {
//   bcrypt.compareSync(password, dbpassword);
//   return true;
// };

// exports.adminlogin = async (req, res) => {
//   const { email, password } = req.body;
//   const admin = await Adminlogin.findOne({ email: email });

//   if (admin) {
//     const validPass = await bcrypt.compare(password, admin.cnfmPassword);
//     if (validPass) {
//       const token = jwt.sign(
//         {
//           adminId: admin._id,
//         },
//         process.env.TOKEN_SECRET,
//         {
//           expiresIn: 86400000,
//         }
//       );
//       res.header("auth-admintoken", token).status(200).send({
//         status: true,
//         token: token,
//         msg: "success",
//         user: admin,
//       });
//     } else {
//       res.status(400).json({
//         status: false,
//         msg: "Incorrect Password",
//         error: "error",
//       });
//     }
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "User Doesnot Exist",
//       error: "error",
//     });
//   }
// };
// };
