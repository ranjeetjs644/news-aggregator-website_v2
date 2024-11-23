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


const generateAccessAndRefreshToken = async (userid) => {
     try {
          const user = await User.findById(userid)
          const accessToken = user.generateAccessToken()
          const refreshToken = user.generateRefreshToken()
          console.log("accesssToken_InFunction", accessToken)
          console.log("refresToken_InFunction", refreshToken)
          user.refreshToken = refreshToken;
          user.save({ validateBeforeSave: false })
          return { accessToken, refreshToken };
     } catch (error) {
          throw new ApiError(
               500,
               "Something went wrong while generating and refresh and acsess Token "
          );
     }
}



const loginUser = asyncHandler(async (req, res) => {

     const { email, password } = req.body;
     if (!email || !password) {
          throw new ApiError(400, "Email and password both are required");
     }

     // now find the user
     const user = await User.findOne({ email });
     if (!user) {
          throw new ApiError(404, 'User does not exist')
     }

     // now check is password is valid or not 
     const isPasswordValid = await user.isPasswordCorrect(password)

     if (!isPasswordValid) {
          throw new ApiError(401, "Invalid password")
     }

     // now generate accessa and refreshToken
     const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

     const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

     const options = {
          httpOnly: true,
          // secure: process.env.NODE_ENV === 'production'
     }
     console.log("accesssToken", accessToken)
     console.log("refresToken", refreshToken)
     return res
          .status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json(
               new ApiResponse(
                    200,
                    {
                         user: loggedInUser, accessToken, refreshToken
                    },
                    "User loggedIn successfully"
               )
          )


})


const logoutUser = asyncHandler(async (req, res) => {

     await User.findByIdAndUpdate(
          req.user._id,
          {
               $set: { refreshToken: undefined },
               new: true
          }
     )

     const options = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production'

     }
     return res
          .status(200)
          .clearCookie("accessToken", options)
          .clearCookie("refreshToken", options)
          .json(new ApiResponse(200, {}, "User logged out successfully"))
})

export { registerUser, loginUser, logoutUser }