const rsp = require("../models/rsp");
const resp = require("../helpers/apiresponse");

exports.addrsp = async (req, res) => {
  const {
    date,
    dealer_name2,
    opneing_liter1,
    opneing_dip1,
    rsp1,
    opneing_liter2,
    opneing_dip2,
    rsp2
  } = req.body;

  const newrsp= new rsp({
    date: date,
    dealer_name2,
    opneing_liter1:  opneing_liter1,
    opneing_dip1:opneing_dip1,
    rsp1:rsp1,
    opneing_liter2:opneing_liter2,
    opneing_dip2:opneing_dip2,
    rsp2:rsp2


  });
  
  newrsp
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
exports.allrsp = async (req, res) => {
    await rsp
      .find().populate("dealer_name2")
      .populate([
        {
          path: 'opneing_liter1',
          select:'closing_total',
        }
      ]).populate([
        {
          path: 'opneing_liter2',
          select:'closing_total',
        }
      ])
    
       
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.getonersp = async (req, res) => {
    await rsp
      .findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.deletersp = async (req, res) => {
    await rsp.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updatersp = async (req, res) => {
   // console.log(req.params.id);
  await rsp
   
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