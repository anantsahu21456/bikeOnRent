import mongoose from 'mongoose'
import mongooseaggregationpagination from 'mongoose-aggregate-paginate-v2'

const BikeSchema = new mongoose.Schema({
    bikeImage:{
        type:String, //cloudinary url
        required:true
    },
    bikeName:{
        type:String,
        required:true
    },
    fuelType:{
        type:String,
        required:true,
        enum:["petrol","electric"]
    },
    mileage:{
        type:Number,
        required:true
    },
    rentPerDay:{
        type:Number,
        required:true
    },
    bikeModel:{
        type:String,
        required:true
    },
    bikeColor:{
        type:String,
        required:true
    },
    bikeLocation:{
        type:String,
        required:true,
        index:true,
    },
    bikeNumber: {
        type: String, 
        required: true, 
        unique: true, //& Ensures no duplicate bike numbers
    },
    bikeDescription:{
        type:String,
        required:true,
    },
    isAvailable:{
        type:Boolean,
        default:true,
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
    


},{timestamps:true})


BikeSchema.index({ bikeLocation: 'text' });

BikeSchema.plugin(mongooseaggregationpagination)

export const Bike = mongoose.model("Bike" , BikeSchema)