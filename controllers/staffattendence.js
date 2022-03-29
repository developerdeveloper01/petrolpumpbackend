const SA = require("../models/staffattendence");
const resp = require("../helpers/apiresponse")
exports.addattendence = async (req, res) => {
  const {
    name_of_staff,
    designation,
    attendence_marking,
    leave_taken,
    leave_available
  } = req.body;

  const newstaffattendence= new SA({
    name_of_staff: name_of_staff,
    designation : designation,
    attendence_marking: attendence_marking,
    leave_taken: leave_taken,
    leave_available: leave_available,
  });


  newstaffattendence      .save()
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

  exports.allatendence = async (req, res) => {
    await SA
      .find()
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.getoneatendence = async (req, res) => {
    await SA
      .findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.deleteatendence= async (req, res) => {
    await SA.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updateatendence = async (req, res) => {
    console.log(req.params.id);
  await SA
   
      .findOneAndUpdate(
        {
          _id: req.params.id,
        //  console.log(req.params._id);
      },
        {
          $set: req.body,
        },
        { new: true }
      )
      
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
      console.log(req.params._id);
  };
  