require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const EmailService = require('./Services/EmailService');
const app = express();

const PORT = process.env.PORT || 5000; // process.env.port -> its basicallt used for production/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//app.use(cors());  // to enable cors

app.use(cors({
  origin: '*', // or specify the allowed origin
  exposedHeaders: ['Authorization']
}));

// Available Routes
app.use(require('./routes/auth'));
app.use(require('./routes/notes'));
app.use(require('./routes/otp'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



