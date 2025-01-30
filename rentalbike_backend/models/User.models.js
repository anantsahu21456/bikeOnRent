// const mongoose = require(mongoose)
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:true,
        unique:true,
        index:true, //for searching by username this is make easy for searching
    },
    avatar:{
        type:String, //cloudinary url
        required:true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Unique makes sense for email
        lowercase: true,
    },
    phoneNumber: {  // Standard camelCase
        type: Number,
        required: true,
        unique: true,
    },
    password: {  // Fixing the typo
        type: String,
        required: [true, 'password is required']
    },
    refreshToken:{
        type:String,
        // required:true,
        default: "",
    },
    likeHistory:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'bike',
    },
   ]

},{timestamps:true})

// & here i'm hashing the password
UserSchema.pre('save',async function (next)
{
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password,10)  //& 10 is represinting number of time random we can give 8 also
        return next()
        
    }
    return next()

    // if(!this.isModified('password'))  //& this is alternate method we can use this one also 
    //     return next ()
})

// & now here i'm compare the password at the time of login when user enter his password
// UserSchema.methods.isPasswordcorrect = async function (password)
// {
//     return await bcrypt.compare(password,this.password)
// }
// User model (Schema)
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // This compares the entered password to the hashed password in DB
  };
  

UserSchema.methods.generateAccessToken = function (){
    return jwt.sign(
      {  _id : this._id,
        email:this.email,
        username:this.userName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    )
}
UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User" , UserSchema)