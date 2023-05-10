const {Router} = require('express');
const router = Router()
const { loginUser } = require('../controllers/authController.js')

router.get('/',loginUser)

module.exports = router