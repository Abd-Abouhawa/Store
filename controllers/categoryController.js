const Category = require('./../models/categoryModel');
const APIFeatures = require('./../utils/apiFeature');
const catchAsync = require('./../utils/catchAsync');

// POST - http://localhost:3000/category
exports.createCategory = catchAsync(async(req,res,next)=>{

  req.body.image = req.file.filename;
  const category = await Category.create(req.body);
  
  res.status(201).json({
    status: 'success',
    data: {
      category
    }
});
})

// DELETE - http://localhost:3000/category/:id
exports.deleteCategory = catchAsync(async(req,res,next)=>{
  const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        return next(new AppError('No document found with that ID!', 404));
    }
    res.status(204).json({
        status: 'success',
        data: {
          category : '<Removed>'
        }
    })
})

// PATCH - http://localhost:3000/category/:id
exports.updateCategory = catchAsync(async(req,res,next)=>{
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
});

  if (!category) {
      return next(new AppError('No document found with that ID!', 404));
  }
  res.status(200).json({
      status: 'success',
      data: {
        category
    }
});
})

// GET - http://localhost:3000/category
// with all possible filters and sorting and paginations
exports.getAllCategories = catchAsync(async(req, res,next)=>{

  const features = new APIFeatures(Category.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

  const categories = await features.query.populate(
    {
      path : 'subCategories' ,
      select :'name'
    });


  res.status(200).json({
      status: 'success',
      result: categories.length,
        data: {
          categories
      }
  });
})

exports.addSubCategoryToCategory = catchAsync(async (req, res, next) =>{
  const category = await Category.findById(req.params.id);
  if(!category.subCategories)
    return category.subCategories = req.body.subCategories;

  const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id ,{subCategories : [...category.subCategories , ...req.body.subCategories]},
      {
        new :true ,
        runValidators : true
      })

      res.status(200).json({
        status : 'success',
        data : {
          updatedCategory
        }
      })
})