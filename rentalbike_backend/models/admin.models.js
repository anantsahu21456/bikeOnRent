import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['As a bike admin , As s user']
    }

},{timestamps:true})

export const Admin = mongoose.model("Admin" , adminSchema)