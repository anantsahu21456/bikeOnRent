// import express from 'express';
// import { createPaymentOrder, verifyPayment, getAllPayments, getPaymentById } from '../controllers/payment.controller.js';
// import { verifyJWT } from '../middlewares/auth.middleware.js'; // Assuming you have an authMiddleware to protect routes

// const router = express.Router();

// //& Route to create a payment order
// router.post('/create-order', verifyJWT, createPaymentOrder);

// //& Route to verify payment
// router.post('/verify-payment', verifyJWT, verifyPayment);

// //& Route to get all payments (with pagination)
// router.get('/', verifyJWT, getAllPayments);

// //& Route to get a specific payment by ID
// router.get('/:paymentId', verifyJWT, getPaymentById);

// export default router;
