const cashcollected = require("../models/cashcollected");
const resp = require("../helpers/apiresponse")
const creditgiven = require("../models/creditgivento")
const dsmclosing = require("../models/dsmclosingsheet");
const _ = require("lodash");
const expenses = require("../models/expenses");


let  getCurrentDate = function() {
  const t = new Date();
  const date = ('0' + t.getDate()).slice(-2);
  const month = ('0' + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}-${month}-${year}`;
}
exports.addcashcollected= async (req, res) => {
  const {
    date,
    dealer_name,
    dsm_Id,
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
    total,
    upi_Cash,
    credit_cash,
    debit_cash,
    credit,
    cash_use,
    final_cash,
    cash_difference,
    cash_handed_over_to

  } = req.body;
  
  let totalcash=0;
  if(_2000)
  {
    totalcash += _2000*2000;

  }
  if(_500)
  {
    totalcash +=_500*500;
  }
  if(_200)
  {
    totalcash +=_200*200;
  }
  if(_100)
  {
    totalcash +=_100*100;
  }
  if(_50)
  {
    totalcash +=_50*50;
  }
  if(_20)
  {
    totalcash +=_20*20;
  }
  if(_10)
  {
    totalcash +=_10*10;
  }
  if(_5)
  {
      total +=_5*5;
  }
  if(_2)
  {
    totalcash +=_2*2;
  }
  if(_1)
  {
    totalcash +=_1*1;
  }

  let cg= await creditgiven.find({$and:[{"dsm":req.body.dsm_Id},{"date":getCurrentDate()}]})
  console.log("cg",cg)
  
  var newarr = cg.map(function (value) {
    return value.credit_given_today_amount
  })
  
   let sumcredit = (_.sum([...newarr]))
      console.log(sumcredit)
let cu=await expenses.find({$and:[{"dsm":req.body.dsm_Id},{"date":getCurrentDate()}]})
console.log("expenses",cu)
var newarr_cu = cu.map(function (value) {
  return value.amount
})
console.log("expenses",newarr_cu)
let sumcu = (_.sum([...newarr_cu]))
      console.log(sumcu)
  
      let net =await dsmclosing.find({'date':getCurrentDate(),'name_of_dsm':req.body.dsm_Id})
  console.log("net cash",net)
  
      const newcashcollected = new cashcollected({
    date:getCurrentDate(),
    dealer_name:dealer_name,
    dsm_Id:dsm_Id,
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
    total:totalcash, 
    upi_Cash:upi_Cash,
    credit_cash:credit_cash,
    debit_cash:debit_cash,   
    credit:sumcredit,
    cash_use:sumcu,
    final_cash:totalcash+upi_Cash+credit_cash+debit_cash+sumcredit+sumcu,
    cash_difference:net-(totalcash+upi_Cash+credit_cash+debit_cash+sumcredit+sumcu),
    cash_handed_over_to:cash_handed_over_to
  });
  // let cash = cashcollected.findOne({ _id: req.body.id })
  //   console.log(cash)
  // let value=cash.value;

        
    newcashcollected.save()
      .then((data) => {
       
        res.status(200).json({
          status: true,
          msg: "success",
          data: data         
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
  
 await cashcollected

      .find().populate('dsm_Id').populate('cash_handed_over_to')
      .sort({ createdAt: -1 })
      
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
  