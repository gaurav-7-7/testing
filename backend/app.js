const express = require('express');

const cors = require('cors');
const con = require('./sql.js');
const register = require('./routes/register.js');
const login = require('./routes/login.js')
const home = require('./routes/home.js')
const cart = require('./routes/cart.js')
const app = express();
app.use(express.json())
app.use(cors());

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.use('/register',register)
app.use('/login',login)
app.use('/home',home)
app.use('/cart',cart)


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening at port ${port}`))

module.exports = app
