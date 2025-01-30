import asyncHandler from "../utils/asyncHandler.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Bike } from "../models/Bike.models.js";
import moment from 'moment';

// import mongoose from "mongoose";

const registerBike = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(401)
        .json({message:"user not authenticated"})
        
    }
  const {
    bikeName,
    fuelType,
    mileage,
    rentPerDay,
    bikeModel,
    bikeColor,
    bikeLocation,
    bikeNumber,
    bikeDescription,
  } = req.body;
  console.log("Request body:", req.body);


  //& Validate required fields
  if (
    [
      bikeName,
      fuelType,
      mileage,
      rentPerDay,
      bikeModel,
      bikeColor,
      bikeLocation,
      bikeNumber,
      bikeDescription,
    ].some((field) => !field.trim())
    // ].some((field) => !field || field.trim() === "")
  ) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  //& Check if bikeNumber is unique
  const existingBike = await Bike.findOne({ bikeNumber });
  if (existingBike) {
    return res.status(400).json({ message: "Bike number already exists" });
  }

  //& upload bike image in local file path
  const bikeImagelocalFilePath = req.file?.path;
  if (!bikeImagelocalFilePath) {
    return res.status(400).json({ message: "Please upload a bike image" });
  }

  //& Upload image to Cloudinary
  const bikeImageOnCloudinary = await uploadOnCloudinary(bikeImagelocalFilePath);
  if (!bikeImageOnCloudinary) {
    return res.status(400).json({ message: "Error uploading bike image to Cloudinary" });
  }

  const bikeImageUrl = bikeImageOnCloudinary.secure_url;

  //& Save bike data to the database
  const bikeData = await Bike.create({
    bikeName,
    fuelType,
    mileage,
    rentPerDay,
    bikeModel,
    bikeColor,
    bikeLocation,
    bikeNumber,
    bikeDescription,
    bikeImage: bikeImageUrl,
    ownerId: req.user._id
  });

  //& Retrieve the saved bike with lean to avoid circular references
  const uploadedBike = await Bike.findById(bikeData._id)
  if (!uploadedBike) {
    return res.status(400).json({ message: "Error retrieving uploaded bike details" });
  }

  //& Send success response
  return res.status(201).json({
    message: "Bike registered successfully 🚲",
    uploadedBike,
  });
});

const updateBikeDetails = asyncHandler(async(req,res)=>{
 const {bikeName, bikeDescription, fuleType,mileage,rentPerDay,bikeModel,bikeColor,bikeLocation,bikeNumber} =  req.body
     
 //& Extract bikeId from URL params
 const { bikeId } = req.params;

 //& Validate bikeId
 if (!bikeId) {
   return res.status(400).json({ message: "Bike ID is required" });
 }

     if (!bikeName && !bikeDescription && !fuleType && !mileage && !rentPerDay && !bikeModel && !bikeColor && !bikeLocation && !bikeNumber ) {
        return res.status(400).json({ message: "Please fill in all fields" });
     }

     const bikeData = {}
     if (bikeName) bikeData.bikeName = bikeName
     if (bikeDescription) bikeData.bikeDescription = bikeDescription
     if (fuleType) bikeData.fuleType = fuleType
     if (mileage) bikeData.mileage = mileage
     if (rentPerDay) bikeData.rentPerDay = rentPerDay
     if (bikeModel) bikeData.bikeModel = bikeModel
     if (bikeColor) bikeData.bikeColor = bikeColor
     if (bikeLocation) bikeData.bikeLocation = bikeLocation
     if (bikeNumber) bikeData.bikeNumber = bikeNumber
 
     const updatedBikeData = await Bike.findByIdAndUpdate(bikeId,bikeData,{
        new: true,
     })
     if (!updateBikeDetails) {
        return res.status(400).json({ message: "Error updating bike details or bike not found" });
     }
     //& Send success response
     return res
     .status(200)
     .json(200,{
        message: "Bike details updated successfully",
        updatedBikeData,
        });


})

const updateBikeImage = asyncHandler(async(req,res)=>{
    const bikeImagelocalFilePath = req.file?.path;
    if (!bikeImagelocalFilePath) {
        return res.status(400).json({ message: "No bike image uploaded" });
    }
   const bikeImage = await uploadOnCloudinary(bikeImagelocalFilePath)

   if (!bikeImage.url) {
    return res.status(400).json({ message: "Error uploading bike image" });
   }
   const { bikeId } = req.params;
   const bikeData = {}
   bikeData.bikeImage = bikeImage
   const updatedBikeData = await Bike.findByIdAndUpdate(bikeId, 
    { 
      $set: {
         bikeImage: bikeImage.url 
     }
    },
    { new: true }
     )

    if (!updateBikeDetails) {
        return res
        .status(400)
        .json({
            message: "Error updating bike image or bike not found",
        })
    }
    //& Send success response
    return res
    .status(200)
    .json(200,{
        message: "Bike image updated successfully",
        updatedBikeData,
        });

})

