const {Router} = require('express');
const router = Router()
const {getCart} = require('../controllers/cartController.js')


router.get('/',getCart)

module.exports = router