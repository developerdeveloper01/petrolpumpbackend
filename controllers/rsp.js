const RSP = require("../models/rsp");
const resp = require("../helpers/apiresponse");
const bm = require("../models/baymanagementold");

exports.addrsp = async (req, res) => {
  const {
    date,
    dealer_name2,
    opneing_dip1,
    opneing_liter1,
    rsp1,
    opneing_dip2,
    opneing_liter2,
    rsp2
  } = req.body;

  let rsp = await bm.findOne().sort({ createdAt: -1 })
  let closing_total_MS=rsp.closing_total_MS
  let closing_total_HSD=rsp.closing_total_HSD
  
  console.log("closing_total_MS",closing_total_MS)
  console.log("closing_total_HSD",closing_total_HSD)
 
//   const op=Baymanagement.findOne().sort({createdAt:-1});
//   console.log(op);
// const op1=op.opening_total1;
// const op2=op.opening_total2;

//console.log("opening_total1",op1)
  const newrsp= new RSP({
    date: date,
    dealer_name2,
    opneing_dip1:opneing_dip1,
    opneing_liter1:closing_total_MS-opneing_dip1,
 
    rsp1:rsp1,

    opneing_dip2:opneing_dip2,
    opneing_liter2:closing_total_HSD-opneing_dip2,
   
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
  //await RSP. deleteMany({opneing_dip1:5000})
    await RSP
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
    
       
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.getonersp = async (req, res) => {
    await RSP
      .findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.deletersp = async (req, res) => {
    await RSP.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updatersp = async (req, res) => {
   // console.log(req.params.id);
  await RSP
   
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