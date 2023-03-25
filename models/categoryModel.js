const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  image : String,
  
  subCategories: {
    type : [mongoose.Types.ObjectId],
    ref : 'SubCategory'
  }
})

const Category = mongoose.model('Category' , categorySchema);

module.exports = Category