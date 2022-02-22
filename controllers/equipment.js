const Equipment = require("../models/equipment");
const resp = require("../helpers/apiResponse");

exports.addequipment = async (req, res) => {
  const { nature, manufacturer,purchased_on} = req.body;

  const newEquipment = new Equipment({
    nature: nature,
    manufacturer: manufacturer,
    purchased_on: purchased_on,
    dealer:req.params.id
  });
  const findexist = await Equipment.findOne({ nature: nature });
  if (findexist) {
    resp.alreadyr(res,'Equipment');
  } else {
    newEquipment
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.editequipment = async (req, res) => {
  await Equipment.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneequipment = async (req, res) => {
  await Equipment.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allequipment = async (req, res) => {
  await Equipment.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteequipment = async (req, res) => {
  await Equipment.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
