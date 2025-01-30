// import asyncHandler from "../utils/asyncHandler.js";
// import { Notification } from "../models/notification.models.js";

// //& Create a new notification
// const createNotification = asyncHandler(async (req, res) => {
//     const { userId, message } = req.body;

//     if (!userId || !message) {
//         return res.status(400).json({ message: "User ID and message are required" });
//     }

//     const notification = await Notification.create({
//         userId,
//         message,
//     });

//     return res.status(201).json({
//         message: "Notification created successfully",
//         notification,
//     });
// });

// //& Get all notifications for a user
// const getNotifications = asyncHandler(async (req, res) => {
//     const { userId } = req.params;

//     if (!userId) {
//         return res.status(400).json({ message: "User ID is required" });
//     }

//     const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

//     if (!notifications.length) {
//         return res.status(404).json({ message: "No notifications found for this user" });
//     }

//     return res.status(200).json({ notifications });
// });

// //& Mark a notification as read
// const markAsRead = asyncHandler(async (req, res) => {
//     const { notificationId } = req.params;

//     if (!notificationId) {
//         return res.status(400).json({ message: "Notification ID is required" });
//     }

//     const notification = await Notification.findByIdAndUpdate(
//         notificationId,
//         { isRead: true },
//         { new: true }
//     );

//     if (!notification) {
//         return res.status(404).json({ message: "Notification not found" });
//     }

//     return res.status(200).json({
//         message: "Notification marked as read",
//         notification,
//     });
// });

// //& Delete a notification
// const deleteNotification = asyncHandler(async (req, res) => {
//     const { notificationId } = req.params;

//     if (!notificationId) {
//         return res.status(400).json({ message: "Notification ID is required" });
//     }

//     const notification = await Notification.findByIdAndDelete(notificationId);

//     if (!notification) {
//         return res.status(404).json({ message: "Notification not found" });
//     }

//     return res.status(200).json({ message: "Notification deleted successfully" });
// });

// export {
//     createNotification,
//     getNotifications,
//     markAsRead,
//     deleteNotification,
// };
