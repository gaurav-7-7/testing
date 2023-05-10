const express = require('express');
const bodyParser = require("body-parser");
const con = require('../sql.js');
const axios = require('axios');
const app = express();
app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use(express.json())


module.exports = {
    getAll: async (req, res, next) => {
        let { tag, search } = req.query
        if(tag) {
        let urls= [
            'https://dummyjson.com/products/category/' + tag,
            'https://dummyjson.com/products/categories'
        ];
        let result = [];
        const requests = urls.map((url) => axios.get(url));
        axios.all(requests)
            .then((responses) => {
                responses.forEach((resp) => {
                    let msg = {
                        status: resp.status,
                        fields: resp.data,
                    };
                    result.push(msg)
                });
                console.log(result)
                res.send(result)
            })
            .catch((error) => {
                console.log(error);
            });
        } else if(search) {
            let urls= [
                'https://dummyjson.com/products/search?q=' + search,
                'https://dummyjson.com/products/categories'
            ];
            let result = [];
            const requests = urls.map((url) => axios.get(url));
            axios.all(requests)
                .then((responses) => {
                    responses.forEach((resp) => {
                        let msg = {
                            status: resp.status,
                            fields: resp.data,
                        };
                        result.push(msg)
                    });
                    console.log(result)
                    res.send(result)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
        let urls = [
            'https://dummyjson.com/products/?limit=100',
            'https://dummyjson.com/products/categories'
        ];
        let result = [];
        const requests = urls.map((url) => axios.get(url));
        axios.all(requests)
            .then((responses) => {
                responses.forEach((resp) => {
                    let msg = {
                        status: resp.status,
                        fields: resp.data,
                    };
                    result.push(msg)
                });
                console.log(result)
                res.send(result)
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
    getFoodById: async (req, res, next) => {
        let id = req.params.id
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://dummyjson.com/products/' + id,
        };
        axios(config)
            .then(function (response) {
                res.send(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    saveToCart: async (req,res, next)=>{
        try{
            console.log('we did it')
            let token = req.headers.authorization
            let {user_id} = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
            let cartItem = JSON.stringify(req.body.cartItem.item)
            let cartId = req.body.cartItem.id
            let sql = `SELECT item_id from cart where user_id = "${user_id}"`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                result = result.map(data => data.item_id)
                if (!result.includes(cartId)) {
                    let sql = `INSERT INTO cart (user_id, item_id, item, quantity ) VALUES ("${user_id}", ${cartId}, '${cartItem}', 1)`;
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log('record inserted');
                        res.json({status:true,message:'success'})
                    });
                } else {
                    console.log('The item is already added in the cart');
                    res.json({status: false, message:'The item is already added in the cart'})
                }
            });

        }catch(err) {
            console.log(err)
        }
    }

}
