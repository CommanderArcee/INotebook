const { Sequelize } = require("sequelize");
const Users = require("./models/MUsers");
const Notes = require("./models/MNotes");
const config = require('./config/config.json');
// In config.json we add details/we can say add connectionstring of sql. Here, by config.json we connect sequelize with DB.
// That's why we create 3environment in config.json. So when we deploy our application we add details connectionString as per env(like production,test).
// As now project is in development condition that's why I added development I deploy my application in prod so we add production db details here.

const db = {};
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    port: config.development.SQL_PORT,
    dialect: config.development.dialect,
    dialectOptions: {
      options: { encrypt: false },
    },
  }
);

db.Users = Users(sequelize);
db.Notes = Notes(sequelize);

const checkAndSetInitialValue = async (tableName, desiredValue) => {
  const result = await sequelize.query(`
    SELECT IDENT_CURRENT('${tableName}') AS currentIdentity
  `);
  const currentIdentity = result[0][0].currentIdentity;
  if (currentIdentity < desiredValue) {
    await sequelize.query(`DBCC CHECKIDENT ('${tableName}', RESEED, ${desiredValue - 1})`);
    console.log(`Identity column for ${tableName} reseeded to ${desiredValue}.`);
  } else {
    console.log(`No reseeding needed for ${tableName}.`);
  }
};


const setInitialValueIdentityColumns = () => {
  // We need to write always a query like this and this returns a promise that's why I am facing errors. Because I am not write the code in correct way.
  return Promise.all([
    checkAndSetInitialValue('Users', 1000),
    checkAndSetInitialValue('Notes', 10000)
  ]);
}

// sync all models with database.
// with sync no need to create migration file and code. By this we refactor the promise chaining into async-await.
const databaseSync = async () => {
  try{
    await sequelize.sync({ alter: true });
    console.log("tables are synced");

    await setInitialValueIdentityColumns();
    console.log('Identity column initial value set.');
  }
  catch(e){
    console.error('Unable to create database & tables:', e);
  }
}

databaseSync();
module.exports = db;


/*
Process the flow of sequelizer how to create the tbl in db.
-> Here, we create the table with the help of model. That why we use this method modelName(sequelize). thn do sync it means agr tbl nhi hogi db mei toh yeh create krdega.
or sync means jo b add/update krenge hum code se vo sab yeh sync krta rhega.
or tbl create hogi when we create the model inside the model file where we define the structure of model vhi pe hum define method use krke tbl create kr rhe hai.
lkn tbl jb create hogi jb db ko use krenge or db use tb hoga jha humne iska buisness logic likhenge.
uske bad jha hum us file ko import krenge tb tbl create hogi qki us file mei tbl mei data insert krna chahte hai. Tbhi table create hogi.
*/

