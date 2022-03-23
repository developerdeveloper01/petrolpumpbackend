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
        Upload_Fire_Equipmen,
        Due_Date2,
        Remarks2,
      } = req.body;

      const newequipment = new FMotherEquipment({
        Equipment:Equipment,
        Due_Date: Due_Date,
        Uplaod_Document: Uplaod_Document,
        Remarks: Remarks,
        Fire_Equipment: Fire_Equipment,
     
        Upload_Fire_Equipmen: Upload_Fire_Equipmen,
        Due_Date2: Due_Date2,
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
        if (req.files.Upload_Fire_Equipmen) {
            alluploads = [];
            for (let i = 0; i < req.files.Upload_Fire_Equipmen.length; i++) {
              const resp = await cloudinary.uploader.upload(
                req.files.Upload_Fire_Equipmen[i].path,
                { use_filename: true, unique_filename: false }
              );
              fs.unlinkSync(req.files.Upload_Fire_Equipmen[i].path);
              alluploads.push(resp.secure_url);
            }
            newequipment.Upload_Fire_Equipmen = alluploads;
          }
    }
}