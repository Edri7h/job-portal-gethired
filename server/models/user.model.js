import mongoose, { mongo } from "mongoose";

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum :['student','recruiter'],
        required:true,
    },
    profile: {
        bio: { type: String, default: "" },
        skills: { type: [String], default: [] },
        resume: { type: String, default: "" },
        resumeOriginalName: { type: String, default: "" },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null },
        profilePhoto: { type: String, default: "" },
        
      },
      
},{timestamps:true});

export const User = mongoose.model("User",userSchema);