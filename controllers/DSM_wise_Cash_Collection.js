const cashcollected = require("../models/cashcollected");
const resp = require("../helpers/apiresponse");
const creditgiven = require("../models/creditgivento");
const dsmclosing = require("../models/dsmclosingsheet");
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
  let online = [];
  console.log(cashobj);
  for (const element of cashobj) {
    record.push(element.dsm_Id.dsm_name);
    record.push(element.credit);
    record.push(element.cash_handed_over_to.maneger_name);
    record.push(element.upi_Cash);
    record.push(element.debit_cash);
    record.push(element.credit_cash);
  }
  console.log(record);
  let sumonline = _.sum(online);
  let data = {
    date: date,
    record: record,
    // Net_Sales_in_Amount_Fuel,
    // // Net_Sales_in_Amount_Lube,
    // credit_given: creditgiven,
    // Digital_Payment: online,
    // Net_Cash_handed_over_to_Manager: manager,
    // Difference,
  };
  res.status(400).json({
    status: true,
    data: data,
  });
};
