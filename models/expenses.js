const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenses = new Schema(
  {
    date: { type: String, require: true },
    heading: { type: String, },
    amount: { type: Number, require: true },
    authoruzed_by: { type: String },
    dsm_manager: { type: String,require : true },
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("expenses", expenses);
