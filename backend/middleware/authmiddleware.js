const jwt = require('jsonwebtoken');
const User = require('../models/users');

// creating a middleware function called protect to authorize the user 

const protect = async function (req,res,next) {
    
    // checking if the recived request has a token in the headers
    if(req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try{
            // extracting and verifying the token

            // get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // finding the user in database by extracted userid from token and returning the data excluding the password
            req.user = await User.findById(decoded.id).select("-password");

            if(!req.user){
                return res.status(401).json({
                    message : "user not found"
                })
            }
            
            next();
        } catch (error){
            console.error("auth error:", error.message);
            res.status(401).json({                              // if token is missing or invalid
                message : "not authorzed, token failed"
            })
        }
    } 
    else{
        res.status(401).json({
            message : "not authorized, no token"                 // if token is missing or invalid
        })
    }
};

module.exports = {protect};