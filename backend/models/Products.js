import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, default: '' },
  category: { type: String, default: '' },
  image:{type:String,default:''}
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
export default Product;
