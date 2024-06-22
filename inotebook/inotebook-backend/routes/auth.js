const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const { handleEmail, handlePassword } = require("../validations/validation");
const { createUser, findByFilter, findById } = require("../Services/dbMethods");
const { createHashPassword, verifyPassword } = require("../utils/commonMethods");
const jwt = require('jsonwebtoken');
const config = require('../config/config.js')
const LoggedInUserDetails = require('../middleware/authLoggedInUser');
const { Users } = require("../dbConfig");


// Router 1 : Here we create new user. No login Required.
router.post('/api/auth/createUser', [handleEmail, handlePassword], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.send(error);
    }
    try {
        // In this we check that whether the email is already exist or not with the methods of model like below one findOne this method given model.
        let user = await findByFilter(req.body.email);
        if (user) {
            return res.send({ ErrorMsg : "Requested email already existing." });
        }

        /* By this method we create a new user with the help of sequelizer who have alot methods to insert data in the sql db. Those all methods declared in the Services.js(means  
        business logic file where we use all methods of sequelizer add code according our requirement so that our data inserted,udpated,deleted and retrived easily). */
        user = await createUser({
            Name: req.body.name,
            Email: req.body.email,
            Password: await createHashPassword(req.body.password),
            Date: Date.now()
        });

        const data = {
            UserId: user.userId
        }
        
        const authToken = jwt.sign(data, config.development.JWT_SECRET);

        res.send({authToken});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }

});

// Router 2 : Here, we logged in the user. so we create the JWT token.
router.post('/api/auth/login', [handleEmail, handlePassword], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.send(error);
    }

    try {
        
        let { email, password } = req.body;
        //vlaidate the user who exist or not.
        let existingUser = await findByFilter(email);
        if (!existingUser) {
            return res.send({ErrorMsg : "No Existing User"});
        }

        // validate the user's password that password is valid or not.
        let validPassword = await verifyPassword(password, existingUser.Password);
        
        if(!validPassword){
            return res.send({ErrorMsg: "Invalid Credentials"});
        }

        const payload = {
            UserId : existingUser.UserId
        }
        //it means we sign the jwt with our secrer key. if someone send wrong data by secret key we got to know it wrong data. 
        const authToken = jwt.sign(payload, config.development.JWT_SECRET);  
        res.send({authToken});

    } catch (error) {
        console.log(`error : ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
});

// Router 3: Get LoggedIn user details : login details required.
/* So we create middleware so that we use that anywhere. and we know we call the middleware in the httpmethods before callback function. */
router.post('/api/auth/getuser', LoggedInUserDetails, async (req, res) => {
    try {
        // What method we used with our model Users this methods given by sequelize.
        const userDetails = await Users.findByPk(req.user.UserId);
        res.send(userDetails);
        
    } catch (error) {
        console.log(`error : ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

/*
Note :- For getuser 
which means we get data from token and as we know we set data in the token so get that token from the header and decode that token, verify and get out data by that
data(we know data we pass the details in the data like id/email anaything which is to be unique and index also apply.) I am passing email at time of token generation.
*/


/* Note :-> when I hit this api from browser application will crash beacuse we said to code that save the details which you received from req and we can't add any details in req's
body because its not possible in browser that's why we application crashed. With postman/thunderclient here we are able to add details in body so that when we hit api it send req 
and there is a data in body because we have added. */