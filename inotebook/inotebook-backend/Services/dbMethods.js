const db = require("../dbConfig");
const { where } = require("sequelize");

// create, find, update, delete this all methods given by sequelizr. there are alot methods.

const createUser = async ({ Name, Email, Password, Date }) => {
    const newUser = await db.Users.create({Name, Email, Password, Date});
    return newUser;
};


const findByFilter = async(Email) => {
    const existingUser = await db.Users.findOne({where : {Email}});
    return existingUser; 
}


module.exports = {createUser, findByFilter};