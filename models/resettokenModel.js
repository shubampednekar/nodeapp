import mongoose from "mongoose";
import { Schema } from "mongoose";
const resettokenSchema = mongoose.Schema(
    {
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'user'
    },    
    token : {
        type : String,
        required : true
    },
    hashedToken : {
        type : String,
        required : true
    },
    created : {
        type : Date,
        required : true
    }
    },
    {
        timestamps : true
    }
);

export const Resettoken = mongoose.model('reset-token',resettokenSchema);
