const Dealershipform = require("../models/dealershipform");
const resp = require("../helpers/apiresponse");
const jwt = require("jsonwebtoken");
const key = "verysecretkey";

exports.signupsendotp = async (req, res) => {
  const { mobile } = req.body;
  let length = 6;
  //   let otp = (
  //     "0".repeat(length) + Math.floor(Math.random() * 10 ** length)
  //   ).slice(-length);
  let otp = "123456";

  const newDealershipform = new Dealershipform({
    mobile: mobile,
  });
  const findexist = await Dealershipform.findOne({ mobile: mobile });
  if (findexist) {
    res.json({
      status: "success",
      msg: "Welcome Back Otp send successfully",
      registered: findexist?.mobile,
      _id: findexist?._id,
      otp: otp,
    });
  } else {
    newDealershipform.otp = otp;
    newDealershipform
      .save()
      .then((data) =>
        res.json({
          status: "success",
          msg: "Otp send successfully",
          registered: data?.mobile,
          _id: data?._id,
          otp: otp,
        })
      )
      .catch((error) => resp.errorr(res, error));
  }
};

exports.verifyotp = async (req, res) => {
  const { mobile, otp } = req.body;
  const dealerDetail = await Dealershipform.findOne({ mobile: mobile });
  if (dealerDetail) {
    if (otp == "123456") {
      if (dealerDetail.userverified) {
        const token = jwt.sign(
          {
            dealerId: dealerDetail._id,
          },
          key,
          {
            expiresIn: "365d",
          }
        );
        await Dealershipform.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          { $set: { userverified: true } },
          { new: true }
        ).then((data) => {
          res.json({
            status: "success",
            token: token,
            msg: "Welcome Back",
            otpverified: true,
            redirectto: "dashboard",
            data: data,
          });
        });
      } else {
        if (!dealerDetail.userverified) {
          const token = jwt.sign(
            {
              dealerId: dealerDetail._id,
            },
            key,
            {
              expiresIn: "365d",
            }
          );
          res.json({
            status: "success",
            token: token,
            msg: "Continue signup",
            otpverified: true,
            redirectto: "signupdetail"
          });
        }
      }
    } else {
      res.json({
        status: "failed",
        msg: "Incorrect OTP",
      });
    }
  } else {
    res.json({
      status: "error",
      msg: "User doesnot exist",
    });
  }
};

exports.editdealershipform = async (req, res) => {
  await Dealershipform.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneDealershipform = async (req, res) => {
  await Dealershipform.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.alldealers = async (req, res) => {
  await Dealershipform.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteDealershipform = async (req, res) => {
  await Dealershipform.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
