const mongoose = require("mongoose")
const Schema = mongoose.Schema


const countrySchema = new Schema({

    isoCode: {
        type: String,
        require: true
    },
    name: {
        type: String,
    },
    phonecode: {
        type: Number,
        default: "91"
    }

},
    { timestamps: true }
)

module.exports = mongoose.model("country", countrySchema)