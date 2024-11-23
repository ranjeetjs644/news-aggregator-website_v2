import { Router } from "express";
import { registerUser, loginUser, logoutUser } from '../controllers/auth.controllers.js'
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

export default router