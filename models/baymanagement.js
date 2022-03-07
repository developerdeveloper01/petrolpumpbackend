const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baymanagement = new Schema(
  {
    bay: { type: mongoose.Schema.Types.ObjectId,ref:"dealerform" },
    nozzel:{ type: mongoose.Schema.Types.ObjectId,ref:"dealerform" },
    opening_total: { type: Number },
    dsm_name1: { type: mongoose.Schema.Types.ObjectId,ref:"dsmform" },
    closing_Entry:{type: Number},
    closing_total1: { type: Number },
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("bm", baymanagement);
