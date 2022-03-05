const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const closing_bm = new Schema(
  {
    dsm_name1: { type: mongoose.Schema.Types.ObjectId,ref:"dsmform" },
    closing_total: { type: Number },
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("c_bm", closing_bm);
