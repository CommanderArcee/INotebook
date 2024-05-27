// Here we create middleware which is a function.

// In this we get the id/or that data which we send in token at time of login. By that token we get the that data and with that data we get the details from db.
const jwt = require('jsonwebtoken');
require("dotenv").config();

const LoggedInUserDetails = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send("Invalid Authentication");
    }
    try {
        console.log(process.env.JWT_SECRET);
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).send("Invalid Authentication");
    }
}

module.exports = LoggedInUserDetails;