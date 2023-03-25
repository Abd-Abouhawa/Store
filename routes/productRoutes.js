// Create , Update , Delete
const express = require('express');
const router = express.Router();
const productController = require('./../controllers/productController');
const authController = require('./../controllers/authController');
const {uploadMany , uploadFields} = require('./../utils/uploadImages');

router.route('/')
      .post(authController.protect,
            authController.restrictTo('admin'),
            uploadFields,
            productController.createProduct)

      .patch(authController.protect
            ,authController.restrictTo('admin'),
            productController.updateProduct)

      .get(productController.getAllProducts);

router.route('/:id')
      .get(productController.getProductById)
      .delete(authController.protect,
      authController.restrictTo('admin'),
      productController.deleteProduct);   

module.exports = router;