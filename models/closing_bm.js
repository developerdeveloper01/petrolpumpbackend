const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const closing_bm = new Schema(
  {
    
    closing_total: { type: Number },
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("c_bm", closing_bm);
