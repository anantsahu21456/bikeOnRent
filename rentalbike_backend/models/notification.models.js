import mongoose from 'mongoose'
import { User } from './User.models.js'

const notificationSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    message:{
        type:String
    },
    isRead:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

export const Notification = mongoose.model("Notification",notificationSchema)