const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tankmap = new Schema(
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
    tank:{
        type: String,
        trim: true,
        default: null,
    },
    Product:{
        type: mongoose.Schema.Types.ObjectId,ref:"product",
        trim: true,
        default: null
    },
capacity:{
    type: mongoose.Schema.Types.ObjectId, ref:"capacity",
    trim: true,
    default: null
}
  },
  { timestamps: true }
);

module.exports = mongoose.model("tankmap", tankmap);
