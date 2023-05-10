const express = require('express')
const bodyParser = require("body-parser");
const con = require('../sql.js');
const { v4: uuidv4 } = require('uuid');
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

module.exports = {
    registerUser: async (req, res, next) => {
        try {
            let uid = uuidv4();
            let { username, email, password } = req.body.user
            password = hashSync(password, 10)
            let sql = `SELECT * from user where email = "${email}"`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                if (result.length === 0) {
                    let sql = `INSERT INTO user (uuid, username, email, password ) VALUES ("${uid}", "${username}", "${email}", "${password}")`;
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log('record inserted');
                        res.json({status:true,message:'success'})
                    });
                } else {
                    console.log('User with this email already exists');
                    res.json({status: false, message:'User with this email already exists'})
                }
            });
        } catch (err) {
            console.log(err)
        }
    },
    loginUser: async (req,res, next)=>{
        try {
            let { email, password } = req.query
            let sql = `SELECT * from user where email = "${email}"`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                if (result.length === 0) {
                    res.json({status:false,message:"The entered user doesnot exist"})
                } else {
                    if(compareSync(password, result[0].password)) {
                        const user = {
                            userid : result[0].uuid,
                            email: result[0].email
                        }
                    const token = jwt.sign(
                        { user_id: user.userid, email },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "2h",
                        }
                    );
                        user.token = token;
                    res.json({status: true,payload: user})
                    } else {
                        res.json({status:false,message:"The entered password is incorrect!"})
                    }
                }
            });   
        } catch (err) {
            console.log(err)
        }
    }
}