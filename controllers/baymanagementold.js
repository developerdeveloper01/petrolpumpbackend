const bm = require("../models/baymanagementold");
const resp = require("../helpers/apiresponse");
const RSP = require("../models/rsp");

exports.addbm = async (req, res) => {
  const {
    dealer_Id,
    dsm__Id,
    date,
    bay,
    nozzel,
    opening_total1,
    opening_total2,
    closing_Entry_MS,
    closing_Entry_HSD,
    closing_total_MS,
    closing_total_HSD,
    sumMS,
    sumHSD,

  } = req.body;
  // await bm.find({$sum: "$closing_Entry_MS" }  );
  // let sum =await bm.find({$sum:req.body.$closing_Entry_MS})
  // console.log("sum ms",sum)

  let rsp = await RSP.findOne().sort({createdAt:-1})
  const rs1 = rsp.opneing_liter1;
  const rs2 = rsp.opneing_liter2;
  console.log("rsp1", rs1);
  console.log("rsp2", rs2);
  const newbm= new bm({
    dealer_Id:dealer_Id,
    dsm__Id:dsm__Id,
    date:date,
    bay: bay,
    nozzel:  nozzel,
    opening_total1:rs1-closing_Entry_MS,
    opening_total2:rs2-closing_Entry_HSD,
    closing_Entry_MS: closing_Entry_MS,
    closing_Entry_HSD: closing_Entry_HSD,
    closing_total_MS:rs1-closing_Entry_MS,
    closing_total_HSD:rs1-closing_Entry_HSD
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
  const {
    dealer_Id,
    dsm__Id,
    date,
    bay,
    nozzel,
    opening_total1,
    opening_total2,
    closing_Entry_MS,
    closing_Entry_HSD,
    closing_total_MS,
    closing_total_HSD,
    sumMS,
    sumHSD,

  } = req.body;
 
  var date1= new Date();
   console.log(date1)
  const d= await bm.find({dateonly:date1})

 // Iterating over the array and printing
//  let total=d.forEach(element => {
//   sum += element;
// });
// console.log("sum",sum)


  // const d=await bm.find({closing_Entry_MS:req.body.date})
//console.log("data",d.closing_Entry_MS)
    // await bm
    //      .find()
    //      .populate([
    //     {
    //       path: 'bay',
    //       select:'bay_map',
    //     }
    //   ]).populate([
    //     {
    //       path: 'nozzel',
    //       select:'nozzle_map',
    //     }
    //  ]).populate("dealer_Id").populate("dsm__Id")
//.populate([
// {
//         path:'closing_total',
//         select:''
// }
//       ])



      .sort({ sortorder: 1 })
      .then((results) => {
        let closing_total=[];
       // let total=[];
       for (const result of results) {

         console.log( result.closing_Entry_MS)
      const total=  result.closing_Entry_MS ;

console.log(total)
    
     closing_total.push(result);

        //  console.log("what",closing_total.push(result))
       }
       if(total)
       {
        for (let value of total) {
          value += total;
          console.log(value);
        }
       }else{
         console.log("not value find")
       }
       //console.log(closing_total)
      //  if(closing_total)
      //  {
      //   for (let value of closing_total) {
      //     value += closing_total;
      //     console.log(value);
      //   }
      //  }else{
      //    console.log("not value find")
      //  }
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
  