import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    bikeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bike',
      required: true, 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
    },
    review: {
      type: String,
    },
    reviewBikeImageurl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model('Review', reviewSchema);
