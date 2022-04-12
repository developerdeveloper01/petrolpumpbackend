const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    dealer_Id:
    {
        type: mongoose.Schema.Types.ObjectId,ref:"dealerform",
        trim: true,
        default: null,

    },
    staff_name: { type: String, require: true },
    addres: { type: String },
    mobile: { type: Number, require: true },
    joining_date: { type: String, require: true },
    adhar_number: { type: Number, require: true },
    adharimg: { type: Array, require: true },

    pan_number: { type: Number, require: true },
    panImg: { type: Array, require: true },
    photograh: { type: Array, require: true },
    date_of_brith: { type: String, require: true },
    salary_decieded: { type: String, require: true },
    salary_date: { type: String, require: true },
    apprpved_leaves: { type: String, require: true },
    status: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("stafform", thisSchema);
