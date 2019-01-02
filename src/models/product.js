import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2
    },
    price: {
      type: Number,
      required: true
    },
    sale_price: {
      type: Number,
      required: true
    },
    in_stock: {
      type: Boolean,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    productimage_set: [
      {
        image: String,
        status: Boolean
      }
    ]
  }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
