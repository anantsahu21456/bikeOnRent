import mongoose, { Types } from 'mongoose'

const paymentSchema = new mongoose.Schema({
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Booking',
    },
    amount:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        enum:['credit','debit',"upi","cash"],
        required:true
    },
    paymentStatus:{
        type:String,
        enum:["success","pending","failed"],
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }


},{timestamps:true})

export const Payment = mongoose.model("Payment",paymentSchema)