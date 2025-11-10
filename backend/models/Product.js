import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    image: { type: String },
    quantity: { type: Number, required: true, default: 0 } // добавлено поле
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
