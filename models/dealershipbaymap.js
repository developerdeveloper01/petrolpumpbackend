const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    id: {
      type: String,
      generated: true,
      trim: true,
    },
    dealer_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
    },
    bay_name:{
        type: String,
        trim: true,
        default: null,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("dealershipbaymap", thisSchema);
