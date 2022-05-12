const Fuelstock = require("../models/fuel_stock_management");
const RSP = require("../models/rsp");
exports.salesReport = async (req, res) => {
  const { date, dealer_Id, product } = req.body;
  let rsp = await RSP.findOne({
    $and: [{ dealer_Id: req.body.dealer_Id }, { date: req.body.date }],
  }).sort({
    createdAt: -1,
  });
  console.log("rsp", rsp);
  if (rsp == null) {
    res.status(400).json({
      status: false,
      msg: "record not found",
    });
  } else {
    console.log("rsp", rsp);
    let rspms = rsp.rsp1;
    let rsphsd = rsp.rsp2;
    let de = rsp.date;
    let opningvaluems = rsp.opneing_liter1;
    let opningvaluehsd = rsp.opneing_liter2;
    console.log("date RSP", de);
    console.log("rspms RSP", rspms);
    console.log("rsphsd RSP", rsphsd);
    console.log("opningvaluehsd RSP", opningvaluehsd);
    console.log("opningvaluems RSP", opningvaluems);
  }
};
