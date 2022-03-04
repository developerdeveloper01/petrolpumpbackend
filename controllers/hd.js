const hd = require("../models/hd");
const resp = require("../helpers/apiresponse");
exports.addopning_liter = async (req, res) => {
    const {
      
      opning_liter
     
    } = req.body;
  
    const newhd = new hd({
       
        opning_liter: opning_liter,
      
    });
    const findexist = await hd.findOne({ opning_dip: opning_dip });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exist",
        data: {},
      });
    }
    newhd
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
