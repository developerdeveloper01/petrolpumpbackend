const Dealershipform = require("../models/dealershipform");
const Masteroil = require("../models/masteroil");
const Product = require("../models/product");
const Capacity = require("../models/capacity");
const State = require("../models/state");
const District = require("../models/district");
const Tank = require("../models/tank_map");
const Nozzle = require("../models/nozzle_map");

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
            _id: dealerDetail._id,
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
          await Dealershipform.findOneAndUpdate(
            {
              _id:  dealerDetail._id,
            },
            { $set: { userverified: true } },
            { new: true });
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
exports.logout= async (req, res) =>
{
  jwt.sign("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWFsZXJJZCI6IjYyNDM1MWE5Y2U0NDk0YjlkYjk5N2M3NiIsImlhdCI6MTY0ODU3OTEwNywiZXhwIjoxNjgwMTE1MTA3fQ.BTPUoNXBoZTeDAANOWzHYwjC1usNfsniuZCArD4Tlls", key, { expiresIn: 1648581321 } , (logout, err) => {
    if (logout) {
      jwt.destroy("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWFsZXJJZCI6IjYyNDM1MWE5Y2U0NDk0YjlkYjk5N2M3NiIsImlhdCI6MTY0ODU3OTEwNywiZXhwIjoxNjgwMTE1MTA3fQ.BTPUoNXBoZTeDAANOWzHYwjC1usNfsniuZCArD4Tlls")
      console.log('You have been Logged Out' );
      } else {
        console.log('Error');
      }
  });

}
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
  ).populate([{
    path: "master_oil_company",
    select:"name"
  }])
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
/*
exports.addeditadvancedealershipform = async (req, res) => {
  const { tank_map, nozzle_map } = req.body;
let result =req.body.tank_map
//  let tanknumber= result.filter(result)
//  console.log("value",tanknumber)
let newarr = result.map(function (value) {
 return value.tank_number })
console.log("tank_number",newarr)
let newarr2 = result.map(function (value) {
  return value.product_map })
  console.log("product_map",newarr2)
  let newarr3 = result.map(function (value) {
    return value.capacity_litre })
    console.log("capacity_litre",newarr3)
   
 
  const dealerdetail = await Dealershipform.findOne({
    _id: req.params.id,
  });
  if (dealerdetail) {
    if (dealerdetail)
      await Dealershipform.findOneAndUpdate(
        {
          _id: req.params.id},
          {
            $push: {
        tank_map: {
          $each: [ { tank_number:newarr, product_map:newarr2,capacity_litre:newarr3}]}}},
     // { $set: req.body },
        { new: true }
      ).populate("master_oil_company")
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
  }
};
*/
exports.viewonedealershipform = async (req, res) => {
  await Dealershipform.findOne({ _id: req.params.id }).populate([{
    path: "master_oil_company",
    select:"name"
  }])
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.alldealers = async (req, res) => {
  await Dealershipform.find().sort({ createdAt: -1 }).populate([{
    path: "master_oil_company",
    select:"name"
  }])
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
// exports.gettankmap = async (req, res) => {
//   let filter = {
//     dealer_id: req.params.dealerid,
//   };
// let result = await Dealershipform.find({'tank_map':{filter}});

// console.log(result);
// //await DealershipBayMap.insertMany(bay_map);

// resp.successr(res, result)

// };
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
  .sort({ createdAt: -1 })
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
  .sort({ createdAt: -1 })
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
  .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.addtankmap= async (req, res) => {
  const {dealer_id,tank,Product,capacity} = req.body;

  const newtank = new Tank({
    tank:tank,
    Product:Product,
    capacity:capacity,
    dealer_id: dealer_id,
   
  });

  newtank
      .save()
      .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
  
};
exports.alltankmap = async (req, res) => {
  //  const {capacity} = req.body;
  //   await Capacity.deleteOne({capacity:"40kl"})
    await Tank.find().populate('dealer_id')
    .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
exports.alltankmapApp = async (req, res) => {
  //  const {capacity} = req.body;
  //   await Capacity.deleteOne({capacity:"40kl"})
    await Tank.find({dealer_id:req.params.dealer_id}).populate('dealer_id')
    .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
   
  exports.updattankmap = async (req, res) => {
    console.log(req.params.id);
  await Tank
   
      .findOneAndUpdate(
        {
          _id: req.params.id,
      },
      { $set: { Product: req.body.Product, 
              capacity: req.body.capacity,dealer_id:req.body.dealer_id } },
        { new: true }
      ).populate('dealer_id')
      
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
      console.log(req.params._id);
  };
  
  
exports.getonetank = async (req,res)=>{
  const findone = await Tank.findOne({ _id: req.params.id}).populate('dealer_id')
  if(findone){
      res.status(200).json({
          status: true,
          msg: "success",
          data: findone
      })
  } else {
      res.status(400).json({
          status: false,
          msg: "error",
          error: "error"
      })
  }
}

exports.deletetankmap = async (req, res) => {
  await Tank.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.addnozzlemap= async (req, res) => {
  const {dealer_id,nozzle,mpd,bay,tank_map} = req.body;

  const newnozzle = new Nozzle({
    nozzle:nozzle,
    mpd:mpd,
    bay:bay,
    tank_map:tank_map,
    dealer_id: dealer_id,
   
  });
 
  newnozzle
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  
};
exports.allnozzle = async (req, res) => {
  
    await Nozzle.find().populate('dealer_id').
    populate([{
      path: "tank_map",
      select:"tank"}])
  
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.allnozzleApp= async (req, res) => {
  
    await Nozzle.find({dealer_id:req.params.dealer_id}).populate('dealer_id').
    populate([{
      path: "tank_map",
      select:"tank"}])
  
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
    
  exports.updatnozzle = async (req, res) => {
    console.log(req.params.id);
  await Nozzle
   
      .findOneAndUpdate(
        {
          _id: req.params.id,
      },
      { $set: { mpd: req.body.mpd, 
        bay: req.body.bay,
        tank_map:req.body.tank_map ,dealer_id:req.body.dealer_id } },
        { new: true }
      ).populate('dealer_id').
      populate([{
        path: "tank_map",
        select:"tank"}])
      
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
      console.log(req.params._id);
  };

  
exports.getonenozzle = async (req,res)=>{
  const findone = await Nozzle.findOne({ _id: req.params.id}).populate('dealer_id').
  populate("tank_map")
  if(findone){
      res.status(200).json({
          status: true,
          msg: "success",
          data: findone
      })
  } else {
      res.status(400).json({
          status: false,
          msg: "error",
          error: "error"
      })
  }
}

exports.deletenozzle = async (req, res) => {
  await Nozzle.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};