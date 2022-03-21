const Stampingdata = require("../models/Stampingdata");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();


exports.addStampingdata = async (req, res) => {
    const {
        MPD,
        nozzel,
        Product,
        Last_Stamping_Date,
        Due_Date,
        K_Factor,
        Upload_Certificate,
        Upload_Service_Report,
        Last_Service_Date,
        Last_Service_Report,
     
    } = req.body;
  
    const newStampingdata = new Stampingdata({
        MPD:MPD,
        nozzel: nozzel,
        Product: Product,
        Last_Stamping_Date: Last_Stamping_Date,
        Due_Date: Due_Date,
        K_Factor: K_Factor,
        Upload_Certificate: Upload_Certificate,
        Upload_Service_Report: Upload_Service_Report,
        Last_Service_Date: Last_Service_Date,
        Last_Service_Report: Last_Service_Report
    });
    if (req.files) {
        if (req.files.Upload_Certificate) {
          alluploads = [];
          for (let i = 0; i < req.files.Upload_Certificate.length; i++) {
            const resp = await cloudinary.uploader.upload(
              req.files.Upload_Certificate[i].path,
              { use_filename: true, unique_filename: false }
            );
            fs.unlinkSync(req.files.Upload_Certificate[i].path);
            alluploads.push(resp.secure_url);
          }
          newStampingdata.Upload_Certificate = alluploads;
        }

        // if (req.files.Upload_Service_Report) {
        //     alluploads = [];
        //     for (let i = 0; i < req.files.Upload_Service_Report.length; i++) {
        //       const resp = await cloudinary.uploader.upload(
        //         req.files.Upload_Service_Report[i].path,
        //         { use_filename: true, unique_filename: false }
        //       );
        //       fs.unlinkSync(req.files.Upload_Service_Report[i].path);
        //       alluploads.push(resp.secure_url);
        //     }
        //     newStampingdata.Upload_Service_Report = alluploads;
        //   }
        //   if (req.files.Last_Service_Report) {
        //     alluploads = [];
        //     for (let i = 0; i < req.files.Last_Service_Report.length; i++) {
        //       const resp = await cloudinary.uploader.upload(
        //         req.files.Last_Service_Report[i].path,
        //         { use_filename: true, unique_filename: false }
        //       );
        //       fs.unlinkSync(req.files.Last_Service_Report[i].path);
        //       alluploads.push(resp.secure_url);
        //     }
        //     newStampingdata.Last_Service_Report = alluploads;
        //   }
         
       
        newStampingdata
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

