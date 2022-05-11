const RSP = require("../models/rsp");
const resp = require("../helpers/apiresponse");
const bm = require("../models/baymanagementold");
const Fs = require("../models/fuel_stock_management");
const _ = require("lodash");

let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}-${month}-${year}`;
};
exports.addrsp = async (req, res) => {
  const {
    dealer_Id,
    date,

    opneing_dip1,
    opneing_liter1,
    rsp1,
    opneing_dip2,
    opneing_liter2,
    rsp2,
  } = req.body;

  let rsp = await Fs.find({
    dealer_Id: req.body.dealer_Id,
  }).sort({
    createdAt: -1,
  });
  var newarr = rsp.map(function (value) {
    return value.msactual_closing;
  });
  var newarr2 = rsp.map(function (value) {
    return value.hsdactual_closing;
  });
  console.log("fulstok", newarr2);
  if (newarr === null) {
    let rspobject = {
      dealer_Id: dealer_Id,
      opneing_dip1: parseFloat(opneing_dip1),
      date: date,
      opneing_liter1: 0,
      rsp1: parseFloat(rsp1),
      opneing_dip2: parseFloat(opneing_dip2),
      opneing_liter2: 0,
      rsp2: parseFloat(rsp2),
    };

    let result = await RSP.create(rspobject);
    resp.successr(res, result);
    console.log(result);
  } else {
    var newarr = rsp.map(function (value) {
      return value.msactual_closing;
    });
    console.log(newarr);
    let sumMs1 = _.sum([...newarr]);
    console.log(sumMs1);
    var newarr2 = rsp.map(function (value) {
      return value.hsdactual_closing;
    });

    var sumHsd1 = _.sum([...newarr2]);
    console.log(sumHsd1);

    // let actualstockMS = rsp.msactual_closing;
    // console.log("actualstock", actualstockMS);
    // let actualstockHSD = rsp.hsdactual_closing;
    // console.log("actualstock", actualstockHSD);

    // var dateOpen = new Date();
    // console.log(dateOpen)
    //   const op=Baymanagement.findOne().sort({createdAt:-1});
    //   console.log(op);
    // const op1=op.opening_total1;
    // const op2=op.opening_total2;

    //console.log("opening_total1",op1)
    const newrsp = new RSP({
      date: date,
      dealer_Id: dealer_Id,
      opneing_dip1: parseFloat(opneing_dip1),
      opneing_liter1: sumMs1,

      rsp1: parseFloat(rsp1),

      opneing_dip2: parseFloat(opneing_dip2),
      opneing_liter2: sumHsd1,

      rsp2: parseFloat(rsp2),
    });
    const findexist = await RSP.findOne({
      $and: [{ date: date }, { dealer_Id: req.body.dealer_Id }],
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exist",
        data: {},
      });
    } else {
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
    }
  }
};
exports.allrsp = async (req, res) => {
  //await RSP.remove();
  await RSP.find()
    .populate("dealer_Id")

    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allrspApp = async (req, res) => {
  //await RSP. deleteMany({opneing_dip1:5000})
  await RSP.find({ dealer_Id: req.params.dealer_Id })
    .populate("dealer_Id")

    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.getonersp = async (req, res) => {
  await RSP.findOne({ _id: req.params.id })
    .populate("dealer_Id")
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
  await RSP.findOneAndUpdate(
    {
      _id: req.params.id,
      //  console.log(req.params._id);
    },
    {
      $set: req.body,
    },
    { new: true }
  )
    .populate("dealer_Id")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  console.log(req.params._id);
};
