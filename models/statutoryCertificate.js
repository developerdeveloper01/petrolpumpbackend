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
    
          maintainance_of_assets:{type: String},
          service_request:{type:String},
          spare_purcahse:{type:String},
          outher:{type:String},
    
            Remarks: {type:String},
        
 

    },
    { timestamps: true }
);

module.exports = mongoose.model("statutoryCertificate", statutoryCertificate);