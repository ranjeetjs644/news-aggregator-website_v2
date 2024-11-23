import { User } from '../models/users.models.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { uploadOnCloudinary } from '../services/cloudinary.services.js'
// import mongoose from 'mongoose'


// registration of user

const registerUser = asyncHandler(async (req, res) => {
     console.log(req.file)
     const { fullname, email, password } = req.body;

     if (!fullname || !email || !password) {
          throw new ApiError(400, "All fields are required");
     }

     // check id user exist
     const existedUser = await User.findOne({
          $or: [{ email }, { fullname }],
     })
     if (existedUser) {
          return res.
               status(409)
               .json({
                    success: false,
                    message: "User already registered"
               })
     }

     // avatar image handling

     const avatarLocalPath = req.file?.path;
     if (!avatarLocalPath) {
          return res
               .status(400)
               .json({
                    message: "Avatar is require"
               })
     }

     // uploading on coudinsary
     const cloudinaryUrl = await uploadOnCloudinary(avatarLocalPath)
     if (!cloudinaryUrl) {
          return res
               .status(400)
               .json({
                    message: "failed to upllad file on cloudinary"
               })
     }

     const user = await User.create({
          fullname,
          email,
          password,
          avatar: cloudinaryUrl.url
     })

     const createdUser = await User.findById(user._id).select(
          "-password -refreshToken"
     ).lean()
     if (!createdUser) {
          throw new ApiError(500, "Something went wrong while creating the user");
     }
     return res
          .status(201)
          .json(new ApiResponse(200, createdUser, "User created successfull"));
          
})


export { registerUser }