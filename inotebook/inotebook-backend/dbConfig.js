const { Sequelize } = require("sequelize");
const Users = require("./models/MUsers");
const Notes = require("./models/MNotes");
const mOtp = require("./models/MOtp.js");
const config = require('./config/config.js');


const environment = process.env.NODE_ENV || 'development';
const envConfig = config[environment];

const sequelize = new Sequelize(
  envConfig.database,
  envConfig.username,
  envConfig.password,
  {
    host: envConfig.host,
    port: envConfig.SQL_PORT,
    dialect: envConfig.dialect
  }
);

const db = {
  Users: Users(sequelize),
  Notes: Notes(sequelize),
  MOtp: mOtp(sequelize),
};

module.exports = db;
