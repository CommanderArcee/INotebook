const bcrypt = require("bcryptjs");   // for hashing with salting password.

const createHashPassword = async (userPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userPassword, salt);
    return hashPassword;
}

const verifyPassword = async (usersLoginPassword, userHashedPassword) => {
    let res = await bcrypt.compare(usersLoginPassword, userHashedPassword);
    return res;
}

module.exports = {createHashPassword, verifyPassword};