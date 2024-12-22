import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const bookSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        required: true,
        ref : 'user'
    }
},
{
    timestamps : true
});

export const BookSchema = mongoose.model('books',bookSchema);