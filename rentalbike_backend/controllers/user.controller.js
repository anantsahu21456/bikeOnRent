import asyncHandler from '../utils/asyncHandler.js'
import {User} from '../models/User.models.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js' 
import jwt from 'jsonwebtoken'
// import { json } from 'express'
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt'


const generateAccessTokenAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        console.log(user)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        console.log(accessToken)
        console.log(refreshToken)
        user.refreshToken = refreshToken
         await user.save({validateBeforeSave : false })   //& we are storing the refreshToken in database without checking validation
        return {accessToken, refreshToken};
    } catch (error) {
        throw error 
        
    }
}

const registerUser = asyncHandler(async(req,res)=>
{
    // res.status(200).json({
    //     message:"hy mone bhaiya"})

    const {userName,firstName,lastName,email,phoneNumber,password} = req.body
    console.log("Request body:", req.body);
    // console.log("userName",userName)
    // console.log("firstName",firstName)
    // console.log("lastName",lastName)
    // console.log("email",email)
    // console.log("phoneNumber",phoneNumber)
    // console.log("password",password)

    //&  here we are check some validation like all the fields should be fill
    if (
        [userName, firstName, lastName, email, phoneNumber, password].some((fields)=>
        
            fields?.trim() === ""
        )
    ) {
        return res.status(400).json({ message: "Please fill in all fields" });  
    }

    // & from here we are write a quiry for registerd user by username and by email
    const existedUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (existedUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // & upload images in local server
    // const avatarlocalpath = req.files?.avatar[0]?.path;
    const avatarlocalpath = req.file?.path; // For single file
    console.log("Local file path:", avatarlocalpath);



    if (!avatarlocalpath) {
        return res.status(400).json({ message: "Please upload an avatar" });
        
    }

    //& upload image on cloudinary
   const avatarOnCloudinary = await uploadOnCloudinary(avatarlocalpath)

   if (!avatarOnCloudinary) {
    return res.status(400).json({ message: "Failed to upload avatar" });
    
   }
   const avatarUrl = avatarOnCloudinary.secure_url;

    // & cteated a database
    const userdata = await User.create({
        userName,
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        avatar: avatarUrl, // Save the URL, not the entire object
    });

    // & if user created successfully then send a response
    const createdUser = await User.findById(userdata._id).select("-password -refreshToken");
    if (!createdUser) {
        return res.status(400).json({ message: "Failed to create user" });
    }
     
    return res.status(200).json({ createdUser , message:"user registerd sucessfully"})
    


})

const loginUser = asyncHandler(async (req, res) => {
    const { email, userName, password } = req.body; // Take input from user
  
    // console.log(userName);
  
    if (!(userName || email)) {
      return res.status(400).json({ message: 'Please enter either username or email' });
    }
  
    const user = await User.findOne({
      $or: [{ email }, { userName }], // Find user by email or username
    });
  
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or username' });
    }
  
    // Validate the password
    const isValidPassword = await user.matchPassword(password); // Check password validity
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }
  
    // Generate access token and refresh token
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
  
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');
  
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only enable secure cookies in production
    };
  
    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json({
        loggedInUser,
        accessToken,
        refreshToken,
        message: 'User logged in successfully',
      });
  });
  

const logOutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 },
        },{
            new:true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
     }
     return res
     .status(200)
     .clearCookie("accessToken", options)
     .clearCookie("refreshToken", options)
     .json(200,{message:"user logged out sucessfully"})

})

const refreshAccessToken = asyncHandler(async(req,res)=>
{
    const inCommingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken
    console.log("Cookies:", req.cookies);
    console.log("hy")
    console.log("Body:", req.body);
    console.log("by")
    console.log("Incoming Refresh Token:", inCommingRefreshToken);

    if (!inCommingRefreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
        }

       try {
         const decodedToken = jwt.verify(inCommingRefreshToken ,
             process.env.REFRESH_TOKEN_SECRET
         )
         const user = await User.findById(decodedToken?._id)
         if (!user) {
             return res.status(401).json({ message: "Invalid refresh token" });
             }
 
     if (inCommingRefreshToken !== user?.refreshToken) {
         return res.status(401).json({ message: "refresh token is expired or used" });    
     }
      
     const options = {
            httpOnly:true,
            secure:true
     }
     const {accessToken,newRefreshToken} = await generateAccessTokenAndRefreshToken(user._id)
     return res
     .status(200)
     .cookie("accessToken",accessToken, options)
     .cookie("refreshToken", newRefreshToken, options)
     .json(200,{ accessToken,newRefreshToken,message:"access token generated sucessfully"})
     
       } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
        
       }
})

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} = req.body
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordcorrect(oldPassword)

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid old password" });
    }
    user.password = newPassword
    await user.save({validateBeforeSave:false})
    return res.status(200)
    .json({ message: "Password changed successfully" });
            
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json( 200, req.user, 
    "Current user fetched successfully", 

    );
});


const updateAccountDetails = asyncHandler(async (req, res) => {
    const { useraName, email, phoneNumber } = req.body;

    // Only update fields that are provided in the request body
    if (!useraName && !email && !phoneNumber) {
        return res.status(400).json({ message: "Please provide at least one field to update" });
    }

    const updateData = {};

    if (useraName) updateData.useraName = useraName;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    const user = await User.findByIdAndUpdate(req.user?._id, { $set: updateData }, { new: true })
        .select("-password");

    return res.status(200).json({
        message: "Account details updated successfully",
        user
    });
});


const updateUserAvatar = asyncHandler(async(req, res) => {
    const avatartLocalPath = req.file?.path;
    if (!avatartLocalPath) {
        return res.status(400).json({ message: "Avatar file is missing" });
    }

    const avatar = await uploadOnCloudinary(avatartLocalPath);
    if (!avatar.url) {
        return res.status(400).json({ message: "Failed to upload avatar" });
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res.status(200).json({ message: "Avatar updated successfully", user });
});

// Send password reset email with reset link
const sendPasswordResetEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'No user found with that email' });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send reset link via email
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `You can reset your password by clicking the link below:\n\n${resetUrl}`,
    });

    res.status(200).json({ message: 'Password reset link sent to your email' });
});

// Reset password using the token
// Reset Password Controller
const resetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(400).json({ message: 'Invalid token' });
      }
  
      // Hash and save the new password
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
  
      // Invalidate all tokens after resetting password
      await user.updateOne({ $unset: { refreshToken: "" } });  // Clear refresh token from user model (optional, but effective)
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Invalid or expired token' });
    }
  });
  


export { registerUser,
        loginUser,
        logOutUser,
        refreshAccessToken,
        changeCurrentPassword,
        getCurrentUser,
        updateAccountDetails,
        updateUserAvatar, //& every thing is perfect working 
        sendPasswordResetEmail,
        resetPassword
}