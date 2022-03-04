const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rsp = new Schema(
  {
    date: { type: String, require: true },
    opneing_liter1: { type: mongoose.Schema.Types.ObjectId,ref:"hd" },
    opneing_dip1:{ type: mongoose.Schema.Types.ObjectId,ref:"ms" },
    rsp1: { type: String },
    opneing_liter2: { type: mongoose.Schema.Types.ObjectId,ref:"hd" },
    opneing_dip2:{ type: mongoose.Schema.Types.ObjectId,ref:"ms" },
    rsp2: { type: String },
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("rsp", rsp);
