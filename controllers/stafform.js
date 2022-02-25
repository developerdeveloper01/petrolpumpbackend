const staffrom = require("../models/stafform");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;




exports.addstaff = async (req, res) => {
  const {
    staff_name,
    addres,
    mobile,
    joining_date,
    adhar_number,
    // frontimage,
    // backimage,
    pan_number,
    panImg,
    // photograh,
    date_of_brith,
    salary_decieded,
    salary_date,
    any_other_facility,
    apprpved_leave,
    status
  } = req.body;

  const newstaffaddfrom = new staffrom({
    staff_name: staff_name,
    addres: addres,
    mobile: mobile,
    joining_date: joining_date,
    adhar_number: adhar_number,
    //  frontimage:frontimage,
    //  backimage:{type: String,},
    pan_number: pan_number,
    panImg:panImg,
    // photograh:photograh,
    date_of_brith: date_of_brith,
    salary_decieded: salary_decieded,
    salary_date: salary_date,
    any_other_facility: any_other_facility,
    apprpved_leave: apprpved_leave,
    status:status

  })
  const findexist = await staffrom.findOne({ mobile: mobile });
  if (findexist) {
    resp.alreadyr(res, 'staff');
  } 
  else {
  //   if(req.files){
  //     console.log(req.files);
  //      cloudinary.uploader.upload("panImg", function(error, result) { console.log(result) });
  // }
//     if (req.file) {
//      const resp = await cloudinary.uploader.upload(req.file.path);
//       if (resp) {
//        newstaffaddfrom.panImg= resp.secure_url;
//     fs.unlinkSync(req.file.path);
//    }}
    newstaffaddfrom.save()
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
exports.allstaff = async (req, res) => { 
  await staffrom.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getonestaff = async (req, res) => {
  await staffrom.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletestaff = async (req, res) => {
  await staffrom.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports .updateonestaff = async (req, res) => {
   const findoneandupdate = staffrom.findOneAndUpdate(
  
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


