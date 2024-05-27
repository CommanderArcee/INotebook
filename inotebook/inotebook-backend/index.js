require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

//const port = process.env.port || 5000 ;  Inseated of this we have used portfinder npm package.

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());  // to enable cors

// Available Routes
app.use(require('./routes/auth'));
app.use(require('./routes/notes'));

const portfinder = require('portfinder');

portfinder.getPort((err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

