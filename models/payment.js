const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    customer_name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    credit_limit: {
      type: String,
      required: true,
    },
    credit_term_fuel: {
      type: String,
      required: true,
    },
    credit_term_lube: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    local_id: {
      type: String,
      required: true,
    },
    signed_document: {
      type: String,
    },
    vehicles: [
      {
        type: String,
      },
    ],
    local_guarantor_name: {
      type: String,
    },
    local_guarantor_number: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("creditcustomer", thisSchema);
