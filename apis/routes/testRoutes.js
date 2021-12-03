const router = require('express').Router()
const testController = require('../controllers/testController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/add_store', authAdmin, testController.addStore)

router.get('/get_stores', authAdmin ,testController.getStores)

router.get('/get_users', authAdmin, testController.getUsers)

router.post('/add_store_to_user', authAdmin, testController.addStoreToUser)

router.get('/get_stores_user', auth, testController.getStoresUser)

router.post('/update_store_info', auth, testController.updateStoreInfo)

router.post('/add_product', auth, testController.addProduct)

router.get('/get_store_products', auth, testController.getStoreProducts)

router.post('/update_product', auth, testController.updateProduct)

module.exports = router