import { Router } from 'express';
import { getProducts, addProduct } from '../controllers/productController';

const router = Router();

router.get('/products', getProducts);
router.put('/addProduct', addProduct);

export default router;
