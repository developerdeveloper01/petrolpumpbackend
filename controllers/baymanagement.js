const bm = require("../models/baymanagement");
const resp = require("../helpers/apiresponse");

exports.addbm = async (req, res) => {
  const {
    dealer_name2,
    date,
    bay,
    nozzel,
    opening_total,
    closing_Entry,
    


  } = req.body;

  

  const newbm= new bm({
    dealer_name2:dealer_name2,
    date:date,
    bay: bay,
    nozzel:  nozzel,
    opening_total:opening_total,
    closing_Entry:closing_Entry,
   

  });
  
  newbm
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
exports.allbm = async (req, res) => {
    await bm
         .find().populate([
        {
          path: 'bay',
          select:'bay_map',
        }
      ]).populate([
        {
          path: 'nozzel',
          select:'nozzle_map',
        }
     ]).populate("dealer_name2").populate([
      {
        path: 'opening_total',
        select:'opneing_liter1',
      }
   ])
//.populate([
// {
//         path:'closing_total',
//         select:''
// }
//       ])



      .sort({ sortorder: 1 })
      .then((results) => {
        let closing_total = [];
       for (const result of results) {
         result.newtotal = result.opening_total - result.closing_Entry;
         closing_total.push(result);
       }
       res.status(200).json({
         status: true,
         msg: "success",
         data: closing_total,
       });
       //resp.successr(res, data)
     })
  };
  exports.getonebm = async (req, res) => {

    await bm
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
    await bm.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updatebm = async (req, res) => {
    console.log(req.params.id);
  await bm
   
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
  