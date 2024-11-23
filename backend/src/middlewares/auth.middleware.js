import { asyncHandler } from "../utils/asyncHandler.js";
import { configDotenv } from 'dotenv'
import jwt from 'jsonwebtoken'
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.models.js";
configDotenv()


export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // get token from cookies or authorization heafer
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', "")
        if (!token) {
            throw new ApiError(401, 'Unauthorized request')
        }
        // now decode the token 

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) {
            throw new ApiError(401, 'Invalid accessToken')
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid accessToken")
    }
})