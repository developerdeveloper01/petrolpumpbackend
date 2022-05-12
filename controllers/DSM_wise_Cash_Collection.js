const cashcollected = require("../models/cashcollected");
const resp = require("../helpers/apiresponse");
const creditgiven = require("../models/creditgivento");
const dsmclosing = require("../models/dsmclosingsheet");
const lubricantsales = require("../models/lubricantsales");
const _ = require("lodash");
const RSP = require("../models/rsp");
const expenses = require("../models/expenses");
exports.DSM_wise_Cash_Collection = async (req, res) => {
  const { date, dealer_Id } = req.body;
  let cashobj = await cashcollected
    .find({
      $and: [{ date: date }, { dealer_name: dealer_Id }],
    })
    .populate("dsm_Id")
    .populate("cash_handed_over_to");
  let record = [];
  let creditgiven = [];
  let manager = [];
  let upi_Cash = [];
  let debit_cash = [];
  let credit_cash = [];

  console.log(cashobj);
  //dsm name
  for (const element of cashobj) {
    record.push(element.dsm_Id.dsm_name);
  }
  ///creditgiven
  for (const element of cashobj) {
    creditgiven.push(element.dsm_Id.dsm_name);
    creditgiven.push(element.credit);
  }
  //manager
  for (const element of cashobj) {
    manager.push(element.dsm_Id.dsm_name);
    manager.push(
      "cash_handed_over_to",
      element.cash_handed_over_to.maneger_name
    );
  }
  //debit_cash
  for (const element of cashobj) {
    debit_cash.push(element.dsm_Id.dsm_name);
    debit_cash.push(element.debit_cash);
  }
  //upi_Cash
  for (const element of cashobj) {
    upi_Cash.push(element.dsm_Id.dsm_name);
    upi_Cash.push(element.upi_Cash);
  }
  //credit_cash
  for (const element of cashobj) {
    credit_cash.push(element.dsm_Id.dsm_name);
    credit_cash.push(element.credit_cash);
  }
  console.log(record);

  //net salese ful
  let net_sel = [];

  let Net_Sales = await dsmclosing
    .find({
      $and: [{ date: req.body.date }, { dealer_name1: req.body.dealer_Id }],
    })
    .populate("tank")
    .populate("name_of_dsm");
  for (const iterator of Net_Sales) {
    net_sel.push(iterator.name_of_dsm.dsm_name);
    net_sel.push(iterator.net_cash_ful);
  }
  ////net cash lub
  netsales_lub = [];
  let lubricant = await lubricantsales
    .find({
      $and: [{ dealer_name1: req.body.dealer_Id }, { date: req.body.date }],
    })
    .populate("dsm")
    .sort({
      createdAt: -1,
    });
  console.log("lubricant", lubricant);
  for (const iterator of lubricant) {
    netsales_lub.push(iterator.dsm.dsm_name);
    netsales_lub.push(iterator.total_sales);
  }
  let data = {
    date: date,
    record: record,
    net_sel: net_sel,
    netsales_lub: netsales_lub,
    credit_given: creditgiven,
    Net_Cash_handed_over_to_Manager: manager,
    upi_Cash: upi_Cash,
    debit_cash: debit_cash,
    credit_cash: credit_cash,
  };
  res.status(400).json({
    status: true,
    data: data,
  });
};
