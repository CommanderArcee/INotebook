// Here we create middleware which is a function.

// In this we get the id/or that data which we send in token at time of login. By that token we get the that data and with that data we get the details from db.
/*
In this I have learnt how to use jwt and why we use verify/check the authentication code with jwtSecret which we define inside the env file and how to get authentication 
code from header of req. Because we get the details of logged in user by that data so we decode the token with the help of verify using the jwtsecret key.
*/
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

const LoggedInUserDetails = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send("Invalid Authentication");
    }
    try {
        const data = jwt.verify(token, config.development.JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).send("Invalid Authentication");
    }
}

module.exports = LoggedInUserDetails;