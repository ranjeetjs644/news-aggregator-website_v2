import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import errorMiddleware from './src/middlewares/error.middleware.js'
const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        Credential: true
    }
))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())



// import routes

import authRouter from './src/routes/auth.routes.js'
app.use('/api/v1/auth', authRouter);



app.use(errorMiddleware)

export default app;