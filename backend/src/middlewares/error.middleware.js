import { ApiError } from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {

    console.log('Error caught by middleware', err);

    const statudCode = err instanceof ApiError ? err.statusCode : 500
    const message = err instanceof ApiError ? err.message : 'Internaral server error'

    // send json response

    res
        .status(statudCode)
        .json({
            success: false,
            message: message,
            errors: err.errors || null,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        })
};

export default errorMiddleware;
