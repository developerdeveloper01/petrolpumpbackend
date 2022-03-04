const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hd = new Schema(
    {
      opning_liter: { type: Number },
   
    },
    { timestamps: true }
  );
  module.exports = mongoose.model("hd", hd);
  