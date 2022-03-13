const DealershipBayMap = require("../models/dealershipbaymap");
const resp = require("../helpers/apiresponse");
const jwt = require("jsonwebtoken");
const key = "verysecretkey";

exports.getbaymap = async (req, res) => {
    let filter = {
        dealer_id: req.params.dealerid,
      };
    let result = await DealershipBayMap.find(filter);
    //await DealershipBayMap.insertMany(bay_map);
  
    resp.successr(res, result)
};