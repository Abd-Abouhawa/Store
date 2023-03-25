const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/categoryController');
const authController = require('./../controllers/authController');
const uploadImages = require('./../utils/uploadImages');

router.post('/' ,
      authController.protect,
      authController.restrictTo('admin'),
      uploadImages.uploadSingle,
      categoryController.createCategory)

      .patch('/id' , authController.protect,
      authController.restrictTo('admin'),
      uploadImages.uploadSingle,
      categoryController.updateCategory)

      .patch('/addSubCategoryToCategory/:id',/* Add any permessions */ categoryController.addSubCategoryToCategory)

      .get('/' , categoryController.getAllCategories)
      
module.exports = router;      