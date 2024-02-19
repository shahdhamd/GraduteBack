
import {Types,Schema, model } from "mongoose";
const herbSchema=new Schema({
   ArabicName:{
        type:String,
        required:[true,'Arabic Name is required'],
    },
    EnglishName:{
        type:String,
        required:[true,'English Name is required'],
    },
    description:{
        type:String
    },
    benefit:{
        type:String
    },
    effect:String,
    place:String,
    image:String,
    contributionID:{
        type:Types.ObjectId,
        ref:'contribution',
        required:[true,'herb owner is required']
    },
    publicId:String

})

const herbModel=model('herb',herbSchema)

export {herbModel}

