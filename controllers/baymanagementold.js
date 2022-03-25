const bm = require("../models/baymanagementold");
const resp = require("../helpers/apiresponse");
const RSP = require("../models/rsp");

exports.addbm = async (req, res) => {
  const {
    dealer_Id,
    dsm__Id,
    date,
    bay,
    nozzel,
    opening_total1,
    opening_total2,
    closing_Entry_MS,
    closing_Entry_HSD,
    closing_total_MS,
    closing_total_HSD,
    sumMS,
    sumHSD,

  } = req.body;
  var date1 = new Date();
  console.log(date1)
  const d = await bm.find({ dateonly: date1 })
  var newarr = d.map(function (value) {
    return value.closing_Entry_MS
  })
  console.log(newarr)
  var sumMs1 = 0;
  for (let i = 0; i < newarr.length; i++) {
    sumMs1 += newarr[i];
  }

  console.log("Sum is " + sumMs1)
  //HSD

  var newarr2 = d.map(function (value) {
    return value.closing_Entry_HSD
  })
  console.log(newarr2)
  var sumHsd1 = 0;
  for (let i = 0; i < newarr2.length; i++) {
    sumHsd1 += newarr2[i];
  }

  console.log("Sum is " + sumHsd1)

  let rsp = await RSP.findOne().sort({ createdAt: -1 })
  const rs1 = rsp.opneing_liter1;
  const rs2 = rsp.opneing_liter2;
  console.log("rsp1", rs1);
  console.log("rsp2", rs2);
  const newbm = new bm({
    dealer_Id: dealer_Id,
    dsm__Id: dsm__Id,
    date: date,
    bay: bay,
    nozzel: nozzel,
    opening_total1: rs1 - closing_Entry_MS,
    opening_total2: rs2 - closing_Entry_HSD,
    closing_Entry_MS: closing_Entry_MS,
    closing_Entry_HSD: closing_Entry_HSD,
    closing_total_MS: rs1 - closing_Entry_MS,
    closing_total_HSD: rs1 - closing_Entry_HSD,
    sumMS: sumMs1,
    sumHSD: sumHsd1
  });

  newbm
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
exports.allbm = async (req, res) => {



  // Creating variable to store the sum


  await bm
    .find()
    .populate([
      {
        path: 'bay',
        select: 'bay_map',
      }
    ]).populate([
      {
        path: 'nozzel',
        select: 'nozzle_map',
      }
    ]).populate("dealer_Id").populate("dsm__Id")
    .sort({ sortorder: 1 })

    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "sucsses",
        data: data,


      });
    })
}
exports.getonebm = async (req, res) => {

  await bm
    .findOne({ _id: req.params.id }).populate([
      {
        path: 'bay',
        select: 'bay_map',
      }
    ]).populate([
      {
        path: 'nozzel',
        select: 'nozzle_map',
      }
    ]).populate("dealer_name2")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletebm = async (req, res) => {
  await bm.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.updatebm = async (req, res) => {
  console.log(req.params.id);
  await bm

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
