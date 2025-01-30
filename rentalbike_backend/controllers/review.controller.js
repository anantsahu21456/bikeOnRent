import asyncHandler from "../utils/asyncHandler.js";
import {Review} from '../models/review.models.js'
import mongoose from "mongoose";
import {uploadOnCloudinary} from '../utils/cloudinary.js' 


const getBikeReviews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;

  // Check if the bikeId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid bikeId" });
  }

  const skip = (page - 1) * limit;

  try {
    // Count the total number of reviews for the specific bike
    const totalReviews = await Review.countDocuments({ bikeId: new mongoose.Types.ObjectId(id) });

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalReviews / limit);

    // Fetch reviews, with pagination, and populate user details
    const bikeReviews = await Review.find({ bikeId: new mongoose.Types.ObjectId(id) })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("userId", "avatar firstName") // Populating userId with firstName and avatar
      .select("rating review reviewBikeImageurl userId"); // Select fields to return

    // Check if reviews exist for this bike
    if (!bikeReviews || bikeReviews.length === 0) {
      return res.status(404).json({ success: false, message: "No reviews found for this bike" });
    }

    // Return the response with reviews and pagination details
    res.status(200).json({
      success: true,
      totalReviews,
      currentPage: parseInt(page),
      totalPages,
      reviews: bikeReviews,
    });
  } catch (error) {
    console.error("Error:", error); // Log the error
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message || error,
    });
  }
});



  
const addReview = asyncHandler(async (req, res) => {
    const { id } = req.params; // Bike ID
    const { rating, review } = req.body;

    if (!rating || !review || !id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid rating, review, or bikeId.',
        });
    }

    const reviewBikeImage = req.file?.path;

    let reviewBikeImageurl = null;
    if (reviewBikeImage) {
        const reviewBikeImageOnCloudinary = await uploadOnCloudinary(reviewBikeImage);
        reviewBikeImageurl = reviewBikeImageOnCloudinary.secure_url;
    }

    try {
        // Save the review
        const newReview = new Review({
            bikeId: id,
            rating,
            review,
            reviewBikeImageurl,
            userId: req.user._id, // Store user ID
        });
        

        await newReview.save();

        // Populate user details dynamically for the response
        const populatedReview = await Review.findById(newReview._id).populate('userId', "avatar firstName");
        console.log(populatedReview)

        res.status(201).json({
            success: true,
            message: 'Review added successfully',
            newReview: populatedReview,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while adding review.',
            error: error.message,
        });
    }
});

const updateReview = asyncHandler(async(req,res)=>{
    const {reviewId} = req.params
    const {rating,review} = req.body
    try {
        const newReview = await Review.findByIdAndUpdate(reviewId,{rating,review},{new:true})
        if(!newReview){
            return res.status(404).json({success:false,message:"Review not found"})
            }
    } catch (error) {
        res.status(500).json({success:false,message:"Server error",error})
        
    }

})

const deleteReview = asyncHandler(async(req,res)=>{
    const {reviewId} = req.params
    try {
        const review = await Review.findByIdAndDelete(reviewId)
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found"})
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error })
    }

})



export {
    getBikeReviews,
    addReview,
    updateReview,
    deleteReview
}