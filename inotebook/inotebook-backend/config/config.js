require("dotenv").config();

module.exports = {
  development: {
    "username": process.env.REACT_APP_USER, 
    "password": process.env.REACT_APP_PASSWORD,
    "database": process.env.REACT_APP_DB,
    "host": process.env.REACT_APP_HOST,
    "dialect": process.env.REACT_APP_DIALECT,
    "SQL_PORT": process.env.REACT_APP_SQL_PORT,
    "JWT_SECRET" : process.env.REACT_APP_JWT_SECRET,
    "Email_User" : process.env.EMAIL_USER,
    "Email_Password" : process.env.EMAIL_PASSWORD
  },
  test: {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mssql"
  },
  production: {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mssql"
  }
}

