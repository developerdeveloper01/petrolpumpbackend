const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const state = new Schema(
    {
        id: {
            type: Number,

        },

        state: {
            type: String,
            trim: true,
            default: null,
        },
        district:
        {
            type: String,
            trim: true,
            default: null,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("state", state);
