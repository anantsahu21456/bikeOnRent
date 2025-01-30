import { Router } from "express";
import  { registerUser,logOutUser, loginUser,refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar ,sendPasswordResetEmail,resetPassword } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/register').post(
    // upload.fields(                     //& this is a middleware and use to upload the file in cloudinary
    //     [
    //         {
    //             name:"avatar",
    //             maxCount:1,
    //         },
    //     ]
    // ),
    upload.single('avatar'),
    registerUser)
router.route("/login").post(loginUser)
// router.post('/register', upload.single('avatar'), registerUser);



//^ secured routes
router.route("/logout").post(verifyJWT ,logOutUser)
router.route('/forgot-password').post(sendPasswordResetEmail);
router.route('/reset-password').post(resetPassword);
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/updates-account").patch(verifyJWT,updateAccountDetails)
router.route("/update-user-avator").patch(verifyJWT, upload.single("avatar"),updateUserAvatar)

export default router