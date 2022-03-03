const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    password: { type: String },
    cnfmPassword: { type: String },
    resetpassword:{type: String},
    profilepic:{type: Array},
    changelogo:{type : Array}
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", thisSchema);
