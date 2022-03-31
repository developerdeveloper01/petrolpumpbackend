const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fuelstock = new Schema(
  {
    id: {
      type: String,
      generated: true,
      trim: true,
    },
    
    tank:{
        type: mongoose.Schema.Types.ObjectId,ref:"tank_map",
        trim: true,
        default: null,
    },
    
    meter_sales:{
        type: Number,
        trim: true,
        default: null,
    },
    testing:{
        type: Number,
        trim: true,
        default: null,
    },
   
    net_sales:{
        type: Number,
        trim: true,
        default: null,

    },
    tank_receipt:{
        type: Number,
        trim: true,
        default: null,
    },
    loss_booked:{
        type: Number,
        trim: true,
        default: null,

    }, 
    total_expected_stock:{
        type: Number,
        trim: true,
        default: null,
    },
   actual_closing_stock:{
        type: Number,
        trim: true,
        default: null,

    },
    loss_gain:
    { 
        type: Number,
        trim: true,
        default: null,
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("fuelstock", fuelstock);
