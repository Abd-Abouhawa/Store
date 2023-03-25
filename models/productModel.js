const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  images : [String],
  image : String,
  price : {
    type : Number,
    required : [true , "please enter the product's price"]
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;