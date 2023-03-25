const catchAsync = require('../utils/catchAsync');
const Order = require('./../models/orderModel');

// POST - http://localhost:3000/orders
exports.createOrder = catchAsync(async (req,res,next)=>{
  
  req.body.user = req.user.id;

  const order = await Order.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
        order
    }
});
})

// GET - http://localhost:3000/orders/

exports.getUserOrders = catchAsync(async (req, res,next)=>{

  const orders = await Order.find({user: req.user.id}).populate({
    path: 'products',
    select: '-__v -_id'});

  res.status(200).json({
    data: {
      orders
    }
  })
})

// PATCH - http://localhost:3000/orders/:id
exports.updateOrderStatus = catchAsync(async (req, res,next)=>{
  const order = await Product.findByIdAndUpdate(req.params.id, {status : req.body.status}, {
    new: true,
    runValidators: true
});

  if (!order) {
      return next(new AppError('No document found with that ID!', 404));
  }
  res.status(200).json({
      status: 'success',
      data: {
          order
    }
});
})

// GET - http://localhost:3000/orders/:id
exports.getOrderById = catchAsync(async (req, res, next)=>{

  const order = await Order.findById(req.params.id).populate({
    path : 'products',
    select : 'name image price'
  });

  res.status(200).json({
    status: 'success',
    data: {
        order
  }
});
})