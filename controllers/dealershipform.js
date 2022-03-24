const Dealershipform = require("../models/dealershipform");
const Masteroil = require("../models/masteroil");
const Product = require("../models/product");
const Capacity = require("../models/capacity");
const State = require("../models/state");
const District = require("../models/district");

const resp = require("../helpers/apiresponse");
//var countrystatecity = require("country-state-city");
const jwt = require("jsonwebtoken");
const key = "verysecretkey";

exports.signupsendotp = async (req, res) => {
  const { mobile } = req.body;
  console.log("mobile", mobile)
  let length = 6;
  //   let otp = (
  //     "0".repeat(length) + Math.floor(Math.random() * 10 ** length)
  //   ).slice(-length);
  let otp = "123456";

  const newDealershipform = new Dealershipform({ mobile: mobile });
  const findexist = await Dealershipform.findOne({ mobile: mobile });
 
  if (findexist) {
    res.json({
      status: "success",
      msg: "Welcome Back Otp send successfully",
      registered: findexist?.mobile,
      _id: findexist?._id,
      otp: otp,
    });
  } else {
    newDealershipform.otp = otp;
    newDealershipform
      .save()
      .then((data) =>
        res.json({
          status: "success",
          msg: "Otp send successfully",
          registered: data?.mobile,
          _id: data?._id,
          otp: otp,
        })
      )
      .catch((error) => {
        //console.log("error", error)
        resp.errorr(res, error);
      })
  }
};

exports.verifyotp = async (req, res) => {
  const { mobile, otp } = req.body;
  const dealerDetail = await Dealershipform.findOne({ mobile: mobile });
  if (dealerDetail) {
    if (otp == "123456") {
      if (dealerDetail.userverified) {
        const token = jwt.sign(
          {
            dealerId: dealerDetail._id,
          },
          key,
          {
            expiresIn: "365d",
          }
        );
        await Dealershipform.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          { $set: { userverified: true } },
          { new: true }
        ).then((data) => {
          res.json({
            status: "success",
            token: token,
            msg: "Welcome Back",
            otpverified: true,
            redirectto: "dashboard",
            data: data,
          });
        });
      } else {
        if (!dealerDetail.userverified) {
          const token = jwt.sign(
            {
              dealerId: dealerDetail._id,
            },
            key,
            {
              expiresIn: "365d",
            }
          );
          res.json({
            status: "success",
            token: token,
            msg: "Continue signup",
            otpverified: true,
            redirectto: "signupdetail",
          });
        }
      }
    } else {
      res.json({
        status: "failed",
        msg: "Incorrect OTP",
      });
    }
  } else {
    res.json({
      status: "error",
      msg: "User doesnot exist",
    });
  }
};

exports.addeditbasicdealershipform = async (req, res) => {
  const {
    dealer_name,
    email,
    master_oil_company,
    location,
    omc_customer_code,
    state,
    district,
    total_no_mpd,
    total_no_bay,
    total_no_nozzles,
    total_no_tanks,
    total_no_air_machine,
    puc_machine,
    any_other_facility,
  } = req.body;

  await Dealershipform.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: {
        dealer_name: dealer_name,
        email: email,
        master_oil_company: master_oil_company,
        location: location,
        omc_customer_code: omc_customer_code,
        state: state,
        district: district,
        total_no_mpd: total_no_mpd,
        total_no_bay: total_no_bay,
        total_no_nozzles: total_no_nozzles,
        total_no_tanks: total_no_tanks,
        total_no_air_machine: total_no_air_machine,
        puc_machine: puc_machine,
        any_other_facility: any_other_facility,
      },
    },
    { new: true }
  ).populate("master_oil_company")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.addeditadvancedealershipform = async (req, res) => {
  const { tank_map, mpd_map, bay_map, nozzle_map } = req.body;
  const dealerdetail = await Dealershipform.findOne({
    _id: req.params.id,
  });
  if (dealerdetail) {
    if (dealerdetail)
      await Dealershipform.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: req.body },
        { new: true }
      ).populate("master_oil_company")
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
  }
};

exports.viewonedealershipform = async (req, res) => {
  await Dealershipform.findOne({ _id: req.params.id }).populate("master_oil_company")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.alldealers = async (req, res) => {
  await Dealershipform.find().populate("master_oil_company")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.gettankmap = async (req, res) => {
  let filter = {
    dealer_id: req.params.dealerid,
  };
let result = await Dealershipform.find({'tank_map':{filter}});

console.log(result);
//await DealershipBayMap.insertMany(bay_map);

resp.successr(res, result)

};
exports.deletedealershipform = async (req, res) => {
  await Dealershipform.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.addmasterCompny= async (req, res) => {
  const { dealer_id, name} = req.body;

  const newOilCompany = new Masteroil({
    name: name,
    dealer_id: dealer_id,
   
  });
  const findexist = await Masteroil.findOne({ name: name });
  if (findexist) {
    resp.alreadyr(res,'Masteroilompany');
  } else {
    newOilCompany
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.allMasterOilCompany = async (req, res) => {
  await Masteroil.find().populate('name')
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.addproduct= async (req, res) => {
  const {product,dealer_id} = req.body;

  const newproduct = new Product({
    product: product,
    dealer_id:dealer_id
    //dealer_id: dealer_id,
   
  });
  const findexist = await Product.findOne({ product: product });
  if (findexist) {
    resp.alreadyr(res,'product');
  } else {
    newproduct
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};
exports.deleteproduct = async (req, res) => {
  await Product.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allproduct = async (req, res) => {
  await Product.find()
  .sort({ sortorder: 1 })
  .then((data) => resp.successr(res, data))
  .catch((error) => 
  {
    console.log("error",error)
    resp.errorr(res, error)

  })
};

exports.addcapacity= async (req, res) => {
  const {capacity} = req.body;

  const newcapacity = new Capacity({
    capacity:capacity
    //dealer_id: dealer_id,
   
  });
  const findexist = await Capacity.findOne({ capacity:capacity });
  if (findexist) {
    resp.alreadyr(res,'capacity');
  } else {
    newcapacity
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};
exports.allcapacity = async (req, res) => {
//  const {capacity} = req.body;
//   await Capacity.deleteOne({capacity:"40kl"})
  await Capacity.find().populate('dealer_id')
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

// exports.addstate= async (req, res) => {
//   const {state} = req.body;

//   const newstate = new State({
    
//     state: state,
 
//     });
  
//     newstate
//       .save()
//       .then((data) => resp.successr(res, data))
//       .catch((error) => resp.errorr(res, error));
  
// };
// exports.getdistrict = async (req, res) => {
  
//   await District.find().populate("state_id")
//     .sort({ sortorder: 1 })
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };

// exports.adddistrict= async (req, res) => {
//   const { state_id,district} = req.body;

//   const newDistrict = new District({
//     state_id:state_id,
//     district: district,
//     });
 
//     newDistrict
//       .save()
//       .then((data) => resp.successr(res, data))
//       .catch((error) => resp.errorr(res, error));
  
// };

// exports.getstate = async (req, res) => {
//   const{
//     state_id,district
//   }=req.body
//   await State.find()
//     .sort({ sortorder: 1 })
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };


// exports.deletestate = async (req, res) => {
//   await State.deleteOne({ _id: req.params.id })
//     .then((data) => resp.deleter(res, data))
//     .catch((error) => resp.errorr(res, error));
// };
