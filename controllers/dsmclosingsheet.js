const dsmclosing = require("../models/dsmclosingsheet");
const nozzle_map = require("../models/nozzle_map");
const RSP = require("../models/rsp");
const resp = require("../helpers/apiresponse");
const lubricantsales = require("../models/lubricantsales");
const bm = require("../models/baymanagementold");


let  getCurrentDate = function() {
  const t = new Date();
  const date = ('0' + t.getDate()).slice(-2);
  const month = ('0' + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}-${month}-${year}`;
}
exports.adddsmclosing = async (req, res) => {
  const {
    dealer_name1,
    date,
    name_of_dsm,
    Nozzle,
    tank,
    ms_sales,
    ms_testing,
    ms_own_use,
    hsd_sales,
    hsd_testing,
    hsd_own_use,
    lubricant_sales,
    net_cash
  } = req.body;
let nozz_map= await nozzle_map.find({_id:req.body.Nozzle})
console.log("noz",nozz_map)
var noz = nozz_map.map(function (value) {
  return value.tank_map
})
console.log("noz",noz)

  let rsp = await RSP.findOne().sort({createdAt:-1});
  if(rsp==null){
    res.status(400).json({
      status: false,
      msg: "Enter RSP  "
    });
   
  }
  const rs1 = rsp.rsp1;
  const rs2 = rsp.rsp2;
  console.log("rsp1", rs1);
  let  lubricant = await lubricantsales.findOne({$and:[{"dsm":req.body.name_of_dsm},{"date":getCurrentDate()}]});
  if(lubricant==null){
    res.status(400).json({
      status: false,
      msg: "Enter lubricant Sales  "
    });
    resp.successr(res, lubricant)
  }
  console.log("lubricant", lubricant)
const lubricantsale =lubricant.total_seal;
console.log(lubricantsale);

let Ms = await bm.find({$and:[{"dsm":req.body.name_of_dsm},{"date":getCurrentDate()}]})
// console.log("dsm",Ms)
// const sumMS = Ms.sumMS;
//   console.log(sumMS);
var newarr = Ms.map(function (value) {
    return value.closing_Entry_MS
  })
  console.log(newarr)
  var sum1 = 0;
for (let i = 0; i < newarr.length; i++) {
        sum1 += newarr[i];
    }
    console.log(sum1)
  
let Hsd = await bm.find({$and:[{"dsm":req.body.name_of_dsm},{"date":getCurrentDate()}]})
// const sumHSD = Hsd.sumHSD;
//   console.log(sumHSD);
var newarr2 = Hsd.map(function (value) {
  return value.closing_Entry_HSD
})
console.log(newarr2)
var sum2 = 0;
for (let i = 0; i < newarr2.length; i++) {
  sum2 += newarr2[i];
    }
    console.log(sum2)
  const newdsmclosing= new dsmclosing({    
    dealer_name1:dealer_name1,
    date:getCurrentDate(),
    name_of_dsm: name_of_dsm,
    Nozzle:Nozzle,
    tank:noz,
    ms_sales: sum1,
    ms_testing:ms_testing,
    ms_own_use:ms_own_use,
    hsd_sales:sum2,
    hsd_testing:hsd_testing,
    hsd_own_use:hsd_own_use,
    lubricant_sales:lubricantsale,
    net_cash:(sum1-ms_testing)*rs1-ms_own_use+(sum2-hsd_testing)*rs2-hsd_own_use+lubricantsale
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
 // await dsmclosing.deleteMany({"date": getCurrentDate()})
    await dsmclosing
         .find().sort({ createdAt: -1 }).populate("dealer_name1")
         .populate("name_of_dsm")
         .populate([{
          path:'Nozzle',
          populate:[{
            path:'tank_map',
            populate:[{
              path:'tank'
            }]
          }]
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

  exports.alldsmclosingApp= async (req, res) => {
    // await dsmclosing.deleteMany({"date": getCurrentDate()})
       await dsmclosing
            .find({dealer_name1: req.params.dealer_name1}).populate("dealer_name1")
            .populate("name_of_dsm")
            .populate([{
             path:'Nozzle',
             populate:[{
               path:'tank_map',
               populate:[{
                 path:'tank'
               }]
             }]
           }    
           ])
            .sort({ createdAt: -1 })
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
   
  };
  