const deleteBikeDetails = asyncHandler(async(req,res)=>{
    const {bikeId} = req.params
   
    console.log(bikeId)
    if (!bikeId) {
        return res.status(400).json({ message: "Bike ID is required" });
    }
    const bikeData = await Bike.findByIdAndDelete(bikeId)
    console.log(bikeData)
    if (!bikeData) {
        return res.status(400).json({ message: "Bike not found" });
        }
        return res
        .status(200)
        .json({ message: "Bike deleted successfully" });


})

const getAllBikes = asyncHandler(async(req,res)=>{
    const { page = 1, limit = 12 } = req.query
    const skip = (page - 1) * limit

    const bikes = await Bike.find().skip(skip).limit(limit)
    if (!bikes) {
        return res.status(400).json({ message: "No bikes found" });
        }

        //& get the total count of bike 
        const totalBikes = await Bike.countDocuments()

        //& calculate total page
        const totalPages = Math.ceil(totalBikes / limit)
        return res
        .status(200)
        .json({ bikes, totalPages, totalBikes });

})
const getBikeById = asyncHandler(async(req,res)=>{
  const { id } = req.params;
  try {
      const bike = await Bike.findById(id);
      if (!bike) {
          return res.status(404).json({ message: 'Bike not found' });
      }
      res.status(200).json(bike);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
})

const getBikeBasedOnSearch = asyncHandler(async (req, res) => {
  try {
    const { bikeLocation, startDate, endDate, page = 1, limit = 10 } = req.query;

    // Parse startDate and endDate to Date objects
    const start = moment(startDate, 'MM/DD/YYYY').startOf('day').toDate();
    const end = moment(endDate, 'MM/DD/YYYY').endOf('day').toDate();

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Pagination setup
    const skip = (pageNumber - 1) * limitNumber;

    // If bikeLocation is provided, perform a text search for location
    const locationQuery = bikeLocation ? { $text: { $search: bikeLocation } } : {};

    // Find available bikes based on location and availability
    const availableBikes = await Bike.find({
      ...locationQuery, // Use text search for partial match
      isAvailable: true,
      // Additional check for the availability period (if dates are provided)
      $or: [
        { rentPerDay: { $gte: 0 } }, // For bikes without bookings, always available
        {
          rentPerDay: { $gte: 0 },
          $nor: [
            {
              $and: [
                { startDate: { $lte: end } },
                { endDate: { $gte: start } },
              ],
            },
          ],
        },
      ],
    })
      .skip(skip)
      .limit(limitNumber)
      .exec();

    // Find unavailable bikes with notes on availability after certain dates
    const unavailableBikes = await Bike.aggregate([
      {
        $match: {
          ...locationQuery, // Use text search for partial match
          isAvailable: false,
        },
      },
      {
        $lookup: {
          from: 'bookings', // Join with the 'bookings' collection
          localField: '_id',
          foreignField: 'bikeId',
          as: 'bookings',
        },
      },
      {
        $unwind: {
          path: '$bookings',
          preserveNullAndEmptyArrays: true, // If no booking exists, keep the bike
        },
      },
      {
        $addFields: {
          nextAvailableDate: {
            $cond: {
              if: { $eq: ['$bookings', null] },
              then: moment().format('MM/DD/YYYY'), // If no booking, consider now as the available date
              else: { $dateToString: { format: '%m/%d/%Y', date: '$bookings.endDate' } },
            },
          },
        },
      },
      {
        $project: {
          bikeName: 1,
          bikeLocation: 1,
          isAvailable: 1,
          nextAvailableDate: 1,
        },
      },
    ])
      .skip(skip)
      .limit(limitNumber);

    res.status(200).json({
      success: true,
      availableBikes,
      unavailableBikes,
      totalDocs: availableBikes.length + unavailableBikes.length,
      totalPages: Math.ceil((availableBikes.length + unavailableBikes.length) / limitNumber),
      currentPage: pageNumber,
      hasNextPage: (availableBikes.length + unavailableBikes.length) > pageNumber * limitNumber,
      hasPrevPage: pageNumber > 1,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});




export { registerBike,
    updateBikeDetails,
    updateBikeImage,
    deleteBikeDetails,
    getAllBikes,
    getBikeById,
    getBikeBasedOnSearch

 };
