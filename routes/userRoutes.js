const express = require('express');
const router = express.Router();
const uplaodImages = require('./../utils/uploadImages');


const authController = require('../controllers/authController');

router.post('/signup',uplaodImages.uploadSingle ,authController.signUp);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updateMyPassword',authController.protect, authController.updatePassword);

module.exports = router;