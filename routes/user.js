const express = require("express");
const router = express.Router();
const { verifyToken } = require("../functions/tokenverify");

const {
  signup,
  login,
  //   setting,
  //   changepass,
  //   changepassid,
  //   viewoneuser,
  //   edituser,
  //   allusers,
  //   deleteuser,
  //   myprofile
} = require("../controllers/user");
//router.post("/user/setting", tokenverify, setting);
router.post("/user/signup", signup);
router.post("/user/login", login);

module.exports = router;
