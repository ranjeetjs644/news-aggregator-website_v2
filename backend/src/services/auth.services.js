import crypto from 'crypto'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

function generateOtp() {
    return crypto.randomInt(100000, 999999).toString()
}

async function hashOtp(otp) {
    return await bcrypt.hash(otp, 10)
}

async function verifyOtp(userOtp, dbOtp) {
    return await bcrypt.compare(userOtp, dbOtp)
}

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        // user: process.env.EMAIL_USER,
        user: "ranjeetjs644@gmail.com",
        // pass: process.env.EMAIL_PASSWORD
        pass: "ncsyoibnywnmhdji"
    },
    tls: {
        rejectUnauthorized: false, // This is important for Gmail
    },
})

async function sendOtp(email, otp) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
    }
    return await transporter.sendMail(mailOptions)
}


export { generateOtp, hashOtp, verifyOtp, transporter, sendOtp }