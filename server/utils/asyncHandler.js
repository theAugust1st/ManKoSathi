function asyncHandler(asyncRequest){
    return (req,res,next) =>{
        Promise.resolve(asyncRequest(req,res,next)).catch(next)
    }
}

module.exports = asyncHandler