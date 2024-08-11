const nodemailer = require('nodemailer');
const config = require('../config/config');

const sendMailWithOtp = async ({ toMailAddress, emailOtp }) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        PORT: 465,
        auth: {
            user: config.development.Email_User,
            pass: config.development.Email_Password
        }
    });

    let mailOptions = {
        from: 'projectdev2405@gmail.com',
        to: toMailAddress,
        subject: 'Your OTP',
        html: `<b> Your OTP : ${emailOtp} </b>
        <h3><strong> Please do not share this otp to anyone ! </strong></h3>
        <p><strong> Note :- </strong> OTP valid till 5mins </p>
        <h4>Please don't reply to back this email!</h4>
        `
    }

    // By this code we change promise then catch into this await try catch.
    try{
        let info = await transporter.sendMail(mailOptions);
        return  {
            msg: 'Email sent',
            info: info.response,
            preview: nodemailer.getTestMessageUrl(info)
        };
    }
    catch(err){
        return {msg : err.message}
    }
    
}

module.exports = { sendMailWithOtp }
