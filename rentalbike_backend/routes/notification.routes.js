// import express from 'express';
// import { createNotification, getNotifications, markAsRead, deleteNotification 
// } from '../controllers/notification.controller.js'; // Adjust the path as necessary
// import { verifyJWT } from '../middlewares/auth.middleware.js'; // Authentication middleware (optional)

// const router = express.Router();

// //& Create a new notification (Protected route, only authorized users can create notifications)
// router.post('/', verifyJWT, createNotification);

// //& Get all notifications for a user
// router.get('/:userId', verifyJWT, getNotifications); // You can use auth to ensure the user is only accessing their own notifications

// //& Mark a notification as read
// router.put('/read/:notificationId', verifyJWT, markAsRead);

// //& Delete a notification
// router.delete('/:notificationId', verifyJWT, deleteNotification);

// export default router;
