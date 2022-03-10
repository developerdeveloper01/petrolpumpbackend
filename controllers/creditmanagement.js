const creditmanagement = require("../models/creditmanagement");
const resp = require("../helpers/apiresponse");


exports.addcreditmanagement = async (req, res) => {
  const {
    date,
    dealer_name,
    name_of_customer,
    vehicle_no,
    credit_for,
    opening_balance,
    credit_limit,
    payment_overdue,
    additional_credit_given_today,
    total_outstanding,
    payment_term,
  
  } = req.body;

  const newcreditmanagement = new creditmanagement({
    date:date,
    dealer_name: dealer_name,
   name_of_customer: name_of_customer,
   credit_for: credit_for,
   opening_balance: opening_balance,
    credit_limit: credit_limit,
    vehicle_no: vehicle_no,
    payment_overdue: payment_overdue,
    additional_credit_given_today: additional_credit_given_today,
    total_outstanding: total_outstanding,
    payment_term:payment_term
  });

 
   
    newcreditmanagement
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


exports.allcreditmanagement = async (req, res) => {
  console.log(res.params);
  await creditmanagement
    .find().populate("dealer_name").populate("name_of_customer").populate([
        {
            path: 'vehicle_no',
            select:'vehicle_no',
        }
    ]).populate([
        {
            path: 'credit_limit',
            select:'credit_limit',
        }
    ])
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.getonecreditmanagement= async (req, res) => {
  await creditmanagement
    .findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletecreditmanagement = async (req, res) => {
  await creditmanagement
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatecreditmanagement = async (req, res) => {

  const findOneAndUpdate = creditmanagement
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


