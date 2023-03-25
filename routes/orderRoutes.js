const express = require('express');
const router = express.Router();

const orderController = require('./../controllers/orderController');
const authController = require('./../controllers/authController');

router.post('/' , authController.protect,
                  orderController.createOrder)
            
      .patch('/:id' , authController.protect,
                      authController.restrictTo('admin'),
                      orderController.updateOrderStatus)

      .get('/' , authController.protect ,
      orderController.getUserOrders)

      .get('/:id' ,orderController.getOrderById);

module.exports = router;                      