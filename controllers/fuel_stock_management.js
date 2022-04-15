const Fuelstock = require("../models/fuel_stock_management");
const dsmclosing = require("../models/dsmclosingsheet");
const resp = require("../helpers/apiresponse");
const _ = require("lodash");
let  getCurrentDate = function() {
    const t = new Date();
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    return `${date}-${month}-${year}`;
  }
  exports.addFuelstock = async (req, res) => {
    const {
      dealer_Id,
      date,
      tank,
      meter_sales,
      testing,
      net_sales,
      tank_receipt,
      loss_booked,
      total_expected_stock,
      actual_closing_stock,
      loss_gain,
      ms_closing,
      hsd_closing,
      msactual_closing,
      hsdactual_closing
   
    } = req.body;
    
    let dsm= await dsmclosing.find({$and:[{"tank":req.body.tank},{"date":getCurrentDate()}]}).populate('tank')

    console.log("sales",dsm)
    var newarr = dsm.map(function (value) {
        return value.ms_sales
      })
      console.log("ms_sales",newarr);
      let sumMs1 = (_.sum(newarr))
      console.log(sumMs1)

      var newarr1 = dsm.map(function (value) {
        return value.hsd_sales
      })
      console.log("hsd_sales",newarr1); 
      let sumHsd1= (_.sum(newarr1))
      console.log(sumHsd1)
let sales=sumHsd1+sumMs1
let mstest = dsm.map(function (value) {
    return value.ms_testing
  })
  console.log("ms_testing",mstest);
  let summstest1= (_.sum(mstest))
  console.log(summstest1)
  let hsdtest = dsm.map(function (value) {
    return value.hsd_testing
  })
  console.log("hsd_testing",hsdtest);
  let sumhsdtest1= (_.sum(hsdtest))
  console.log(sumhsdtest1)
let testingall=summstest1+sumhsdtest1
let ta= await dsmclosing.findOne({$and:[{"tank":req.body.tank},{"date":getCurrentDate()}]}).populate('tank')
let msclsoing=0;
let hsdclosing=0;
let pr=await Fuelstock.find({"date":getCurrentDate()}).populate('tank')
var newarr1 = pr.map(function (value) {
  return value.tank.Product
})
console.log("product",newarr1)
let pro = ta.tank.Product;
  if ("MS" == pro || "ms" == pro || "Ms" == pro) {
    msclsoing = req.body.actual_closing_stock;
  
    hsdclosing = 0;
    console.log("bbb",msclsoing)
  }else{
    hsdclosing=req.body.actual_closing_stock;
   
    msclsoing=0
    console.log(hsdclosing)
  }
  let as=await Fuelstock.find({"date":getCurrentDate()}).populate('tank')
var newarr1 = as.map(function (value) {
  return value.ms_closing
})

let summs_ac= (_.sum([msclsoing,...newarr1]))
console.log("sum",summs_ac)
var newarr2 = as.map(function (value) {
  return value.hsd_closing
})
let sumhsd_ac= (_.sum(newarr2))
  let FS= await Fuelstock.findOne({createdAt:-1 })
if(FS==null)
{
  
  let fsobject = {
    
   
    dealer_Id:dealer_Id,
    date:getCurrentDate(),
    tank: tank,
    meter_sales:sales,
    testing: testingall,
    net_sales:sales-testingall,
    tank_receipt:tank_receipt,
    loss_booked:loss_booked,
    total_expected_stock:(sales-testingall)+tank_receipt-loss_booked,
    actual_closing_stock:actual_closing_stock,
    loss_gain:actual_closing_stock-((sales-testingall)+tank_receipt-loss_booked),
    ms_closing: msclsoing,
    hsd_closing: hsdclosing ,
    msactual_closing:summs_ac,
    hsdactual_closing:sumhsd_ac
  }

  /////////////////////
  let result = await Fuelstock.create(fsobject);
  resp.successr(res, result)
}else{

  let dsm= await dsmclosing.find({$and:[{"tank":req.body.tank},{"date":getCurrentDate()}]}).populate('tank');
  console.log("sales",dsm)
  var newarr = dsm.map(function (value) {
      return value.ms_sales
    })
    console.log("ms_sales",newarr);
    let sumMs1 = (_.sum(newarr))
    console.log(sumMs1)

    var newarr1 = dsm.map(function (value) {
      return value.hsd_sales
    })
    console.log("hsd_sales",newarr1); 
    let sumHsd1= (_.sum(newarr1))
    console.log(sumHsd1)
let sales=sumHsd1+sumMs1
let mstest = dsm.map(function (value) {
  return value.ms_testing
})
console.log("ms_testing",mstest);
let summstest1= (_.sum(mstest))
console.log(summstest1)
let hsdtest = dsm.map(function (value) {
  return value.hsd_testing
})
console.log("hsd_testing",hsdtest);
let sumhsdtest1= (_.sum(hsdtest))
console.log(sumhsdtest1)
let testingall=summstest1+sumhsdtest1

let FS= await Fuelstock.findOne({createdAt:-1 })

let fuelstock=FS.actual_closing_stock

let ta= await dsmclosing.findOne({$and:[{"tank":req.body.tank},{"date":getCurrentDate()}]}).populate('tank')
let msclsoing=0;
let hsdclosing=0;
let pr=await Fuelstock.find({"date":getCurrentDate()}).populate('tank')
var newarr1 = pr.map(function (value) {
  return value.tank.Product
})
console.log("product",newarr1)
let pro = ta.tank.Product;
  if ("MS" == pro || "ms" == pro || "Ms" == pro) {
    msclsoing = req.body.actual_closing_stock;
  
    hsdclosing = 0;
    console.log("bbb",msclsoing)
  }else{
    hsdclosing=req.body.actual_closing_stock;
   
    msclsoing=0
    console.log(hsdclosing)
  }
  let as=await Fuelstock.find({"date":getCurrentDate()}).populate('tank')
var newarr1 = as.map(function (value) {
  return value.ms_closing
})
let summs_ac= (_.sum(newarr1))
console.log("sum",summs_ac)
var newarr2 = as.map(function (value) {
  return value.hsd_closing
})
let sumhsd_ac= (_.sum(newarr2))
    const newFuelstock= new Fuelstock({    
      dealer_Id:dealer_Id,
      date:getCurrentDate(),
      tank: tank,
      meter_sales:sales,
      testing: testingall,
      net_sales:sales-testingall,
      tank_receipt:tank_receipt,
      loss_booked:loss_booked,
      total_expected_stock:fuelstock-(sales-testingall)+tank_receipt-loss_booked,
      actual_closing_stock:actual_closing_stock,
      loss_gain:actual_closing_stock-(fuelstock-(sales-testingall)+tank_receipt-loss_booked),
      ms_closing: msclsoing,
      hsd_closing: hsdclosing ,
      msactual_closing:summs_ac,
      hsdactual_closing:sumhsd_ac
    });
    //console.log(net_cash);
   
    newFuelstock
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

exports.allFuelstock = async (req, res) => {
  await Fuelstock.remove()
    await Fuelstock.find().populate('dealer_Id').populate('tank')
  
      .sort({createdAt: -1})
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

     
  exports.updateFuelstock = async (req, res) => {
    console.log(req.params.id);
  await Fuelstock
   
      .findOneAndUpdate(
        {
          _id: req.params.id,
      },
      
      {
        $set: req.body,
      },
        { new: true }
      ).populate('dealer_id').populate('tank')
     .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
      console.log(req.params._id);
  };
  
exports.deleteFuelstock = async (req, res) => {
    await Fuelstock.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.viewoneFuelstock = async (req, res) => {
    await Fuelstock.findOne({ _id: req.params.id }).populate('dealer_id').populate('tank')
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  