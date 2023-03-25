const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    products: {
      type : [mongoose.Types.ObjectId],
      ref : 'Product'
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    createdAt: {
      type: Date,
      default: new Date()
    },
    status: {
      type: String,
      default: 'Not Processed',
      enum: ['Not Processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Not Processed'
    }
  }
);


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;