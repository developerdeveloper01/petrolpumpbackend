const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    dealer_name: { type: String, require: true },
    mobile: { type: Number, require: true },
    email: { type: String, require: true },
    master_oil_company: { type: String },
    location: { type: String },
    omc_customer_code: { type: String },
    state: { type: String },
    district: { type: String },
    total_no_mpd: { type: Number },
    total_no_bay: { type: Number },
    total_no_nozzles: { type: Number },
    total_no_tanks: { type: Number },
    total_no_air_machine: { type: Number },
    puc_machine: { type: Number },
    any_other_facility: { type: Number },
    tank_map:[{
        tank_number:String,
        product_map:String,
        capacity_litre:Number,
    }],
    mpd_map:[{
        mpd_number:String,
        bay_map:[{type:String}],
    }],
    bay_map:[{
        bay_number:String,
        bay_map:[{type:String}],
    }],
    nozzle_map:[{
        nozzle_number:String,
        tank_map:[{type:String}]
    }],
    payment_mode:{type:String},
    payment_bank:{type:String},
    otp:{type:String},
    userverified:{type:Boolean,default:false},
  },
  { timestamps: true }
);

module.exports = mongoose.model("dealerform", thisSchema);
