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
    product,
    opening_total1,
    opening_total2,
    closing_Entry,
    closing_Entry_MS,
    closing_Entry_HSD,
    closing_total_MS,
    closing_total_HSD,


  } = req.body;
  let msclsoing = 0;
  //const obj1 = JSON.parse(msclsoing);
//console.log(obj1);
  let hsdclosing = 0;
  //let obj2 = JSON.parse(hsdclosing);
 

  if (req.body.product == "MS") {
    msclsoing = req.body.closing_Entry;
    hsdclosing=0;
    //let obj1 = JSON.parse(msclsoing);
    console.log("Ms", msclsoing,hsdclosing)


  } else {
    hsdclosing = req.body.closing_Entry;
    msclsoing=0;
   // let obj1 = JSON.parse(hsdclosing);
    console.log("Hsd", hsdclosing,msclsoing)
  }

  var date1 = new Date();
  console.log(date1)
  //MS
  const d = await bm.find({ date: req.body.date })
  console.log("record", d)
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

  ///rsp
  let rsp = await RSP.findOne().sort({ createdAt: -1 })
  const rs1 = rsp.rsp1;
  const rs2 = rsp.rsp2;
  console.log("rsp1", rs1);
  console.log("rsp2", rs2);
  var dateOpen = new Date();
  console.log(dateOpen)
  const open = await bm.find({ date: req.body.date })
  const opnig1 = rsp.opneing_liter1;
  const opnig2 = rsp.opneing_liter2;

  //save
  const newbm = new bm({
    dealer_Id: dealer_Id,
    dsm__Id: dsm__Id,
    date: date,
    bay: bay,
    nozzel: nozzel,
    product: product,
    closing_Entry: closing_Entry,
    opening_total1: opnig1,
    opening_total2: opnig2,
    closing_Entry_MS:msclsoing,
    closing_Entry_HSD:0,
    closing_total_MS: opnig1 - closing_Entry_MS,
    closing_total_HSD: opnig2 - closing_Entry_HSD,

  });

  const d1 = await bm.find({ date: req.body.date })
  console.log("record", d1)

  newbm
    .save()
    .then((data) => {
      data.sumMs1 = sumMs1;
      data.sumHsd1 = sumHsd1;
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
  //await bm.deleteMany({ date: "2022-03-26" })
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
    .sort({ createdAt: -1 })

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
