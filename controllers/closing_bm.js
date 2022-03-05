const c_bm = require("../models/closing_bm");
const resp = require("../helpers/apiresponse");

exports.addc_bm = async (req, res) => {
  const {
    dsm_name1,
    closing_total,
    
   
  } = req.body;

  const newc_bm= new c_bm({
    dsm_name1:dsm_name1,
    closing_total: closing_total,
   

  });
  
  newc_bm
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
exports.allc_bm = async (req, res) => {
    await c_bm
      .find().populate([
        {
          path: 'dsm_name1',
          select:'dsm_name',
        }
      ])
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.getonec_bm = async (req, res) => {
    await c_bm
      .findOne({ _id: req.params.id }).populate([
        {
          path: 'dsm_name1',
          select:'dsm_name',
        }
      ])
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.deletec_bm = async (req, res) => {
    await c_bm.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updatec_bm = async (req, res) => {
   // console.log(req.params.id);
  await c_bm
   
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