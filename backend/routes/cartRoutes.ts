// cartRoutes.js
import express from 'express';
import { getCart, addToCart, updateCart } from '../controllers/cartController';

const router = express.Router();

// Get cart items
router.get('/cart', getCart);

// Add item to cart
router.put('/cart', addToCart);

// Update cart item
router.put('/cart/:id', updateCart);






export default router;
