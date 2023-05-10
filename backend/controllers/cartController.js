const express = require('express');
const bodyParser = require("body-parser");
const con = require('../sql.js');
const axios = require('axios');
const app = express();
app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use(express.json())


module.exports = {
    getCart: async (req, res, next) => {
        try {
            console.log('in cart')
            let token = req.headers.authorization
            let { user_id } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
            let sql = `SELECT item_id, item, quantity from cart where user_id = "${user_id}"`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                if (result.length!==0) {
                   res.send({response:result, status: 'success'})
                } else {
                    console.log('Your cart is Empty');
                    res.json({status: false, message:'Your cart is Empty'})
                }
            });
        }
        catch (err) {
            console.log(err)
        }


    }
}