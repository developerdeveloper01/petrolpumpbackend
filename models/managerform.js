const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    dealer_id:{type: mongoose.Schema.Types.ObjectId,ref:"dealerform"},
    maneger_name: { type: String, require: true },
    addres: { type: String },
    mobile: { type: Number},
    joining_date: { type: String},
    adhar_number: { type: Number},
    adharimg: { type: Array},
    pan_number: { type: Number },
    panImg: { type: Array },
    photograh: { type: Array },
    date_of_brith: { type: String, require: true },
    salary_decieded: { type: String, require: true },
    salary_date: { type: String},
    apprpved_leaves: { type: String, require: true },
    status: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("menegeraddfrom", thisSchema);
///console