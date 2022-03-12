const expenses = require("../models/expenses");
const resp = require("../helpers/apiresponse")
exports.addexpenses= async (req, res) => {
  const {
    date,
    heading,
    amount,
    authoruzed_by,
    dsm_manager
  } = req.body;

  const newexpenses= new expenses({
    date: date,
    heading : heading,
    amount: amount,
    authoruzed_by: authoruzed_by,
    dsm_manager: dsm_manager,
  });


  newexpenses .save()
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

  exports.allexpenses = async (req, res) => {
    await expenses
      .find().populate('dsm_manager')
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.getoneexpenses = async (req, res) => {
    await expenses
      .findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.deleteexpenses= async (req, res) => {
    await expenses.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updateexpenses = async (req, res) => {
    console.log(req.params.id);
  await expenses
   
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
  