const profit = require("../models/profit");
const RSP = require("../models/rsp");
const resp = require("../helpers/apiresponse");
const expensesCm = require("../models/expensesCm");
const HsdStock = require("../models/cm_hsd_stock");
const MsStock = require("../models/cm_ms_stock");
const cashinbank = require("../models/cashinbank");
const cashincards = require("../models/cashincards");
const _ = require("lodash");
exports.addprofit = async (req, res) => {
  const { date, dealer_id, expectedProfit, netProfit } = req.body;

  let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });
  let de = rsp.date;
  console.log("date", de);
  ///expensesCm
  let exp = await expensesCm.find({
    $and: [{ dealer_Id: req.body.dealer_id }, { date: de }],
  });
  console.log("exp", exp);
  let expadd = 0;
  for (const element of exp) {
    expadd = element.addition;
  }
  ///ms stok
  let ms = await MsStock.find({
    $and: [{ dealer_Id: req.body.dealer_id }, { date: de }],
  });
  let msadd = 0;
  let netmsopning = 0;
  let netmsclosing = 0;
  for (const element of ms) {
    msadd = element.sold;
    netmsopning = element.opening_Value;
    netmsclosing = element.actual_closing_value;
  }
  //hsd stock
  let hsd = await HsdStock.find({
    $and: [{ dealer_Id: req.body.dealer_id }, { date: de }],
  });
  console.log("hsd", hsd);
  let hsdadd = 0;
  let nethsdopning = 0;
  let nethsdclosing = 0;

  for (const element of hsd) {
    hsdadd = element.sold;
    nethsdopning = element.opening_Value;
    nethsdclosing = element.actual_closing_value;
  }
  ///net profit
  //cashinbank
  let bank = await cashinbank.find({
    $and: [{ dealer_Id: req.body.dealer_Id }, { date: de }],
  });
  console.log(bank);
  let netbankopning = [];
  let netbankclosing = [];
  for (const element of bank) {
    let bankopning = element.opening_Value;
    netbankopning.push(bankopning);
    let bankclosing = element.actual_closing_value;
    netbankclosing.push(bankclosing);
  }
  let addnetbankopning = _.sum([netbankopning]);
  let addnetbankclosing = _.sum([netbankclosing]);
  ///cards
  let cards = await cashincards.find({
    $and: [{ dealer_Id: req.body.dealer_id }, { date: de }],
  });
  console.log("cards", cards);
  let netcardsopning = [];
  let netcardsclosing = [];
  for (const element of cards) {
    let cardsopning = element.opening_Value;
    netcardsopning.push(cardsopning);
    let cardsclosing = element.actual_closing_value;
    console.log("cardsclosing", cardsclosing);
    netcardsclosing.push(cardsclosing);
  }
  let addnetcardsopning = _.sum([netcardsopning]);
  let addnetcardsclosing = _.sum([netcardsclosing]);
  console.log("addnetcardsclosing", addnetcardsclosing);
  console.log("addnetcardsopning", addnetcardsopning);
  console.log(
    netmsclosing + nethsdclosing + addnetbankclosing + addnetcardsclosing
  );
  console.log(msadd + hsdadd - expadd);
  const newprofit = new profit({
    dealer_id: dealer_id,
    date: de,
    netProfit:
      netmsclosing +
      nethsdclosing +
      addnetbankclosing +
      addnetcardsclosing -
      (addnetcardsopning + addnetbankopning + netmsopning + nethsdopning),
    expectedProfit: msadd + hsdadd - expadd,
  });

  newprofit
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateoneprofit = async (req, res) => {
  await profit
    .findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getoneprofit = async (req, res) => {
  await profit
    .findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allprofit = async (req, res) => {
  await profit.remove();
  await profit
    .find()
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allprofitApp = async (req, res) => {
  await profit
    .find({ dealer_Id: req.params.dealer_id })
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.deleteprofit = async (req, res) => {
  await profit
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
