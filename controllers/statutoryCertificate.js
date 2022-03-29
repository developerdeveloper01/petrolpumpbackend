const statutoryCertificate = require("../models/statutoryCertificate");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addstatutoryCertificate = async (req, res) => {
  const {
    Due_Date_of_Stamping,
    Upload_5l,
    Class_A,
    Class_B,
    Due_Date_of_PESO,
    Upload_PESO,
    scale,
    Hydrometer_Due_Date,
    Upload_Hydrometer,
    calibration_Due_date,
    uplodad_thermameter,
    due_date_air_gauage,
    uplodad_air_gauage,
    DPSL_upload,
    due_date_DPSL,
    due_date_outher,
    Remarks,
    upload_outher,


  } = req.body;

  const newstatutoryCertificate = new statutoryCertificate({
    Due_Date_of_Stamping: Due_Date_of_Stamping,
    Upload_5l: Upload_5l,
    Class_A: Class_A,
    Class_B: Class_B,
    Due_Date_of_PESO: Due_Date_of_PESO,
    Upload_PESO: Upload_PESO,
    scale: scale,
    Hydrometer_Due_Date: Hydrometer_Due_Date,
    Upload_Hydrometer: Upload_Hydrometer,
    calibration_Due_date: calibration_Due_date,
    uplodad_thermameter: uplodad_thermameter,
    due_date_air_gauage: due_date_air_gauage,
    uplodad_air_gauage: uplodad_air_gauage,
    DPSL_upload: DPSL_upload,
    due_date_DPSL: due_date_DPSL,
    due_date_outher: due_date_outher,

    upload_outher: upload_outher,
    Remarks: Remarks,

  });
  if (req.files) {
    // if (req.files.Upload_PESO[0].path) {
    //   alluploads = [];
    //   for (let i = 0; i < req.files.Upload_PESO.length; i++) {
    //     const resp = await cloudinary.uploader.upload(
    //       req.files.Upload_PESO[i].path,
    //       { use_filename: true, unique_filename: false }
    //     );
    //     fs.unlinkSync(req.files.Upload_PESO[i].path);
    //     alluploads.push(resp.secure_url);
    //   }
    //   newstatutoryCertificate.Upload_PESO = alluploads;
    // }


    // console.log("req.files.photograh", req.files.photograh)
    if (req.files.Upload_5l[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_5l.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_5l[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_5l[i].path);
        alluploads.push(resp.secure_url);
      }
      newstatutoryCertificate.Upload_5l = alluploads;
    }

    // if (req.files.Upload_Hydrometer[0].path) {
    //   Hydrometer = [];
    //   for (let i = 0; i < req.files.Upload_Hydrometer.length; i++) {
    //     const resp = await cloudinary.uploader.upload(
    //       req.files.Upload_Hydrometer[i].path,
    //       { use_filename: true, unique_filename: false }
    //     );
    //     fs.unlinkSync(req.files.Upload_Hydrometer[i].path);
    //     alluploads.push(resp.secure_url);
    //   }
    //   newstatutoryCertificate.Upload_Hydrometer = Hydrometer;
    // }

    
    // if (req.files.uplodad_thermameter[0].path) {
    //   alluploads = [];
    //   for (let i = 0; i < req.files.uplodad_thermameter.length; i++) {
    //     const resp = await cloudinary.uploader.upload(
    //       req.files.uplodad_thermameter[i].path,
    //       { use_filename: true, unique_filename: false }
    //     );
    //     fs.unlinkSync(req.files.uplodad_thermameter[i].path);
    //     alluploads.push(resp.secure_url);
    //   }
    //   newstatutoryCertificate.uplodad_thermameter = alluploads;
    // }

    // if (req.files.DPSL_upload[0].path) {
    //   alluploads = [];
    //   for (let i = 0; i < req.files.DPSL_upload.length; i++) {
    //     const resp = await cloudinary.uploader.upload(
    //       req.files.DPSL_upload[i].path,
    //       { use_filename: true, unique_filename: false }
    //     );
    //     fs.unlinkSync(req.files.DPSL_upload[i].path);
    //     alluploads.push(resp.secure_url);
    //   }
    //   newstatutoryCertificate.DPSL_upload = alluploads;
    // }


    if (req.files.upload_outher[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.upload_outher.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.upload_outher[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.upload_outher[i].path);
        alluploads.push(resp.secure_url);
      }
      newstatutoryCertificate.upload_outher = alluploads;
    }

    // if (req.files.uplodad_air_gauage[0].path) {
    //   alluploads = [];
    //   for (let i = 0; i < req.files.uplodad_air_gauage.length; i++) {
    //     const resp = await cloudinary.uploader.upload(
    //       req.files.uplodad_air_gauage[i].path,
    //       { use_filename: true, unique_filename: false }
    //     );
    //     fs.unlinkSync(req.files.uplodad_air_gauage[i].path);
    //     alluploads.push(resp.secure_url);
    //   }
    //   newstatutoryCertificate.uplodad_air_gauage = alluploads;
    // }
    newstatutoryCertificate
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
exports.allstatutoryCertificate = async (req, res) => {
  await statutoryCertificate.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getonestatutoryCertificate = async (req, res) => {
  await statutoryCertificate.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletestatutoryCertificate = async (req, res) => {
  await statutoryCertificate.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateonestatutoryCertificate = async (req, res) => {

  const {
    Due_Date_of_Stamping,
    Upload_5l,
    Class_A,
    Class_B,
    Due_Date_of_PESO,
    Upload_PESO,
    scale,
    Hydrometer_Due_Date,
    Upload_Hydrometer,
    calibration_Due_date,
    uplodad_thermameter,
    due_date_air_gauage,
    uplodad_air_gauage,
    DPSL_upload,
    due_date_DPSL,
    due_date_outher,

    upload_outher,

    Remarks,
    outher,
  } = req.body;
  data = {};
  if (Due_Date_of_Stamping) {
    data.Due_Date_of_Stamping = Due_Date_of_Stamping;
  }
  if (Class_A) {
    data.Class_A = Class_A;
  }
  if (Class_B) {
    data.Class_B = Class_B;
  }
  if (Due_Date_of_PESO) {
    data.Due_Date_of_PESO = Due_Date_of_PESO;
  }
  if (scale) {
    data.scale = scale;
  }

  if (Hydrometer_Due_Date) {
    data.Hydrometer_Due_Date = Hydrometer_Due_Date;
  }

  if (calibration_Due_date) {
    data.calibration_Due_date = calibration_Due_date;
  }

  if (due_date_air_gauage) {
    data.due_date_air_gauage = due_date_air_gauage;
  }


  if (due_date_DPSL) {
    data.due_date_DPSL = due_date_DPSL;
  }
  if (due_date_outher) {
    data.due_date_outher = due_date_outher;
  }

  if (Remarks) {
    data.Remarks = Remarks;
  }
  if (outher) {
    data.Remarks = outher;
  }

  if (req.files) {
    if (req.files.Upload_5l) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_5l.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_5l[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_5l[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Upload_5l = alluploads;
    }
  

  if (req.files.Upload_PESO) {
    alluploads = [];
    for (let i = 0; i < req.files.Upload_PESO.length; i++) {
      // console.log(i);
      const resp = await cloudinary.uploader.upload(
        req.files.Upload_PESO[i].path,
        { use_filename: true, unique_filename: false }
      );
      fs.unlinkSync(req.files.Upload_PESO[i].path);
      alluploads.push(resp.secure_url);
    }
    // newStore.storeImg = alluploads;
    data.Upload_PESO = alluploads;
  }


    if (req.files.Upload_Hydrometer) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Hydrometer.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Hydrometer[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Hydrometer[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Upload_Hydrometer = alluploads;
    }

  
 
    if (req.files.uplodad_thermameter[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.uplodad_thermameter.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.uplodad_thermameter[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.uplodad_thermameter[i].path);
        alluploads.push(resp.secure_url);
      }
      data.uplodad_thermameter = alluploads;
    }
  

    if (req.files.DPSL_upload) {
      alluploads = [];
      for (let i = 0; i < req.files.DPSL_upload.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.DPSL_upload[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.DPSL_upload[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.DPSL_upload = alluploads;
    }

  
    if (req.files.uplodad_air_gauage) {
      alluploads = [];
      for (let i = 0; i < req.files.uplodad_air_gauage.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.uplodad_air_gauage[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.uplodad_air_gauage[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.uplodad_air_gauage = alluploads;
    }
  
  if (data) {
    const findandUpdateEntry = await statutoryCertificate.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: data },
      { new: true }
    );

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
  }  else {
    res.status(200).json({
      status: false,
      msg: "img not uploaded",
    });
  }
    }
}

