const DealershipBayMap = require("../models/dealershipbaymap");
const Dealershiptankmap = require("../models/dealershipform")
const resp = require("../helpers/apiresponse");
const jwt = require("jsonwebtoken");
const key = "verysecretkey";

exports.getbaymap = async (req, res) => {
    let filter = {
        dealer_id: req.params.dealerid,
      };
    let result = await DealershipBayMap.find(filter);
    console.log(result);
    //await DealershipBayMap.insertMany(bay_map);
  
    resp.successr(res, result)
};
exports.gettankmap = async (req, res) => {
  let filter = {
      dealer_id: req.params.dealerid,
     
  }
   
  let result = await Dealershiptankmap.find(filter);
  console.log(result.tank_map);
  //await DealershipBayMap.insertMany(bay_map);

  resp.successr(res, result)
};
