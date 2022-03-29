const FMotherEquipment = require("../models/FMotherEquipment");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

exports.addequipment = async (req, res) => {
    const {
        Equipment,
        Due_Date,
        Uplaod_Document,
        Remarks,
        Fire_Equipment,
        Upload_Fire_Equipment,
        Due_Date2,
        Remarks2,
      } = req.body;

      const newequipment = new FMotherEquipment({
        Equipment:Equipment,
        Due_Date: Due_Date,
        Uplaod_Document: Uplaod_Document,
        Remarks: Remarks,
        Fire_Equipment: Fire_Equipment,
     
        Upload_Fire_Equipment: Upload_Fire_Equipment,
        Due_Date2: Due_Date2,
        Remarks2:  Remarks2,
    });
    if (req.files) {
        if (req.files.Uplaod_Document) {
          alluploads = [];
          for (let i = 0; i < req.files.Uplaod_Document.length; i++) {
            const resp = await cloudinary.uploader.upload(
              req.files.Uplaod_Document[i].path,
              { use_filename: true, unique_filename: false }
            );
            fs.unlinkSync(req.files.Uplaod_Document[i].path);
            alluploads.push(resp.secure_url);
          }
          newequipment.Uplaod_Document = alluploads;
        }
        if (req.files.Upload_Fire_Equipment) {
          alluploads = [];
          for (let i = 0; i < req.files.Upload_Fire_Equipment.length; i++) {
            const resp = await cloudinary.uploader.upload(
              req.files.Upload_Fire_Equipment[i].path,
              { use_filename: true, unique_filename: false }
            );
            fs.unlinkSync(req.files.Upload_Fire_Equipment[i].path);
            alluploads.push(resp.secure_url);
          }
          newequipment.Upload_Fire_Equipment = alluploads;
        }
       
            newequipment
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
      
        } else {
          res.status(200).json({
            status: false,
            msg: "img not uploaded",
          });
        }
  }

  
exports.allequipment = async (req, res) => {
  console.log(res.params);
  await FMotherEquipment
    .find().populate("Equipment")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
//consol
//find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )

exports.getoneequipment = async (req, res) => {
  await FMotherEquipment
    .findOne({ _id: req.params.id }).populate("Equipment")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.deleteequipment = async (req, res) => {
  await FMotherEquipment
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateequipment = async (req, res) => {
  const {
    Equipment,
        Due_Date,
        Uplaod_Document,
        Remarks,
        Fire_Equipment,
        Upload_Fire_Equipment,
        Due_Date2,
        Remarks2,
  } = req.body;
  data = {};
  if (Equipment) {
    data.Equipment = Equipment;
  }
  if (Due_Date) {
    data.Due_Date = Due_Date;
  }
  if (Remarks) {
    data.Remarks = Remarks;
  }
  if (Fire_Equipment) {
    data.Fire_Equipment = Fire_Equipment;
  }
  if (Due_Date2) {
    data.Due_Date2 = Due_Date2;
  }

  if (Remarks2) {
    data.Remarks2 = Remarks2;
  }
  
  if (req.files) {
    if (req.files.Uplaod_Document) {
      alluploads = [];
      for (let i = 0; i < req.files.Uplaod_Document.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Uplaod_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Uplaod_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Uplaod_Document = alluploads;
    }
    if (req.files.Upload_Fire_Equipment) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Fire_Equipment.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Fire_Equipment[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Fire_Equipment[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Upload_Fire_Equipment = alluploads;
    }
    if (data) {
      const findandUpdateEntry = await FMotherEquipment.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: data },
        { new: true }
      ).populate("Equipment");

      if (findandUpdateEntry) {
        res.status(200).json({
          status: true,
          msg: "success",
          data: findandUpdateEntry,
        });
      } else {
        res.status(400).json({
          status: false,
          msg: "error",
          error: "error",
        });
      }
    }
  }
}
