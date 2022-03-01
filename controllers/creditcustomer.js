const Creditcustomer = require("../models/creditcustomer");
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
};
