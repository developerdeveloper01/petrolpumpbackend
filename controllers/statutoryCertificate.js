const statutoryCertificate = require("../models/statutoryCertificate");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addstatutoryCertificate= async (req, res) => {
  const {
    Due_Date_of_Stamping,
    Upload_5l,
    Class_A,
    Class_B,
    Due_Date_of_PESO,
    Upload_PESO,
    scale,
    Hydrometer_Due_Date,
    Upload_Hydrometer,
    Calibration_Due_Date,
    Upload_Thermometer_1,
    Upload_Thermometer2,
    Due_Date_of_Calibration,
    Upload_Air_Gauage,
    DPSL_Due_Date,
    Upload_DPSL,
    Remarks,
    Due_Date,
    Add_Other_Documents


  } = req.body;

  const newstatutoryCertificate = new statutoryCertificate({
    Due_Date_of_Stamping:Due_Date_of_Stamping,
    Upload_5l:Upload_5l,
    Class_A:Class_A,
    Class_B:Class_B,
    Due_Date_of_PESO :Due_Date_of_PESO,
    Upload_PESO :Upload_PESO,
    scale:scale,
    Hydrometer_Due_Date:Hydrometer_Due_Date,
    Upload_Hydrometer:Upload_Hydrometer,
    Calibration_Due_Date:Calibration_Due_Date,
    Upload_Thermometer_1:Upload_Thermometer_1,
    Upload_Thermometer2:Upload_Thermometer2,
    Due_Date_of_Calibration:Due_Date_of_Calibration,
    Upload_Air_Gauage:Upload_Air_Gauage,
    DPSL_Due_Date:DPSL_Due_Date,
    Upload_DPSL:Upload_DPSL,
    Remarks:Remarks,
    Due_Date:Due_Date,
    Add_Other_Documents:Add_Other_Documents
  });

  const findexist = await statutoryCertificate.findOne({ scale: scale });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  } else if (req.files) {
    if (req.files.Upload_5l[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_5l.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_5l[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_5l[i].path);
        alluploads.push(resp.secure_url);
      }
      newstatutoryCertificate.Upload_5l = alluploads;
    }

    // console.log("req.files.photograh", req.files.photograh)

    if (req.files.Upload_PESO[0].path) {
        Upload_PESO_arry = [];
      for (let i = 0; i < req.files.Upload_PESO.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_PESO[i].path,
          { use_filename: true, unique_filename: false },
          function (cb) {}
        );
        fs.unlinkSync(req.files.Upload_PESO[i].path);
        Upload_PESO_arry.push(resp.secure_url);
      }
      newstatutoryCertificate.Upload_PESO = Upload_PESO_arry;
    }

    if (req.files.Upload_Hydrometer[0].path) {
        Upload_Hydrometer_Array = [];
      for (let i = 0; i < req.files.Upload_Hydrometer.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Hydrometer[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Hydrometer[i].path);
        Upload_Hydrometer_Array.push(resp.secure_url);
      }
      newstatutoryCertificate.Upload_Hydrometer = Upload_Hydrometer_Array;
    }
 

    newstatutoryCertificate
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  } else {
    res.status(200).json({
      status: false,
      msg: "img not uploaded",
    });
  }
};

// exports.allmanager = async (req, res) => {
//   await Manegeraddfrom.find()
//     .sort({ sortorder: 1 })
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };

// exports.getonemanager = async (req, res) => {
//   await Manegeraddfrom.findOne({ _id: req.params.id })
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };

// exports.deletemanager = async (req, res) => {
//   await Manegeraddfrom.deleteOne({ _id: req.params.id })
//     .then((data) => resp.deleter(res, data))
//     .catch((error) => resp.errorr(res, error));
// };

// exports.updateonemanager = async (req, res) => {
//   const findoneandupdate = Manegeraddfrom.findOneAndUpdate(
//     {
//       _id: req.params.id,
//     },
//     {
//       $set: req.body,
//     },
//     { new: true }
//   )
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };

// //console
