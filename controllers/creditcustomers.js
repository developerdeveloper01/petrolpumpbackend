const Creditcustomer = require("../models/creditcustomers");
const resp = require("../helpers/apiresponse");

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

  const newcreditcustomerform = new Creditcustomer({
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

  const findexist = await Creditcustomer.findOne({ mobile: mobile });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  }
  
  else {
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
  await Creditcustomer
    .find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getonecreditcustomer = async (req, res) => {
  await Creditcustomer
    .findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletecreditcustomer = async (req, res) => {
  await Creditcustomer
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateonecreditcustomer = async (req, res) => {
  const findoneandupdate = Creditcustomer
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
