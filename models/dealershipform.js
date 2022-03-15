const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    id: {
      type: String,
      generated: true,
      trim: true,
    },
    dealer_name: { type: String, require: true },
    mobile: { type: Number, require: true },
    email: { type: String, require: true },
    master_oil_company: { type: mongoose.Schema.Types.ObjectId,ref:"masteroil" },
    location: { type: String , require: true},
    omc_customer_code: { type: String, require: true },
    state: { type: String , require: true},
    district: { type: String, require: true },
    total_no_mpd: { type: Number, require: true },
    total_no_bay: { type: Number , require: true},
    total_no_nozzles: { type: Number, require: true },
    total_no_tanks: { type: Number, require: true },
    total_no_air_machine: { type: Number , require: true},
    puc_machine: { type: Number , require: true},
    any_other_facility: { type: String, require: true},
    tank_map:[{
        tank_number:Number,
        product_map:[ { type: mongoose.Schema.Types.ObjectId,ref:"product" }],
        capacity_litre:[ { type: mongoose.Schema.Types.ObjectId,ref:"capacity" }],        
    }],
    mpd_map:[{
        mpd_number:String,
        bay_map:[{type:String}],
    }],
    bay_map:[{
        bay_number:String,
        nozzle_map:[{type:String}],
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
