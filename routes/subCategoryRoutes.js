const express = require('express');
const router = express.Router();
const subCategoryController = require('./../controllers/subCategoryController');

router.post('/',subCategoryController.createSubCategory);

router.route('/:id')
      .patch(subCategoryController.updateSubCategoryById)
      .get(subCategoryController.getSubCategoryById)
      .delete(subCategoryController.deleteSubCategoryById);

router.patch('/addToSub/:id' , subCategoryController.addProductsToSubCategory);      

module.exports = router;