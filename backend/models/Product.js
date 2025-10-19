const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    price: {type: Number, required: true},
    description: {type: String},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    image: {type: String}
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
