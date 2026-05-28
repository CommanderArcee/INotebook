const { Sequelize } = require("sequelize");
const Users = require("./models/MUsers");
const Notes = require("./models/MNotes");
const mOtp = require("./models/MOtp.js");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false
});

const db = {
  Users: Users(sequelize),
  Notes: Notes(sequelize),
  MOtp: mOtp(sequelize),
  sequelize
};

sequelize.sync({ alter: false })
  .then(() => console.log("Database synced successfully"))
  .catch(err => console.log("Database sync error:", err));

module.exports = db;