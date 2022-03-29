const bankDeposits = require("../models/bankDeposits");
const resp = require("../helpers/apiresponse");


exports.addbankDeposits = async (req, res) => {
    const {
      //dealer_name1,
      Opening_Balance,
      Deposited_today,
      Expense_today,
      Clsosing_Balance_Expected,
      Remarks,
      Dealers_Concurrence,
    
    } = req.body;
  
    const newbankDeposits= new bankDeposits({
      dealer_name1:dealer_name1,
      Opening_Balance: Opening_Balance,
      Deposited_today: Deposited_today,
      Expense_today: Expense_today,
      Clsosing_Balance_Expected:Clsosing_Balance_Expected,
      Remarks: Remarks,
      cresit_offer: cresit_offer,
      Dealers_Concurrence: Dealers_Concurrence
    });
    newbankDeposits
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
exports.allbankDeposits = async (req, res) => {
    await bankDeposits
      .find().sort({ createdAt: -1 })
      //.populate('dealer_name1')
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.getonebankDeposits = async (req, res) => {
    await bankDeposits
      .findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.deletebankDeposits = async (req, res) => {
    await bankDeposits.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updateonebankDeposits = async (req, res) => {
    console.log(req.params.id);
  await bankDeposits
   
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
      console.log(req.params._id);
  };
  
