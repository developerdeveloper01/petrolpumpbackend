const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const designoutlet = new Schema(
  {
    no_of_mpp: { type: String, require: true },
    no_of_bay: { type: String },
    no_of_nozzles: { type: Number, require: true },
    no_of_tank: { type: String, require: true },
    no_of_air_machines: { type: Number, require: true },
    puc_machine: { type: Array, require: true },

    any_other_facilities: { type: Number, require: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("designoutlet", designoutlet);
//conole