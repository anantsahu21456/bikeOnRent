import asyncHandler from "../utils/asyncHandler.js";

import { Booking } from "../models/Booking.models.js";

//& Create a new booking
const createBooking = asyncHandler(async(req,res)=>{
    try {
        const { userId, bikeId, startDate, endDate, totalAmount, pickupLocation, dropOffLocation } = req.body;

        // Validate required data
        if (!userId || !bikeId || !startDate || !endDate || !pickupLocation || !dropOffLocation) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if the bike is already booked for the selected dates
        const overlappingBooking = await Booking.findOne({
            bikeId,
            status: "booked",
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
            ]
        });

        if (overlappingBooking) {
            return res.status(400).json({ message: "Bike is not available for the selected dates." });
        }

        // Create the booking
        const booking = new Booking({
            userId,
            bikeId,
            startDate,
            endDate,
            totalAmount,
            pickupLocation,
            dropOffLocation,
            status: "booked"
        });

        await booking.save();
        res.status(201).json({ message: "Booking created successfully.", booking });
    } catch (error) {
        res.status(500).json({ message: "Error creating booking.", error: error.message });
    }

})


//& Get all bookings
const getAllBookings = asyncHandler(async(req,res)=>{
    try {
        const bookings = await Booking.find()
            .populate("userId", "name email")
            .populate("bikeId", "model brand");

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings.", error: error.message });
    }

})

//& Get a single booking by ID
const getBookingById = asyncHandler(async(req,res)=>{
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id)
            .populate("userId", "name email")
            .populate("bikeId", "model brand");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Error fetching booking.", error: error.message });
    }

})


//& Update booking status
const updateBookingStatus = asyncHandler(async(req,res)=>{
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["booked", "cancelled", "completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status." });
        }

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        res.status(200).json({ message: "Booking status updated successfully.", booking });
    } catch (error) {
        res.status(500).json({ message: "Error updating booking status.", error: error.message });
    }

})

//& Delete a booking
const deleteBooking = asyncHandler(async(req,res)=>{
    try {
        const { id } = req.params;

        const booking = await Booking.findByIdAndDelete(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        res.status(200).json({ message: "Booking deleted successfully.", booking });
    } catch (error) {
        res.status(500).json({ message: "Error deleting booking.", error: error.message });
    }

})


//& Get bookings by user
const getBookingsByUser = asyncHandler(async(req,res)=>{
    try {
        const { userId } = req.params;

        const bookings = await Booking.find({ userId })
            .populate("bikeId", "model brand");

        if (!bookings.length) {
            return res.status(404).json({ message: "No bookings found for this user." });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user bookings.", error: error.message });
    }

})

export {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    deleteBooking,
    getBookingsByUser
}
