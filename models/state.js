const mongoose = require("mongoose")
const Schema = mongoose.Schema


const stateSchema = new Schema({

    state:{
        type: String
    },
    districts:{
        type: Array
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("state", stateSchema)
