const dsmclosing = require("../models/dsmclosingsheet");
const RSP = require("../models/rsp");
const resp = require("../helpers/apiresponse");
const lubricantsales = require("../models/lubricantsales");
const bm = require("../models/baymanagementold");

let  getCurrentDate = function() {
  const t = new Date();
  const date = ('0' + t.getDate()).slice(-2);
  const month = ('0' + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${year}-${month}-${date}`;
}
exports.adddsmclosing = async (req, res) => {
  const {
    dealer_name1,
    date,
    name_of_dsm,
    ms_sales,
    ms_testing,
    ms_own_use,
    hsd_sales,
    hsd_testing,
    hsd_own_use,
    lubricant_sales,
    net_cash
  } = req.body;


  let rsp = await RSP.findOne().sort({createdAt:-1});
  const rs1 = rsp.rsp1;
  const rs2 = rsp.rsp2;
  console.log("rsp1", rs1);
  console.log("rsp2", rs2);
  let  lubricant = await lubricantsales.findOne({"date": getCurrentDate(),'dsm':req.body.name_of_dsm}).sort({createdAt:-1});
  console.log("lubricant", lubricant)
const lubricantsale =lubricant.total_seal;
console.log(lubricantsale);

let Ms = await bm.findOne({"dsm__Id":req.body.name_of_dsm,}).sort({createdAt:-1});
console.log("dsm",Ms)
const sumMS = Ms.sumMS;
  console.log(sumMS);
  
let Hsd = await bm.findOne().sort({createdAt:-1});
const sumHSD = Hsd.sumHSD;
  console.log(sumHSD);
  

  const newdsmclosing= new dsmclosing({    
    dealer_name1:dealer_name1,
    date:getCurrentDate(),
    name_of_dsm: name_of_dsm,
    ms_sales: sumMS,
    ms_testing:ms_testing,
    ms_own_use:ms_own_use,
    hsd_sales:sumHSD,
    hsd_testing:hsd_testing,
    hsd_own_use:hsd_own_use,
    lubricant_sales:lubricantsale,
    net_cash:(sumMS-ms_testing)*rs1-ms_own_use+(sumHSD-hsd_testing-hsd_own_use)*rs2-hsd_own_use+lubricantsale
  });
  //console.log(net_cash);
  
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
         .find().sort({ createdAt: -1 }).populate("dealer_name1")
         .populate("name_of_dsm").populate('lubricant_sales')
         .populate([
            {
              path: 'ms_sales',
              select:'closing_total'

            }
         ]).populate([
            {
              path: 'hsd_sales',
              select:'closing_total'

            }
         ])
// .populate([
// {
//         path:'closing_total',
//        select:''
// }
//       ])

      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.getonedsmclosing = async (req, res) => {

    await dsmclosing
      .findOne({ _id: req.params.id })
      .populate("dealer_name1")
     // .populate("ms_sales")
      //.populate("hsd_sales")
      .populate("name_of_dsm")
      //.populate([
    //     {
    //       path: 'ms_sales',
    //       name:'closing_total',
        

    //     }
    //  ]).populate([
    //     {
    //       path: 'hsd_sales',
    //       name:'closing_total',
       

    //      }
    //   ])
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.deletedsmclosing = async (req, res) => {
    await dsmclosing.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updatedsmclosing = async (req, res) => {
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
  