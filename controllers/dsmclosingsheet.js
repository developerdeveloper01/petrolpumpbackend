const dsmclosing = require("../models/dsmclosingsheet");
const resp = require("../helpers/apiresponse");

exports.adddsmclosing = async (req, res) => {
  const {
    dealer_name1,
     date,
     name_of_dsm,
     ms_sales,
     ns_trsting,
     ms_own_use,
     hsd_sales,
     lubricant_sales,
     net_cash


  } = req.body;

  

  const newdsmclosing= new dsmclosing({
    dealer_name1:dealer_name1,
    date:date,
    name_of_dsm: name_of_dsm,
    ms_sales:  ms_sales,
    ns_trsting:ns_trsting,
    ms_own_use:ms_own_use,
    hsd_sales:hsd_sales,
    lubricant_sales:lubricant_sales,
    net_cash:net_cash

  });
  
  newdsmclosing
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
};
exports.alldsmclosing= async (req, res) => {
    await dsmclosing
         .find().populate("dealer_name2").populate([
            {
              path: 'ms_sales',
              select:'closing_total',
              select:'date'

            }
         ]).populate("dealer_name2")
//.populate([
// {
//         path:'closing_total',
//         select:''
// }
//       ])

      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.getonebm = async (req, res) => {

    await dsmclosing
      .findOne({ _id: req.params.id }).populate([
        {
          path: 'bay',
          select:'bay_map',
        }
      ]).populate([
        {
          path: 'nozzel',
          select:'nozzle_map',
        }
      ]).populate("dealer_name2")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.deletebm = async (req, res) => {
    await dsmclosing.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updatebm = async (req, res) => {
    console.log(req.params.id);
  await dsmclosing
   
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
  