// const mongoose =  require(mongoose)
import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
    userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    bikeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Bike'
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum: ['booked', 'cancelled', 'completed'],
        default: 'cancelled'
    },
    pickupLocation:{
        type:String,
        required:true
    },
    dropOffLocation:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Booking  = mongoose.model("Booking",BookingSchema)