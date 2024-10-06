const jwt = require('jsonwebtoken')

module.exports = function(req,res, next) {
    //get token from header 
    const token = req.header('Authorization')

    //check if token exist
    if (!token) {
        return res.status(401).json({ msg: 'No Token, denied access'})
    }

    //check token
    try {
        // Remove 'Bearer' from the token string if present
        const formattedToken = token.split(' ')[1];
    
        const decoded = jwt.verify(formattedToken, process.env.JWT_SECRET)
        //decode JWT from secret (env file) 
        //set userid (from request) to decoded token
        req.user = decoded.id
        next()
    } catch (err) {
        res.status(401).json({msg: 'invalid token - jwt.js'})
        console.log(token)
    }
}