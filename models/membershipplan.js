const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const membershipplan = new Schema(
  {
    dealer_id: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
    },
    date: { type: String },
    razorpay_payment_id: {
      type: String,
      trim: true,
      default: null,
    },
    amount: {
      type: Number,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("membershipplan", membershipplan);
