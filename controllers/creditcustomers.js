const Creditcustomers = require("../models/creditcustomers");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

exports.addcreditcustomer = async (req, res) => {
  const {
    name_of_customer,
    addres,
    mobile,
    credit_limit,
    credit_term_lube,
    local_id,
    document_upload,
    vehicle_no,
    local_guarantor_name,
    local_guarantor_no,
  } = req.body;

  const newcreditcustomerform = new Creditcustomers({
   name_of_customer: name_of_customer,
    addres: addres,
    mobile: mobile,
    credit_limit: credit_limit,
    credit_term_lube: credit_term_lube,
    local_id: local_id,
     document_upload: document_upload,
    vehicle_no: vehicle_no,
    local_guarantor_name: local_guarantor_name,
    local_guarantor_no: local_guarantor_no, 
  });

  const findexist = await Creditcustomers.findOne({ mobile: mobile });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  }else if (req.files) {
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
      newcreditcustomerform.document_upload = alluploads;
    }
   
    newcreditcustomerform
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

}
}

exports.allcreditcustomer = async (req, res) => {
  await Creditcustomers
    .find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getonecreditcustomer = async (req, res) => {
  await Creditcustomers
    .findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletecreditcustomer = async (req, res) => {
  await Creditcustomers
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatcreditcustomer = async (req, res) => {
  
  
  const findOneAndUpdate = Creditcustomers
    .findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
         $set: req.body ,
      },
      { new: true }
    )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}