import { Router } from "express";
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { addReview, deleteReview, getBikeReviews, updateReview, } from "../controllers/review.controller.js";
import {upload} from '../middlewares/multer.middleware.js'


const router = Router()
// router.use(verifyJWT)

router.route('/:id').get(getBikeReviews).post(upload.single("reviewBikeImage"),verifyJWT,addReview)
router.route('/c/:commentId').patch(verifyJWT,updateReview).delete(verifyJWT,deleteReview)

export default router