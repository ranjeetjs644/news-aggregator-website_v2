import mongoose from "mongoose";
import { DB_NAME } from '../utils/constant.js'


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect((`${process.env.DB_URI}/${DB_NAME}`))
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log('Database connection FAILED', error)
        process.exit(1)
    }
}

export default connectDB;
