const HsdStock = require("../models/cm_hsd_stock");
const Fuelstock = require("../models/fuel_stock_management");
const resp = require("../helpers/apiresponse");
const RSP = require("../models/rsp");
const _ = require("lodash");
exports.addHsdStock = async (req, res) => {
  const {
    dealer_Id,
    date,
    opening_Value,
    addition,
    sold,
    clsosing_value_Expected,
    actual_closing_value,
    difference,
  } = req.body;

  let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });
  let rs1 = rsp.rsp1;
  let rs2 = rsp.rsp2;
  let de = rsp.date;
  console.log("date", de);
  console.log("rsp", rs2);
  let margin = 3.0;
  let sumtankrec = 0;
  let sumnetsaleshsd = 0;
  let sumclosingstockhsd = 0;

  ////adition

  let as = await Fuelstock.find({
    $and: [{ date: de }, { dealer_Id: req.body.dealer_Id }],
  }).populate("tank");
  console.log(as);
  var newarr1 = as.map(function (value) {
    return value.tank.Product;
  });
  for (var i in newarr1) {
    console.log(newarr1[i]);

    console.log("product", newarr1[i]);
    if ("HSD" == newarr1[i] || "hsd" == newarr1[i] || "Hsd" == newarr1[i]) {
      let ricept = as.map(function (value) {
        return value.tank_receipt;
      });
      // let ricept = await Fuelstock.find({
      //   $and: [{ date: de }, { dealer_Id: req.body.dealer_Id }],
      // }).populate({
      //   path: "tank",
      //   match: {
      //     Product: newarr1[i],
      //   },
      // });
      console.log("ricept", ricept);
      var tankrec = as.map(function (value) {
        return value.tank_receipt;
      });
      console.log("tankrec", tankrec);
      sumtankrec = _.sum([...tankrec]);
      console.log("sum", sumtankrec);
    }

    ///sold

    let netsales = await Fuelstock.find({
      $and: [{ date: de }, { dealer_Id: req.body.dealer_Id }],
    }).populate({
      path: "tank",
      match: {
        Product: newarr1[i],
      },
    });
    var netsaleshsd = netsales.map(function (value) {
      return value.net_sales;
    });
    console.log("netsaleshsd", netsaleshsd);
    sumnetsaleshsd = _.sum([...netsaleshsd]);
    console.log("sum", sumnetsaleshsd);

    ///actual_closing_value

    let closingstock = await Fuelstock.find({
      $and: [{ date: de }, { dealer_Id: req.body.dealer_Id }],
    }).populate({
      path: "tank",
      match: {
        Product: newarr1[i],
      },
    });
    var closingstockms = closingstock.map(function (value) {
      return value.actual_closing_stock;
    });
    console.log("netsaleshsd", closingstockms);
    sumclosingstockhsd = _.sum([...closingstockms]);
    console.log("sum", sumclosingstockhsd);
  }
  ///// opnig value
  let ov = await HsdStock.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    _id: -1,
  });

  // let ovValue = ov.actual_closing_value;
  if (ov == null) {
    let msstockobject = {
      dealer_Id: dealer_Id,
      date: de,
      opening_Value: 0,
      addition: sumtankrec * (rs2 - margin),
      sold: sumnetsaleshsd * (rs2 - margin),
      clsosing_value_Expected:
        0 + sumtankrec * (rs2 - margin) - sumnetsaleshsd * (rs2 - margin),
      actual_closing_value: sumclosingstockhsd * (rs2 - margin),
      difference:
        sumclosingstockhsd * (rs2 - margin) -
        (0 * (rs2 - margin) +
          sumtankrec * (rs2 - margin) -
          sumnetsaleshsd * (rs2 - margin)),
    };
    let result = await HsdStock.create(msstockobject);
    resp.successr(res, result);
  } else {
    let ovValue = ov.actual_closing_value;
    console.log("opening value", ovValue);
    const newHsdStock = new HsdStock({
      dealer_Id: dealer_Id,
      date: de,
      opening_Value: ovValue * (rs2 - margin),
      addition: sumtankrec * (rs2 - margin),
      sold: sumnetsaleshsd * (rs2 - margin),
      clsosing_value_Expected:
        ovValue * (rs2 - margin) +
        sumtankrec * (rs2 - margin) -
        sumnetsaleshsd * (rs2 - margin),
      actual_closing_value: sumclosingstockhsd * (rs2 - margin),
      difference:
        sumclosingstockhsd * (rs2 - margin) -
        (ovValue * (rs2 - margin) +
          sumtankrec * (rs2 - margin) -
          sumnetsaleshsd * (rs2 - margin)),
    });
    newHsdStock
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
};

exports.allHsdStock = async (req, res) => {
  // await HsdStock.remove();
  await HsdStock.find()
    .populate("dealer_Id")

    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allHsdStockApp = async (req, res) => {
  await HsdStock.find({ dealer_Id: req.params.dealer_Id })
    .populate("dealer_Id")

    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateHsdStock = async (req, res) => {
  console.log(req.params.id);
  await HsdStock.findOneAndUpdate(
    {
      _id: req.params.id,
    },

    {
      $set: req.body,
    },
    { new: true }
  )
    .populate("dealer_id")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  console.log(req.params._id);
};

exports.deleteHsdStock = async (req, res) => {
  await HsdStock.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneHsdStock = async (req, res) => {
  await HsdStock.findOne({ _id: req.params.id })
    .populate("dealer_Id")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
