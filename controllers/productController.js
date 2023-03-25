const Product = require('./../models/productModel');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeature');
const catchAsync = require('../utils/catchAsync');


// POST - http://localhost:3000/products
exports.createProduct = catchAsync(async (req,res,next)=>{
  req.body.images = [];

  req.body.image = req.files.image[0].filename; 

  for(let i=0;i<req.files.images.length;i++){
    req.body.images.push(req.files.images[i].filename);
}
  
  const product = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
        product
    }
});
})

// PATCH - http://localhost:3000/products/:id
exports.updateProduct = catchAsync(async (req,res,next)=>{
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
});

  if (!product) {
      return next(new AppError('No document found with that ID!', 404));
  }
  res.status(200).json({
      status: 'success',
      data: {
          product
    }
});
})

// DELETE - http://localhost:3000/products/:id
exports.deleteProduct = catchAsync(async (req,res,next)=>{
  
  const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return next(new AppError('No document found with that ID!', 404));
    }
    res.status(204).json({
        status: 'success',
        data: {
          product : '<Removed>'
        }
    })
})

// GET - http://localhost:3000/products/:id
exports.getProductById = catchAsync(async (req,res,next)=>{
  const product = Product.findById(req.params.id);
    
    if (!product) {
        return next(new AppError('No document found with that ID!', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
})

// Get - http://localhost:3000/products
exports.getAllProducts = catchAsync(async (req,res,next)=>{

    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

  const products = await features.query;


  res.status(200).json({
      status: 'success',
      result: products.length,
        data: {
        products
      }
  });
  }
)

