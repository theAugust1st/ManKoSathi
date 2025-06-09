const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const asyncHandler = require('../utils/asyncHandler.js');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Check for token in Authorization header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Get token from header (e.g., "Bearer eyJhbGci...")
            token = req.headers.authorization.split(' ')[1]; // Get the part after "Bearer "

            // 3. Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Get user from the token's payload (ID) and attach to request object
            //    We select '-password' to exclude the hashed password from the user object
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                // If user not found (e.g., deleted after token was issued)
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            next(); // Token is valid, user is found, proceed to the protected route
        } catch (error) {
            console.error('Token verification failed:', error.message);
            res.status(401); // Unauthorized
            // Pass a more specific error to the error handler
            // If jwt.verify fails due to expiration or invalid signature, it throws an error.
            // We want our central errorHandler to handle the response.
            if (error.name === 'JsonWebTokenError') {
                throw new Error('Not authorized, token failed (invalid signature)');
            } else if (error.name === 'TokenExpiredError') {
                throw new Error('Not authorized, token expired');
            } else {
                throw new Error('Not authorized, token failed');
            }
        }
    }

    // 5. If no token is found in the header
    if (!token) {
        res.status(401); // Unauthorized
        throw new Error('Not authorized, no token'); // This will be caught by asyncHandler
    }
});

module.exports = { protect };