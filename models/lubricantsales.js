const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lubricantsales = new Schema(
  {
    dealer_name1:{type: mongoose.Schema.Types.ObjectId,ref:"dealerform"},
    date: { type: String, require: true },
    lube_grade: {type: mongoose.Schema.Types.ObjectId,ref:"lubestock"},
    total_pieces_available: { type: mongoose.Schema.Types.ObjectId,ref:"lubestock"},
    no_of_pieces_sold: { type: Number },
    selling_price: {type: Number},
    dsm:{type: mongoose.Schema.Types.ObjectId,ref:"dsmform"},
    mode_of_pyament:{type: mongoose.Schema.Types.ObjectId,ref:"payment"},
    gst:{type: Number},
    discount:{type: Number},
   
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("lubricantsales", lubricantsales);
