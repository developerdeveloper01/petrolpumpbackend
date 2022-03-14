const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const raiseConcern = mongoose.Schema(
    {
      id: {
        type: String,
        generated: true,
        trim: true,
      },
    
      concern:{
        type: String,
        trim: true,
        default: null,
      },
      remark:{
        type:String,
        trim: true,
        default: null,
      }
    
    
     
    
    },
    { timestamps: true }

  );
   

  // add plugin that converts mongoose to json
  
  
const rc = mongoose.model('raiseConcern', raiseConcern);
  
module.exports = rc;
//module.exports = mongoose.model("bm", baymanagement);
