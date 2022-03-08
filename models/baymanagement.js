const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baymanagement = new Schema(
  {

    dealer_name2:{type: mongoose.Schema.Types.ObjectId,ref:"dealerform"},
    dsm_name1: { type: mongoose.Schema.Types.ObjectId,ref:"dsmform" },
    date:{type: String, require: true},
    bay: { type: mongoose.Schema.Types.ObjectId,ref:"dealerform" },
    nozzel:{ type: mongoose.Schema.Types.ObjectId,ref:"dealerform" },
    opening_total: {type: mongoose.Schema.Types.ObjectId,ref:"rsp"},
    //dsm_name1: { type: mongoose.Schema.Types.ObjectId,ref:"dsmform" },
    closing_Entry:{type: Number},
    closing_total: { type: Number },
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("bm", baymanagement);
