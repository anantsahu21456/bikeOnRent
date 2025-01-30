import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteBikeDetails, getAllBikes, registerBike, updateBikeDetails, updateBikeImage,getBikeById ,getBikeBasedOnSearch} from '../controllers/bike.controller.js'
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

// router.use(verifyJWT)

router.route('/register').post(verifyJWT, upload.single('bikeImage') , registerBike)
router.route('/update-bike-details/:bikeId').patch(verifyJWT, updateBikeDetails)
router.route('/update-bike-image').patch(verifyJWT, upload.single('bikeImage'), updateBikeImage)
router.route('/delete-bike/:bikeId').delete(verifyJWT, deleteBikeDetails)
router.route('/get-all-bike').get(getAllBikes)
router.route('/bike/:id').get(getBikeById);
router.route('/searched').get(getBikeBasedOnSearch)


export default router