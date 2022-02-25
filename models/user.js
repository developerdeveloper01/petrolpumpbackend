const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    admin_name: { type: String, require: true },
    email: { type: String, require: true },
    mobile: { type: Number, require: true },
    addres: { type: String },
    district: { type: String },
    state: { type: String },

    status: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", thisSchema);
