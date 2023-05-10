const {Router} = require('express');
const router = Router()
const { getAll, getFoodById, saveToCart } = require('../controllers/homeController.js')

router.get('/:id',getFoodById)
router.get('/',getAll)
router.post('/',saveToCart)

module.exports = router 