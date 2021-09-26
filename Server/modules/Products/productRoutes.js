const express = require('express');
const router = express.Router();
const productController = require('./productController')


router.post('/add-product', productController.addNewProduct)
router.get('/all-product', productController.getAllProducts)
router.get('/get-products/:id', productController.getAllTheProductsofSpecificUser)
router.get('/get-single-product/:id', productController.getSingleProduct)
router.get('/get-product-except-logoin-user/:id', productController.getALLTheProductsExceptLoggedInUser)
router.post('/delete-product/:id', productController.deleteProductByID)
module.exports = router