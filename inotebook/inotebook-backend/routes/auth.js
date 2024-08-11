const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const { handleEmail, handlePassword } = require("../validations/validation");
const { createUser, findByFilter } = require("../Services/dbMethods");
const { createHashPassword, verifyPassword, generateOtp } = require("../utils/commonMethods");
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const LoggedInUserDetails = require('../middleware/authLoggedInUser');
const { Users, MOtp } = require("../dbConfig");


// API/Router 1 : Here we create new user. No login Required.
router.post('/api/auth/createUser', [handleEmail, handlePassword], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(erros);
    }
    try {
        // In this we check that whether the email is already exist or not with the methods of model like below one findOne this method given model.
        let user = await findByFilter(req.body.email);
        if (user) {
            return res.send({ ErrorMsg: "Requested email already existing." });
        }

        /* By this method we create a new user with the help of sequelizer who have alot methods to insert data in the sql db. Those all methods declared in the Services.js(means  
        business logic file where we use all methods of sequelizer add code according our requirement so that our data inserted,udpated,deleted and retrived easily). */
        user = await createUser({
            Name: req.body.name,
            Email: req.body.email,
            Password: await createHashPassword(req.body.password),
            Date: Date.now()
        });

        const options = {
            expiresIn: '10m' // Set the token to expire in 1 hour
        };

        const data = {
            Name: user.Name,
            Email: user.Email,
            UserId: user.userId
        }

        const authToken = jwt.sign(data, config.development.JWT_SECRET, options);
        res.status(200).set('Authorization', `Bearer ${authToken}`);
        res.send("User created successfully");
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }

});

// API/Router 2 : Here, we logged in the user. so we create the JWT token.
router.post('/api/auth/login', [handleEmail, handlePassword], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(errors);
    }

    try {

        let { email, password } = req.body;
        //vlaidate the user who exist or not.
        let existingUser = await findByFilter(email);
        if (!existingUser) {
            return res.send({ ErrorMsg: "No Existing User" });
        }

        // validate the user's password that password is valid or not.
        let validPassword = await verifyPassword(password, existingUser.Password);

        if (!validPassword) {
            return res.send({ ErrorMsg: "Invalid Credentials" });
        }

        const options = {
            expiresIn: '10m' // Set the token to expire in 1 hour
        };

        const payload = {
            Name: existingUser.Name,
            Email: existingUser.Email,
            UserId: existingUser.UserId
        }

        //it means we sign the jwt with our secrer key. if someone send wrong data by secret key we got to know it wrong data. 
        //res.status(200).set('Authorization', `Bearer ${authToken}`);
        const authToken = jwt.sign(payload, config.development.JWT_SECRET, options);
        res.setHeader('Authorization', `Bearer:${authToken}`);
        // Above both ways we can set the header in response and to get info. from response header for this we need to add exposedHeader key in cors then able to get info from res header.

        res.send("User Successfully Logged In");

    } catch (err) {
        console.log(`error : ${err.message}`);
        res.status(500).send("Internal Server Error");
    }
});

// API/Router 3: Get LoggedIn user details : login details required.
/* So we create middleware so that we use that anywhere. and we know we call the middleware in the httpmethods before callback function. */
router.post('/api/auth/getuser', LoggedInUserDetails, async (req, res) => {
    try {
        // What method we used with our model Users this methods given by sequelize.
        const userDetails = await Users.findByPk(req.user.UserId);
        res.send(userDetails);

    } catch (err) {
        console.log(`error : ${err.message}`);
        res.status(500).send("Internal Server Error");
    }
});

// API/Router 4 -> Forgot password.
router.post('/api/auth/changePassword', async (req, res) => {
    try {
        // Here userEmail already validated when otp verified. That's why , we do not validate here.
        // Here we we use userId becasue we implement this changePassword when user want after login.
        let { email, newPassword, Verify, IsActive, IsValidOtp } = req.body;

        const validUser = await findByFilter(email);  

        if (Verify === 1 && IsActive === 1 && IsValidOtp === 1) {

            const newHashPass = await createHashPassword(newPassword);

            const updatePassword = await Users.update(
                { Password: newHashPass },
                {
                    where:
                    {
                        Email: email, 
                        UserId: validUser.UserId
                    }
                }
            );

            if (updatePassword[0] === 1) {
                return res.status(200).send({ SuccessMsg: "Password Changed Successfully" });
            }
            else {
                console.log("Something wrong in update code.");
                return res.status(401).send({ ErrorMsg: "Something went wrong" });
            }
        }
        else{
            return res.status(401).send({ErrorMsg : "please verify the Email"});
        }   

    } catch (err) {
        console.log(`error : ${err.message}`);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

