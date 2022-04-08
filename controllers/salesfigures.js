const Salesfigures = require("../models/salesfigures");
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
  exports.addSalesfigures = async (req, res) => {
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
   
    } = req.body;
    let dsm= await dsmclosing.find({$and:[{"tank":req.body.tank},{"date":getCurrentDate()}]});
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
    const newSalesfigures= new Salesfigures({    
      dealer_Id:dealer_Id,
      date:getCurrentDate(),
      tank: tank,
      meter_sales:sales,
      testing: testingall,
      net_sales:sales-testingall,
      tank_receipt:tank_receipt,
      loss_booked:loss_booked,
      total_expected_stock:total_expected_stock,
      actual_closing_stock:actual_closing_stock,
      loss_gain:loss_gain,
   
    });
    //console.log(net_cash);
   
    newSalesfigures
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