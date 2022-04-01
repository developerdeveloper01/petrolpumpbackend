const bm = require("../models/baymanagementold");
const resp = require("../helpers/apiresponse");
const RSP = require("../models/rsp");
const Nozzle = require("../models/nozzle_map");
const _ = require("lodash");

let  getCurrentDate = function() {
  const t = new Date();
  const date = ('0' + t.getDate()).slice(-2);
  const month = ('0' + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${year}-${month}-${date}`;
}
console.log(getCurrentDate())

exports.addbm = async (req, res) => {
  const {
    dealer_Id,
    dsm__Id,
    date,

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
  let hsdclosing = 0;
  //let obj2 = JSON.parse(hsdclosing);
  let Nozz= await Nozzle.findOne({_id:req.body.nozzel})
  .populate([{
    path:'tank_map',
    populate:[{
      path:'Product',
      populate:[{
        path:'product'
      }]
    }]
  }    
  ])
let pro=Nozz.tank_map.Product;
console.log(pro=="MS")

  if ("MS" == pro) {
    msclsoing = req.body.closing_Entry;
    hsdclosing=0;
  } else {
    hsdclosing = req.body.closing_Entry;
    msclsoing=0;
  }

  console.log("2022-04-01"==getCurrentDate())

  const d = await bm.find({date:getCurrentDate()})
 console.log(d)
  var newarr = d.map(function (value) {
    return value.closing_Entry_MS
  })
  let sumMs1 = parseInt(_.sum([msclsoing, ...newarr]))
  console.log(sumMs1)
  var newarr2 = d.map(function (value) {
    return value.closing_Entry_HSD
  })
  
  var sumHsd1 = parseInt(_.sum([hsdclosing, ...newarr2]))
  console.log(sumHsd1)
  ///rsp
  let rsp = await RSP.findOne().sort({createdAt: -1})
  const rs1 = rsp.rsp1;
  const rs2 = rsp.rsp2;

  
  var dateOpen = new Date();
  
  

  //save
  const newbm = new bm({
    dealer_Id: dealer_Id,
    dsm__Id: dsm__Id,
    date: getCurrentDate(),
    nozzel: nozzel,
    product:pro,
    closing_Entry: closing_Entry,
    opening_total1: opening_total1,
    opening_total2: opening_total2,
    closing_Entry_MS:msclsoing,
    closing_Entry_HSD:hsdclosing,
    closing_total_MS:msclsoing,
    closing_total_HSD: hsdclosing,
    sumMS:sumMs1,
    sumHSD:sumHsd1
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
  await bm
    .find()
    .populate([{
      path:'nozzel',
      populate:[{
        path:'tank_map',
        populate:[{
          path:'Product',
          select:'product',
          populate:[{
            path:'capacity',
            select:'capacity'
           
          }]
        }]
      }]
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
