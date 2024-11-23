import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
     fullname: {
          type: String,
          required: true,
          index: true,
          trim: true
     },
     email: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          lowercase: true
     },
     password: {
          type: String,
          required: [true, 'password is required'],
          unique: true,
          trim: true
     },
     refreshToken: {
          type: String,
          // required: true
     },
     avatar: {
          type: String,
          required: true
     },
     preferences: {
          categories: [String], // E.g., ['technology', 'sports']
          sources: [String],    // E.g., ['BBC', 'CNN']
     },
     bookmarks: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Bookmark', // Reference to Bookmark schema
     }],
}, { timestamps: true });


userSchema.pre('save', async function (next) {
     if (!this.isModified('password')) return next();
     this.password = await bcrypt.hash(this.password, 10);
     next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
     return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
     // const payload = {
     //      _id: this._id,
     //      fullname: this.fullname,
     //      email: this.email,
     // }
     // const secretKey = process.env.ACCESS_TOKEN_SECRET
     // options = {
     //      expiresIn: "1h"
     // }

     // const Token = jwt.sign(payload, secretKey, options)
     // return Token;

     // -> also we can do this method
     return jwt.sign(
          {
               _id: this._id,
               fullname: this.fullname,
               email: this.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
               expiresIn: process.env.ACCESS_TOKEN_EXPIRY
          }
     )
}

userSchema.methods.generateRefreshToken = function () {
     return jwt.sign(
          {
               _id: this._id 
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
               expiresIn:process.env.REFRESH_TOKEN_EXPIRY
          }
     )
}

export const User = mongoose.model("User", userSchema);

