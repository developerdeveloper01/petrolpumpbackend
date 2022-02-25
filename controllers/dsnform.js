const DSNaddfrom= require("../models/dsnform");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;


exports.addDsnform = async (req, res) => {
    const {
     dsn_name,
      addres,
      mobile,
      joining_date,
      adhar_number,
      // frontimage,
      // backimage,
      pan_number,
      //panImg,
      // photograh,
      date_of_brith,
      salary_decieded,
      salary_date,
      any_other_facility,
      apprpved_leave,
      status
    } = req.body;
  
    const newDSNform = new  DSNaddfrom ({
      dsn_name: dsn_name,
      addres: addres,
      mobile: mobile,
      joining_date: joining_date,
      adhar_number: adhar_number,
      // frontimage:frontimage,
      // backimage:{type: String,},
      pan_number: pan_number,
      //panImg:panImg,
      // photograh:photograh,
      date_of_brith: date_of_brith,
      salary_decieded: salary_decieded,
      salary_date: salary_date,
      any_other_facility: any_other_facility,
      apprpved_leave: apprpved_leave,
      status:status
  
    })
    const findexist = await DSNaddfrom .findOne({ mobile: mobile });
    if (findexist) {
      resp.alreadyr(res, 'DSM');
    } 
    else {
    //   if(req.files){
    //     console.log(req.files);
    //     // cloudinary.uploader.upload("my_picture.jpg", function(error, result) { console.log(result) });
    // }
      newDSNform.save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
    // if (req.file) {
    //   const resp = await cloudinary.uploader.upload(req.file.path);
    //   // if (resp) {
    //     newManegeraddfrom.panImg= resp.secure_url;
    //   fs.unlinkSync(req.file.path);
    // }
  };
  exports.getDsnform = async (req, res) => {
    await DSNaddfrom.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  
exports.getoneDsnform = async (req, res) => {
  await DSNaddfrom.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

  
exports.deleteDsnform = async (req, res) => {
  await DSNaddfrom.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports .editDsnform= async (req, res) => {
  const findoneandupdate = DSNaddfrom .findOneAndUpdate(
 
        {
         _id: req.params.id,
     },
       {
           $set:req.body},
       { new: true }
 ) 
 .then((data) => resp.successr(res, data))
 .catch((error) => resp.errorr(res, error));
};

  