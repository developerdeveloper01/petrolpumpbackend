const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bank = new Schema(
  {
    name_of_bank: { type: String, require: true },
    credit_limit_of_bank: { type: Number, require: true },
    intrest_rates: { type: Number, require: true },
    ifsc_code: { type: Number },
    cresit_offer: { type: String },
    document_upload: { type: Array }
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("bank", bank);