const Bank = require("../models/bank");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
exports.addbank = async (req, res) => {
  const {
    name_of_bank,
    credit_limit_of_bank,
    intrest_rates,
    ifsc_code,
    cresit_offer,
    document_upload
  } = req.body;

  const newbank= new Bank({
    name_of_bank: name_of_bank,
    credit_limit_of_bank: credit_limit_of_bank,
    intrest_rates: intrest_rates,
    ifsc_code: ifsc_code,
    cresit_offer: cresit_offer,
    document_upload: document_upload
  });
    if (req.files.document_upload) {
      alluploads = [];
      for (let i = 0; i < req.files.document_upload.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.document_upload[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.document_upload[i].path);
        alluploads.push(resp.secure_url);
      }
      newbank.document_upload = alluploads;
    }
   

    newbank
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
  };

  exports.allbank = async (req, res) => {
    await Bank
      .find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.getonebank = async (req, res) => {
    await Bank
      .findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.deletebank = async (req, res) => {
    await Bank
      .deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.updateonebank = async (req, res) => {
    const findoneandupdate = Bank
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: req.body,
        },
        { new: true }
      )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  