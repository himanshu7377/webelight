import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  purchased: { type: Boolean, default: false }, // Flag for purchase status
  purchaseDate: {type: Date}, // Date of purchase
});

export default mongoose.model<IProduct>('Product', ProductSchema);
