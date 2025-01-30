import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.models.js";

//& Admin login
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if admin exists
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.status(200).json({ message: "Admin logged in successfully", token });
});

//& Get admin profile
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user.id);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }
  return res.status(200).json(admin);
});

//& Update admin details
const updateAdminDetails = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  // Find and update admin
  const updatedAdmin = await Admin.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true }
  );

  if (!updatedAdmin) {
    return res.status(400).json({ message: "Error updating admin details" });
  }

  return res.status(200).json({
    message: "Admin details updated successfully",
    updatedAdmin,
  });
});

//& Change admin password
const changeAdminPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.user.id);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  // Check if current password is correct
  const isMatch = await bcrypt.compare(currentPassword, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid current password" });
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update password
  admin.password = hashedPassword;
  await admin.save();

  return res.status(200).json({ message: "Password changed successfully" });
});

export { 
    adminLogin, 
    getAdminProfile, 
    updateAdminDetails, 
    changeAdminPassword 
  };
