const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statutoryCertificate = new Schema(
    {
    
            Due_Date_of_Stamping: {type:String},
            Upload_5l: {type:Array},
            Class_A: {type:String},
            Class_B:{type:String},
            Due_Date_of_PESO:{type:String},
            Upload_PESO :{type:Array},

            scale: {type:String},
            Hydrometer_Due_Date:{type:String},
            Upload_Hydrometer: {type:Array},
    
            Calibration_Due_Date: {type:String},
            Upload_Thermometer_1:{type:Array},
            Upload_Thermometer2: {type:Array},
    
            Due_Date_of_Calibration: {type:String},
            Upload_Air_Gauage:{type:Array},
   
            _DPSL_Due_Date: {type:String},
            Upload_DPSL:{type:Array},
    
            Remarks: {type:String},
            Due_Date:{type:String},
            Add_Other_Documents:{type:Array}
 

    },
    { timestamps: true }
);

module.exports = mongoose.model("statutoryCertificate", statutoryCertificate);