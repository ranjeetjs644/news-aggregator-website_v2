const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }


// export { asyncHandler };

// const asyncHandler = (fn) => { () => { } } same thing as below
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500)
//             .json({
//                 success: false,
//                 message: err.message
//             })
//     }
// }