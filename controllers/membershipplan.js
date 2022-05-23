const membershipplan = require("../models/membershipplan");
const resp = require("../helpers/apiresponse");

let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}-${month}-${year}`;
};
exports.addmembershipplan = async (req, res) => {
  const { dealer_id, razorpay_payment_id, amount, date } = req.body;

  const newmembership = new membershipplan({
    dealer_id: dealer_id,
    date: getCurrentDate(),
    razorpay_payment_id: razorpay_payment_id,
    amount: amount,
  });

  newmembership
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
exports.allmembershipplan = async (req, res) => {
  await membershipplan
    .find()
    .populate("dealer_id")

    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allmembershipplanApp = async (req, res) => {
  await membershipplan
    .find({ dealer_id: req.params.dealer_id })
    .populate("dealer_id")

    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.viewonemembership = async (req, res) => {
  await membershipplan
    .findOne({ _id: req.params.id })
    .populate("dealer_id")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.deletemembership = async (req, res) => {
  await membershipplan
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
