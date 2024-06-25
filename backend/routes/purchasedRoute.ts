import express from 'express';
import { getPurchased, getPurchaseHistory } from '../controllers/purchasedController';

const router = express.Router();

// Get cart items
router.put('/purchased', getPurchased);

// Add item to cart
router.get('/profile', getPurchaseHistory);








export default router;
