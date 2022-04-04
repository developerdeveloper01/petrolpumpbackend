const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creditgivento = new Schema(
  {  date:{type:String},
    dealer_Id:{type: mongoose.Schema.Types.ObjectId,ref:"dealerform"},
    name_of_customer: { type: mongoose.Schema.Types.ObjectId,ref:"creditcustomers" },
    vehicle_no: { type: mongoose.Schema.Types.ObjectId,ref:"creditcustomers" },
    credit_for:{type: String},
    opening_balance: {type: mongoose.Schema.Types.ObjectId,ref:"creditmanagement" },
    credit_limit: {type: mongoose.Schema.Types.ObjectId,ref:"creditcustomers" },
    payment_overdue_as_on_date: { type: Number },
    credit_given_today_amount: { type: Number },
    dsm_name: { type: mongoose.Schema.Types.ObjectId,ref:"dsmform"},
    credit_setalment:{type:Number}
  
  },
  { timestamps: true }
);
module.exports = mongoose.model("creditgivento", creditgivento);
