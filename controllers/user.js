const User = require("../models/user");
const resp = require("../helpers/apiresponse");
//const bcrypt = require("bcrypt");
//const User = require("../models/user");

const bcrypt = require("bcryptjs");
//const cloudinary = require("cloudinary").v2;
const key = "verysecretkey";
const jwt = require("jsonwebtoken");

(exports.signup = async (req, res, next) => {
  try {
    const userexist = await User.findOne({ email: req.body.email });
    if (userexist) {
      let errorresponse = {
        status: 401,
        error: true,
        success: false,
        message: "Email already exist",
        data: [],
      };
      res.send(errorresponse);
    }
    const user = new User(req.body);
    const result = await user.save();
    const response = {
      status: 200,
      error: false,
      success: true,
      message: "register success",
      data: result,
    };
    res.send(response);
  } catch (error) {
    console.log(error.message);
    if (error.name === "ValidationError") {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
}),
  // exports.signup = async (req, res) => {
  //   const { name, email, mobile, password, cnfmPassword } = req.body;

  //   // const salt = await bcrypt.genSalt(10);
  //   // const hashPassword = await bcrypt.hash(password, salt);

  //   const newuser = new User({
  //     name: name,
  //     email: email,
  //     mobile: mobile,
  //     password: password,
  //     cnfmPassword: cnfmPassword,
  //   });

  //   const findexist = await User.findOne({
  //     $or: [{ email: email }, { mobile: mobile }],
  //   });
  //   if (findexist) {
  //     resp.alreadyr(res);
  //   } else {
  //     newuser
  //       .save()
  //       .then((result) => {
  //         const token = jwt.sign(
  //           {
  //             userId: result._id,
  //           },
  //           key,
  //           {
  //             expiresIn: 86400000,
  //           }
  //         );
  //         res.header("auth-token", token).status(200).json({
  //           status: true,
  //           "auth-token": token,
  //           msg: "success",
  //           user: result,
  //         });
  //       })
  //       .catch((error) => resp.errorr(res, error));
  //   }
  // };

  // exports.login = async (req, res) => {
  //   const { mobile, email, password } = req.body;
  //   const user = await User.findOne({
  //     $or: [{ mobile: mobile }, { email: email }],
  //   });
  //   if (user) {
  //     const validPass = await bcrypt.compare(password, user.password);
  //     if (validPass) {
  //       const token = jwt.sign(
  //         {
  //           userId: user._id,
  //         },
  //         key,
  //         {
  //           expiresIn: 86400000,
  //         }
  //       );
  //       res.header("auth-token", token).status(200).send({
  //         status: true,
  //         token: token,
  //         msg: "success",
  //         user: user,
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

  (exports.login = async (req, res, next) => {
    try {
      let { email, password } = req.body;
      if (!email) {
        const response = {
          status: 401,
          error: true,
          success: false,
          message: "email or mobile_number is requerd",
          data: [],
        };
        res.send(response);
      }
      const userdetails = await User.findOne({
        $or: [
          { mobile_number: req.body.username, password: req.body.password },
          { email: req.body.username, password: req.body.password },
        ],
      });

      if (userdetails) {
        const response = {
          status: 200,
          error: false,
          success: true,
          message: "login success",
          data: userdetails,
        };
        res.send(response);
      } else {
        const response = {
          status: 401,
          error: true,
          success: false,
          message: "username or password not match",
          data: [],
        };
        res.send(response);
      }
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  });
