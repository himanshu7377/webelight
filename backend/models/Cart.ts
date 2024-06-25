import mongoose, { Schema, Document } from 'mongoose';

export interface CartItem extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

const cartSchema: Schema<CartItem> = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const Cart = mongoose.model<CartItem>('Cart', cartSchema);

export default Cart;
