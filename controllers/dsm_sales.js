const dsm_sales = require("../models/dsm_sales");
const nozzle_map = require("../models/nozzle_map");
const RSP = require("../models/rsp");
const dsmclosing = require("../models/dsmclosingsheet");
const resp = require("../helpers/apiresponse");
const lubricantsales = require("../models/lubricantsales");
const _ = require("lodash");
const bm = require("../models/baymanagementold");
exports.adddsmsales = async (req, res) => {
  const {
    dealer_Id,
    date,
    product,
    dsm,
    tank,
    //ms
    metersales_ms,
    ownuse_ms,
    testing_ms,
    netslesltr_ms,
    netsalesAmount_ms,
    //hsd
    metersales_hsd,
    ownuse_hsd,
    testing_hsd,
    netslesltr_hsd,
    netsalesAmount_hsd,
  } = req.body;
  //rsp
  let rsp = await RSP.findOne({
    $and: [{ dealer_Id: req.body.dealer_Id }, { date: req.body.date }],
  }).sort({
    createdAt: -1,
  });
  console.log("rsp", rsp);
  let rspms = rsp.rsp1;
  let rsphsd = rsp.rsp2;
  let de = rsp.date;
  console.log("date RSP", de);
  console.log("rspms RSP", rspms);
  console.log("rsphsd RSP", rsphsd);
  //ms entry
  let hsd_sales = [];
  let hsd_testing = [];
  let hsd_own_use = [];

  if (product.toLowerCase() == "hsd") {
    let hsdrecord = await dsmclosing
      .find({ $and: [{ date: date }, { dealer_name1: req.body.dealer_Id }] })
      .populate("tank")
      .populate("name_of_dsm");
    console.log("msrecord............", hsdrecord);
    let record = [];
    for (const element of hsdrecord) {
      if (element.tank.Product.toLowerCase() == "hsd") {
        console.log("element", element);
        record.push(element.name_of_dsm.dsm_name);
        record.push(element.hsd_sales);
        record.push(element.hsd_testing);
        record.push(element.hsd_own_use);
      }
    }

    for (const i of hsdrecord) {
      if (i.tank.Product.toLowerCase() == "hsd") {
        hsd_sales.push(i.hsd_sales);
        hsd_testing.push(i.hsd_testing);
        hsd_own_use.push(i.hsd_own_use);
        tankvlue.push(i.tank);
      }
    }

    console.log(hsd_sales);
    console.log(hsd_testing);
    console.log(hsd_own_use);
    let sumhsd_sales = _.sum(hsd_sales);
    console.log(sumhsd_sales);
    let sumhsd_testing = _.sum(hsd_testing);
    console.log(sumhsd_testing);
    let sumhsd_own_use = _.sum(hsd_own_use);
    console.log(sumhsd_own_use);
    let netsale = sumhsd_sales - sumhsd_testing - sumhsd_own_use;
    console.log("netsale", netsale);
    let netamt = rsphsd * netsale;
    console.log("netamt", netamt);
    let data = {
      dealer_Id: dealer_Id,
      date: date,
      product: product,
      dsm: record,

      metersales_hsd: sumhsd_sales,
      ownuse_hsd: sumhsd_own_use,
      testing_hsd: sumhsd_testing,
      netslesltr_hsd: netsale,
      netsalesAmount_hsd: netamt,
    };
    res.status(400).json({
      status: true,
      data: data,
    });
  }
  ///Ms
  let ms_sales = [];
  let ms_testing = [];
  let ms_own_use = [];

  if (product.toLowerCase() == "ms") {
    let msrecord = await dsmclosing
      .find({ $and: [{ date: date }, { dealer_name1: req.body.dealer_Id }] })
      .populate("tank")
      .populate("name_of_dsm");
    console.log("msrecord............", msrecord);
    let record = [];
    for (const element of msrecord) {
      if (element.tank.Product.toLowerCase() == "ms") {
        console.log("element", element);
        record.push(element.name_of_dsm.dsm_name);
        record.push(element.ms_sales);
        record.push(element.ms_testing);
        record.push(element.ms_own_use);
      }
    }
    for (const i of msrecord) {
      if (i.tank.Product.toLowerCase() == "ms") {
        ms_sales.push(i.ms_sales);
        ms_testing.push(i.ms_testing);
        ms_own_use.push(i.ms_own_use);
      }
    }

    console.log(ms_sales);
    console.log(ms_testing);
    console.log(ms_own_use);
    let summs_sales = _.sum(ms_sales);
    console.log(summs_sales);
    let summs_testing = _.sum(ms_testing);
    console.log(summs_testing);
    let summs_own_use = _.sum(ms_own_use);
    console.log(summs_own_use);
    let netsale = summs_sales - summs_testing - summs_own_use;
    console.log("netsale", netsale);
    let netamt = rspms * netsale;
    console.log("netamt", netamt);
    let data = {
      dealer_Id: dealer_Id,
      date: date,
      product: product,
      dsm: record,
      metersales_ms: summs_sales,
      testing_ms: summs_testing,
      ownuse_ms: summs_own_use,
      netslesltr_ms: netsale,
      netsalesAmount_ms: netamt,
    };
    res.status(400).json({
      status: true,
      data: data,
    });
  }

  ///both
  if (product.toLowerCase() == "both") {
    let bothrecord = await dsmclosing
      .find({ $and: [{ date: date }, { dealer_name1: req.body.dealer_Id }] })
      .populate("tank")
      .populate("name_of_dsm");
    console.log("msrecord............", bothrecord);
    let record = [];
    for (const element of bothrecord) {
      console.log("element", element);
      record.push(element.name_of_dsm.dsm_name);
      record.push(element.hsd_sales);
      record.push(element.hsd_testing);
      record.push(element.hsd_own_use);
      record.push(element.ms_sales);
      record.push(element.ms_testing);
      record.push(element.ms_own_use);
    }
  }
};
