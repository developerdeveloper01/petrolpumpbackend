const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creditcustomer = new Schema(
  {
    name_of_customer: { type: String, require: true },
    mobile: { type: Number, require: true },
    credit_limit: { type: String, require: true },
    credit_term_lube: { type: String },
    addres: { type: String },
    local_id: { type: Number, require: true },
    document_upload: { type: Array },
    vehicle_no: { type: Number },
    local_guarantor_name: { type: String },
    local_guarantor_no: { type: Number }
  },
  { timestamps: true }
);
module.exports = mongoose.model("creditcustomers", creditcustomer);
