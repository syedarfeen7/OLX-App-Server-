const express = require('express');
const router = express.Router();
const userController = require('./userContainer')


router.get('/getUserProfile/:id', userController.getUserProfileDetails)
router.get('/getAllUsers', userController.getAllSignedUpUsers)
router.get('/getUser/:id', userController.getUser)

router.post('/login', userController.loginWithDetails)
router.post('/signup', userController.addNewSignUpUser)
router.post('/userProfile', userController.addNewUserProfile)
router.post('/updatedUserProfile/:id', userController.updatedUserProfile)
router.post('/add-product-into-cart/:id', userController.addProductIntoCart)
router.post('/remove-product-from-cart/:id', userController.removeProductFromCart)
router.post('/remove-product-from-all-users-cart/:id', userController.removeProductFromAllUsersCart)


module.exports = router