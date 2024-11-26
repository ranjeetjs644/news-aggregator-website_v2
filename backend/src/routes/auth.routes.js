import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, requestReset, verifyOtpAndResetPassword } from '../controllers/auth.controllers.js'
import { upload } from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route('/register').post(
    upload.single('avatar'),
    registerUser
)

router.route('/login').post(loginUser)

// secured routes
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/refresh-token').post(refreshAccessToken)

router.route('/request-reset').post(requestReset)
router.route('/verify-reset-otp').post(verifyOtpAndResetPassword)


export default router