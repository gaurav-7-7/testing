const {Router} = require('express');
const {registerUser} = require('../controllers/authController.js')
const router = Router()


router.post('/',registerUser)
module.exports = router