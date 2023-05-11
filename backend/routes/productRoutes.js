const express = require('express')
const {isAdmin,requireSignIn} = require('../middleware/authMiddleware.js')
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController } = require('../controllers/productController.js')
const router = express.Router()
const formidable = require('express-formidable')

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

router.patch('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//get products
router.get('/get-product',getProductController)

//get single product
router.get('/get-product/:slug',getSingleProductController)

//get photo
router.get('/product-photo/:pid',productPhotoController)

//delete product
router.delete('/product-delete/:pid',deleteProductController)

module.exports = router