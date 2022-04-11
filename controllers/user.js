const User = require("../models/user");
const resp = require("../helpers/apiresponse");
//const bcrypt = require("bcrypt");
//const User = require("../models/user");

const bcrypt = require("bcryptjs");
//const cloudinary = require("cloudinary").v2;
const key = "verysecretkey";
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


(exports.signup = async (req, res, next) => {
  const user = new User(req.body);
  try {
    const userexist = await User.findOne({ email: req.body.email });
    if (userexist) {
      let errorresponse = {
        status: 401,
        error: true,
        success: false,
        message: "Email already exist",
        data: [],
      }
     // res.send(errorresponse);

    }
      else if (req.files) {
        if (req.files.profilepic[0].path) {
          alluploads = [];
          for (let i = 0; i < req.files.profilepic.length; i++) {
            const resp = await cloudinary.uploader.upload(
              req.files.profilepic[i].path,
              { use_filename: true, unique_filename: false }
            );
            fs.unlinkSync(req.files.profilepic[i].path);
            alluploads.push(resp.secure_url);
          }
          user.profilepic = alluploads;
        }
//res.send(errorresponse);
    
    }

   if (req.files) {
      if (req.files.logo[0].path) {
        Logo = [];
        for (let i = 0; i < req.files.profilepic.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.logo[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.logo[i].path);
          Logo.push(resp.secure_url);
        }
        user.logo = Logo;
      }
//res.send(errorresponse);
  
  }

    //const user = new User(req.body);
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
  exports.updateonebank = async (req, res) => {
    const { name, email, mobile, resetpassword,profilepic,logo,changepassword } = req.body;

    data = {};
    if (name) {
      data.name = name;
    }
    if (email) {
      data.email = email;
    }
    if (mobile) {
      data.mobile = mobile;
    }
    if (resetpassword) {
      data.resetpassword = resetpassword;
    }if (profilepic) {
      data.profilepic = profilepic;
    }if (changelogo) {
      data.logo = logo;
    }
    if (changepassword) {
      data.changepassword = changepassword;
    }
    // if (password) {
    //   data.password = password;
    // }
    // if(cnfrm_password){
    //   data.cnfrm_password = cnfrm_password
    // }
   
    console.log(req.params.id);
    const userexist = await User.findOne({ email: req.body.email });
    if (userexist) {
      let errorresponse = {
        status: 401,
        error: true,
        success: false,
        message: "Email already exist",
        data: [],
      }
     // res.send(errorresponse);

    }
    // const userexist = await User.findOne({ email: req.body.email });
    // if (userexist) {
    //   let errorresponse = {
    //     status: 401,
    //     error: true,
    //     success: false,
    //     message: "Email already exist",
    //     data: [],
    //   }
    //  // res.send(errorresponse);

    // }
  await User
   
      .findOneAndUpdate(
        {
          _id: req.params.id,
        //  console.log(req.params._id);
      },
        {
          $set: req.body,
        },
        { new: true }
      )
      
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
      console.log(req.params._id);
  };
  

//console
