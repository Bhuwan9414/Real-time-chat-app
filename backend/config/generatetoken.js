const jwt = require('jsonwebtoken');

// fucntion to generate a jwt token 
// below function takes the userid as an input to generate the token
function generatetoken(id) {

    // returns a jwt token using the jwt_secret and userid

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = generatetoken;