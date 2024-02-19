import {Types,Schema, model } from "mongoose";
const contributionSchema=new Schema({
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
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:[true,'herb owner is required']
    },
    publicId:String,
    verified:{
        type:Boolean,
        default:false
    },
})

const contributionModel=model('contribution',contributionSchema)

export {contributionModel}
