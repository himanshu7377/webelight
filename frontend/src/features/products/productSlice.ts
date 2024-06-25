// src/features/products/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductsState {
  products: Product[];
  cart: CartItem[];
}

const initialState: ProductsState = {
  products: [],
  cart: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;
      const existingCartItemIndex = state.cart.findIndex((item) => item.name === productToAdd.name);

      if (existingCartItemIndex !== -1) {
        // If product already exists in cart, increment its quantity
        state.cart[existingCartItemIndex].quantity += 1;
      } else {
        // Otherwise, add new product to cart with quantity 1
        state.cart.push({ ...productToAdd, quantity: 1 });
      }
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemIdToRemove = action.payload;

      console.log("itemIdToRemove",itemIdToRemove);
      state.cart = state.cart.filter((item) => item._id !== itemIdToRemove);
    },
    updateCartQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
      const { _id, quantity } = action.payload;
      const cartItem = state.cart.find((item) => item._id === _id);
      if (cartItem) {
        // Update the quantity of the cart item
        cartItem.quantity = quantity;
      }
    },
  },
});

export const { setProducts, addToCart, addProduct, removeFromCart, updateCartQuantity } = productSlice.actions;
export default productSlice.reducer;
