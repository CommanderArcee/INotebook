require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());  // to enable cors

// Available Routes
app.use(require('./routes/auth'));
app.use(require('./routes/notes'));


app.listen(port, () => {
    console.log(`Server is start at this localhost\\ ${port}`)
});

// pehle server connect hua qki db connect hone mei time leta hai isliye. Isi ko Asynchronous JS kehte hai isliye hum js ka nature non-blocking hota hai vo function ko call krta hua 
// chlta hai. Isliye yeh baki languages se different hai qki python,java,c,c++,c# yeh sab synchronously work krti.

