const router = require('express').Router()
const catalogueController = require('../controllers/catalogueController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/add_store', authAdmin, catalogueController.addStore)

router.get('/get_stores', authAdmin ,catalogueController.getStores)

router.get('/get_users', authAdmin, catalogueController.getUsers)

router.post('/add_store_to_user', authAdmin, catalogueController.addStoreToUser)

router.get('/get_stores_user', auth, catalogueController.getStoresUser)

router.post('/update_store_info', auth, catalogueController.updateStoreInfo)

router.post('/add_product', auth, catalogueController.addProduct)

router.post('/get_store_products', auth, catalogueController.getStoreProducts)

router.post('/update_product', auth, catalogueController.updateProduct)

module.exports = router