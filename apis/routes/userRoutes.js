const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userController.register)

router.post('/activation', userController.activateEmail)

router.post('/login', userController.login)

router.post('/refresh_token', userController.getAccessToken)

router.post('/forgot_pwd', userController.forgotPassword)

router.post('/reset_pwd', auth, userController.resetPassword)

router.get('/user_info', auth, userController.getUserInfo)

router.get('/users_all_info', authAdmin, userController.getUsersAllInfo)

router.get('/logout', userController.logout)

module.exports = router