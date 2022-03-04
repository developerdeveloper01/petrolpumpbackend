const rsp = require("../models/rsp");
const resp = require("../helpers/apiresponse");

exports.addrsp = async (req, res) => {
  const {
    date,
    opneing_liter1,
    opneing_dip1,
    rsp1,
    opneing_liter2,
    opneing_dip2,
    rsp2
  } = req.body;

  const newrsp= new rsp({
    date: date,
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
      .find().populate("opneing_liter1").populate("opneing_liter2").populate("opneing_dip1").populate("opneing_dip2")
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };