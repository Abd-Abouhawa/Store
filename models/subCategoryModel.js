const mongoose = require('mongoose');
const subCategorySchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  products: {
    type : [mongoose.Types.ObjectId],
    ref : 'Product'
  }
})

const SubCategory = mongoose.model('SubCategory' , subCategorySchema);

module.exports = SubCategory;