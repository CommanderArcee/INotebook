const express = require("express");
//const users = require("../models/MUser");
const router = express.Router();
const { validationResult } = require("express-validator");
const { handleEmail, handlePassword } = require("../validations/validation");
const { createUser, findByFilter } = require("../Services/dbMethods");
const { createHashPassword, verifyPassword } = require("../utils/commonMethods");
const jwt = require('jsonwebtoken');
const JWT_Secret = "*8N0teb0)k";


/* Note :-> when I hit this api from browser application will crash beacuse we said to code that save the details which you received from req and we can't add any details in req's
body because its not possible in browser that's why we application crashed. With postman/thunderclient here we are able to add details in body so that when we hit api it send req 
and there is a data in body because we have added. */

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
            return res.send("Requested email already existing.");
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
            email: user.Email
        }
        const authToken = jwt.sign(data, JWT_Secret);
        console.log(authToken);

        res.send(`${authToken} user has been created`);
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
            return res.send("Please create your account");
        }

        // validate the user's password that password is valid or not.
        let validPassword = await verifyPassword(password, existingUser.Password);
        
        if(!validPassword){
            return res.send("Invalid credentials");
        }

        const payload = {
            Email : existingUser.Email
        }
        const authToken = jwt.sign(payload, JWT_Secret);  //it means we sign the jwt with our secrer key. if someone send wrong data by secret key we got to know it wrong data. 
        res.send(`Auth Token : ${authToken}`);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;