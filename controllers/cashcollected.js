const cashcollected = require("../models/cashcollected");
const resp = require("../helpers/apiresponse")
exports.addcashcollected= async (req, res) => {
  const {
    date,
    dealer_name,
    _2000,
    _500,
    _200,
    _100,
    _50,
    _20,
    _10,
    _5,
    _2,
    _1,
    payment_mode,
    credit,
    cash_use,
    final_cash,
    cash_handed_over_to


  } = req.body;
  
  // const total = cashcollected.findOne({ _id: req.body.id })
  // console.log(total)

  const newcashcollected= new cashcollected({
    date: date,
    dealer_name:dealer_name,
    _2000:_2000,
    _500:_500,
    _200:_200,
    _100:_100,
    _50:_50,
    _20:_20,
    _10:_10,
    _5:_5,
    _2:_2,
    _1:_1,
    payment_mode:payment_mode,
    credit:credit,
    cash_use:cash_use,
    final_cash:final_cash,
    cash_handed_over_to:cash_handed_over_to
  });
  let cash = cashcollected.findOne({ _id: req.body.id })
    console.log(cash)
let value=cash.value;
console.log(value);

    let total=0;
  if(req._2000)
        {
         total = cash._2000*2000;
  
        }else{
            if(req._500)
            {
                total=cash._500*500;
            }
          }
        
  console.log(total);
      

  newcashcollected .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
          total:total
         
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
//   const total = cashcollected.findOne({ _id: req.body._2000 })
//   console.log(total)

  exports.allcashcollected = async (req, res) => {
  
    
//       if(req._2000)
//       {
//        total = req._2000*2000;

//       }else{
//           if(req._500)
//           {
//               total=req._500*500;
//           }
//         }
      
// console.log(total);
 await cashcollected

      .find()
      .sort({ sortorder: 1 })
      
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "sucsses",
          data: data,
        
        
        });
      })
  }
  
  exports.getonecashcollected = async (req, res) => {
    await cashcollected
      .findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.deletecashcollected= async (req, res) => {
    await cashcollected.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updatecashcollected = async (req, res) => {
    console.log(req.params.id);
  await cashcollected
   
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
  