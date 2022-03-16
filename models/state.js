const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const state = new Schema(
    {

        state: {
            type: String,
            trim: true,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("state", state);
