// // import asyncHandler from "../utils/asyncHandler";
// import Razorpay from "razorpay";
// import asyncHandler from "../utils/asyncHandler.js";
// import { Payment } from "../models/payment.model.js";
// import { Booking } from "../models/Booking.models.js";

// //& Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// //& Create a payment order
// const createPaymentOrder = asyncHandler(async (req, res) => {
//   const { amount, bookingId, paymentMethod } = req.body;

//   if (!amount || !bookingId || !paymentMethod) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Check if the booking exists
//   const booking = await Booking.findById(bookingId);
//   if (!booking) {
//     return res.status(404).json({ message: "Booking not found" });
//   }

//   // Create Razorpay order
//   const options = {
//     amount: amount * 100, // Convert to paisa
//     currency: "INR",
//     receipt: `receipt_${bookingId}`,
//   };

//   const order = await razorpay.orders.create(options);

//   if (!order) {
//     return res.status(500).json({ message: "Unable to create Razorpay order" });
//   }

//   res.status(201).json({
//     message: "Payment order created successfully",
//     orderId: order.id,
//     amount: order.amount,
//     currency: order.currency,
//     receipt: order.receipt,
//   });
// });

// //& Verify payment and update payment status
// const verifyPayment = asyncHandler(async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId, amount, paymentMethod } = req.body;

//   if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId || !amount || !paymentMethod) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Verify signature
//   const crypto = await import("crypto");
//   const hmac = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//     .digest("hex");

//   if (hmac !== razorpay_signature) {
//     return res.status(400).json({ message: "Payment verification failed" });
//   }

//   // Save payment details to the database
//   const payment = await Payment.create({
//     bookingId,
//     amount,
//     paymentMethod,
//     paymentStatus: "success",
//     userId: req.user._id,
//   });

//   res.status(201).json({
//     message: "Payment successful",
//     payment,
//   });
// });

// //& Get all payments with pagination
// const getAllPayments = asyncHandler(async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;
//   const skip = (page - 1) * limit;

//   const payments = await Payment.find()
//     .populate("bookingId userId", "name email")
//     .skip(skip)
//     .limit(limit);

//   const totalPayments = await Payment.countDocuments();
//   const totalPages = Math.ceil(totalPayments / limit);

//   res.status(200).json({ payments, totalPayments, totalPages });
// });

// //& Get payment by ID
// const getPaymentById = asyncHandler(async (req, res) => {
//   const { paymentId } = req.params;

//   if (!paymentId) {
//     return res.status(400).json({ message: "Payment ID is required" });
//   }

//   const payment = await Payment.findById(paymentId).populate("bookingId userId", "name email");

//   if (!payment) {
//     return res.status(404).json({ message: "Payment not found" });
//   }

//   res.status(200).json({ payment });
// });

// export { 
//     createPaymentOrder, 
//     verifyPayment, 
//     getAllPayments,
//     getPaymentById };
