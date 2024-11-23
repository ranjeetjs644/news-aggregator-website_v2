import { Router } from "express";
import { registerUser } from '../controllers/auth.controllers.js'
import { upload } from '../middlewares/multer.middleware.js'


const router = Router();

router.route('/register').post(
    upload.single('avatar'),
    registerUser
)


export default router