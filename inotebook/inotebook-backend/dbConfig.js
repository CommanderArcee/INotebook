const { Sequelize } = require("sequelize");
const User = require("./models/MUser");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.SQL_PORT,
    dialect: process.env.DIALECT,
    dialectOptions: {
      options: { encrypt: false },
    },
  }
);

const db = {};
db.Users = User(sequelize);
// sync all models with database
sequelize.sync({ alter: true });

module.exports = db;

/*
Process the flow of sequelizer how to create the tbl in db.
-> Here, we create the table with the help of model. That why we use this method modelName(sequelize). thn do sync it means agr tbl nhi hogi db mei toh yeh create krdega.
or sync means jo b add/update krenge hum code se vo sab yeh sync krta rhega.
or tbl create hogi when we create the model inside the model file where we define the structure of model vhi pe hum define method use krke tbl create kr rhe hai.
lkn tbl jb create hogi jb db ko use krenge or db use tb hoga jha humne iska buisness logic likhenge.
uske bad jha hum us file ko import krenge tb tbl create hogi qki us file mei tbl mei data insert krna chahte hai. Tbhi table create hogi.
*/

