const SubCategory = require('./../models/subCategoryModel');
const catchAsync = require('./../utils/catchAsync');

exports.createSubCategory = catchAsync(async (req,res,next)=>{
  const subCategory = await SubCategory.create(req.body);
  
  res.status(201).json({
    status: 'success',
    data: {
      subCategory
    }
});
})

exports.updateSubCategoryById = catchAsync(async (req,res,next)=>{
  const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id, req.body ,
      {
        new : true ,
        runValidators : true
      });

      res.status(200).json({
        status : 'success',
        data : {
          subCategory
        }
      })
})

exports.addProductsToSubCategory = catchAsync(async (req,res,next)=>{
  const subCategory = await SubCategory.findById(req.params.id);
  if(!subCategory.products)
    return subCategory.products = req.body.products;

  const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      req.params.id ,{products : [...subCategory.products , ...req.body.products]},
      {
        new :true ,
        runValidators : true
      })

      res.status(200).json({
        status : 'success',
        data : {
          updatedSubCategory
        }
      })
}
)
exports.getSubCategoryById = catchAsync(async (req,res,next)=>{
  const subCategory = await SubCategory
                            .findById(req.params.id)
                            .populate({
                              path : 'products',
                              select : 'name image images price'
                            });

  res.status(200).json({
    status : 'success',
    data : {
      subCategory
    }
  })
})

exports.deleteSubCategoryById = catchAsync(async (req,res,next) => {
  const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

    if (!subCategory) {
        return next(new AppError('No document found with that ID!', 404));
    }
    res.status(204).json({
        status: 'success',
        data: {
          subCategory : '<Removed>'
        }
    })
})