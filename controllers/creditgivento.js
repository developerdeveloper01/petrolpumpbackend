const resp = require("../helpers/apiresponse");
const creditgiven = require("../models/creditgivento");
const creditcustomers = require("../models/creditcustomers");

let  getCurrentDate = function() {
    const t = new Date();
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    return `${date}-${month}-${year}`;
  }
exports.addcreditgiven = async (req, res) => {
    const {
      dealer_Id,
      date,
      name_of_customer,
      vehicle_no,
      credit_for,
      opening_balance,
      credit_limit,
      payment_overdue_as_on_date,
      credit_given_today_amount,
      dsm_name,
      credit_setalment
    } = req.body;


    const newcreditgiven= new creditgiven({    
      dealer_Id:dealer_Id,
      date:getCurrentDate(),
      name_of_customer: name_of_customer,
      vehicle_no: vehicle_no,
      credit_for:credit_for,
      opening_balance:opening_balance,
      credit_limit:credit_limit,
      payment_overdue_as_on_date:payment_overdue_as_on_date,
      credit_given_today_amount:credit_given_today_amount,
      dsm_name:dsm_name,
      credit_setalment:credit_setalment
    });
    //console.log(net_cash);
    
    newcreditgiven
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
}

exports.searchnameCoustomer = async (req, res) => {
    const { oneinput } = req.body;
    const findall = await creditcustomers.find({
        name_of_customer: { $regex: oneinput, $options: "i" },
    });
  
    if (findall) {
      let somearray = [];
      findall.forEach((i) => {
        somearray.indexOf(i. name_of_customer) === -1
          ? somearray.push(i. name_of_customer)
          : console.log("already exists");
        //console.log(i)
      });
      console.log(somearray);
  
      let getname = async () => {
        await creditcustomers.find({ name_of_customer: { $in: somearray } }).then((data1) => {
          res.status(200).json({
            status: true,
            data: data1,
          });
        });
      };
      getname();
  
      res.status(200).json({
        status: true,
        msg: "success",
        data: findall,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  };

  
exports.searchvhicalCoustomer = async (req, res) => {
    const { oneinput } = req.body;
    const findall = await creditcustomers.find({
        vehicle_no: { $regex: oneinput, $options: "i" },
    });
  
    if (findall) {
      let somearray = [];
      findall.forEach((i) => {
        somearray.indexOf(i. vehicle_no) === -1
          ? somearray.push(i. vehicle_no)
          : console.log("already exists");
        //console.log(i)
      });
      console.log(somearray);
  
      let getvehicle_no = async () => {
        await creditcustomers.find({ vehicle_no: { $in: somearray } }).then((data1) => {
          res.status(200).json({
            status: true,
            data: data1,
          });
        });
      };
      getvehicle_no();
  
      res.status(200).json({
        status: true,
        msg: "success",
        data: findall,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  };

  exports.allcreditgiven= async (req, res) => {
    await creditgiven
         .find().sort({ createdAt: -1 }).populate("dealer_Id") .populate("name_of_customer")
         .populate("dsm_name")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.getonecreditgiven = async (req, res) => {
    await creditgiven
      .findOne({ _id: req.params.id })
      .populate("dealer_Id") .populate("name_of_customer")
      .populate("dsm_name")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.deletecreditgiven = async (req, res) => {
    await creditgiven.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updatecreditgiven = async (req, res) => {
    console.log(req.params.id);
  await creditgiven
   
      .findOneAndUpdate(
        {
          _id: req.params.id,
        //  console.log(req.params._id);
      },
        {
          $set: req.body,
        },
        { new: true }
      ).populate("dealer_name1") .populate("name_of_customer")
      .populate("dsm_name")
      
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
      console.log(req.params._id);
  };
  