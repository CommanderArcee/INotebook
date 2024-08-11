const bcrypt = require("bcryptjs");   // for hashing with salting password.
const crypto = require("crypto");

const createHashPassword = async (userPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userPassword, salt);
    return hashPassword;
}

const verifyPassword = async (usersLoginPassword, userHashedPassword) => {
    let res = await bcrypt.compare(usersLoginPassword, userHashedPassword);
    return res;
}

const generateOtp = () => {
    const bufOtp = crypto.randomBytes(6);
    const randomOtp = bufOtp.toString("hex").substring(0,6);
    return randomOtp;
}

module.exports = {createHashPassword, verifyPassword, generateOtp};