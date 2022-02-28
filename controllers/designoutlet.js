const Outletform = require("../models/designoutlet");
const resp = require("../helpers/apiresponse");

exports.addoutlet = async (req, res) => {
  const {
    no_of_mpp,
    no_of_bay,
    no_of_nozzles,
    no_of_tank,
    no_of_air_machines,
    puc_machine,
    any_other_facilities,
  } = req.body;
  const addoutlet = Outletform({
    no_of_mpp: no_of_mpp,
    no_of_bay: no_of_bay,
    no_of_nozzles: no_of_nozzles,
    no_of_tank: no_of_tank,
    no_of_air_machines: no_of_air_machines,
    puc_machine: puc_machine,
    any_other_facilities: any_other_facilities,
  });
  addoutlet
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
exports.getoutlet = async (req, res) => {
  await Outletform.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getoneoutlet = async (req, res) => {
  await Outletform.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteoutlet = async (req, res) => {
  await Outletform.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateoneoutlet = async (req, res) => {
  const findoneandupdate = Outletform.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
