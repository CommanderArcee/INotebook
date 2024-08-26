const express = require("express");
const router = express.Router();
const { findByFilter } = require("../Services/dbMethods");
const { generateOtp } = require("../utils/commonMethods");
const { MOtp } = require("../dbConfig");
const { sendMailWithOtp } = require('../Services/EmailService.js');
const { where, Op } = require("sequelize");


// Router 1 -> Send Mail with Otp to validate the correct user.
router.post('/api/otp/otpSendMail', async (req, res) => {
    try {
        let { userEmail } = req.body;

        let emailOtp = generateOtp();

        let otpTimeLimit = 300;  /* Here given value is in seconds. */

        let currentDate = new Date();  /* Date.now() -> returns date in milisecoonds and new Date() -> returns the date in correct format */

        /* 
        We use the getTime method to handle time calculations. If we want to add time to the currentDate, we use getTime to get the time in milliseconds from the currentDate. 
        We then add the additional time to this value and store the result in a new variable. This way, the currentDate itself remains unchanged. The new time with the added
        duration is stored in a different variable.
        That's why we don't use setSeconds method because it set the time in currentDate due to this currentDate is modified with updated value.
        */

        let dateTimeForOtp = currentDate.getTime() + otpTimeLimit * 1000;

        let otpExpireDateTime = new Date(dateTimeForOtp);  // Convert milliseconds back into a Date object

        const validUser = await findByFilter(userEmail);

        if (!validUser) return res.status(401).send({ ErrorMsg: "User not Exists" });

        /* IsValidOtp -> This column used so that user not able to use old otp. So, we give ExpiredDateTime aswell. */
        let otpDetails = await MOtp.create({
            Email: userEmail,
            Otp: emailOtp,
            Verify: 0,
            VerifiedAt: null,
            ExpiredDateTime: otpExpireDateTime,
            OtpExpiredTimeLimit: otpTimeLimit,
            IsActive: 1,
            IsValidOtp: 1
        });

        const sendMailResult = await sendMailWithOtp({ toMailAddress: userEmail, emailOtp });

        let { msg, info } = sendMailResult;
        let { OtpId, Email, created_at, ExpiredDateTime, IsActive, Verify } = otpDetails;

        if (msg === "Email sent" && info != '') {
            return res.send({ msg: "Otp sent on Email Successfully!" });
        }
        else {
            return res.send({ msg });
            // So that Its shows failure msg at time of send mails which returns from catch.
        }

    } catch (err) {
        console.log(`error : ${err.message}`);
        res.status(500).send("Internal Server Error");
    }
});

// Router 2 -> TO verify the otp with some conditons.
router.post('/api/otp/verifyOtp', async (req, res) => {
    try {
        let { userEmail, userEnteredOtp, currentDateTimeOfOtp } = req.body;

        let userOtpData = await MOtp.findOne({
            where: { Email: userEmail },
            order: [
                ['created_at', 'DESC']
            ]
            // Here using order property of sql by which we get data on the basis of ordering.
        });

        let otpCurrentDate = new Date(currentDateTimeOfOtp);

        // we can't use ternary operator if we need to return some data or object. Because I have tried to use below code in form of ternary.
        if (userOtpData.Otp === userEnteredOtp) {
            if (userOtpData.ExpiredDateTime < otpCurrentDate) {
                await MOtp.update({ IsActive: 0, IsValidOtp: 0 }, {
                    where: {
                        Email: userEmail,
                        IsActive: 1,
                        IsValidOtp: 1,
                        VerifiedAt: null
                    }
                });
                return res.send({ ErrorMsg: "Otp Expired" });
            }
            else {
                await MOtp.update({ Verify: 1, VerifiedAt: new Date(), IsActive : 1, IsValidOtp :  1 }, {
                    where: {
                        Email: userEmail,
                        Otp: userEnteredOtp
                    }
                });

                const currentGetOtpData = await MOtp.findOne({
                    where: {
                        Email: userEmail, Verify: 1,
                        VerifiedAt: {
                            [Op.not]: null
                        }
                        // Here using sql operators with the table columns and Its a part of where beacuse we add condition that's why.
                    }
                });

                let { Email, IsActive, Verify, IsValidOtp } = currentGetOtpData;

                return res.status(200).send({ Email, IsActive, Verify, IsValidOtp });
            }
        }
        else {
            // here we update beacuse when otp not equal but entry in db, so previous record will be updated.
            await MOtp.update({ IsActive: 0, IsValidOtp: 0 }, {
                where: {
                    Email: userEmail,
                    IsActive: 1,
                    IsValidOtp: 1,
                    VerifiedAt: null
                }
            });
            return res.send({ ErrorMsg: "Otp not found" });
        }

    } catch (err) {
        console.log(`error : ${err.message}`);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
