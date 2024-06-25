import { Request, Response } from 'express';
import Product from '../models/Product';
import Cart, { CartItem } from '../models/Cart';

export const getPurchased = async (req: Request<any, any, { productIds: string[] }>, res: Response) => {
    try {
        const { productIds } = req.body;
        const updateResult = await Product.updateMany(
            { _id: { $in: productIds } },
            { $set: { purchased: true, purchaseDate: new Date() } }
        );
        const pur = new Date();
        console.log("purchaseDate",pur);
        console.log("update",updateResult);
        res.status(200).json({ message: 'Products purchased successfully', updateResult });
    } catch (error) {
        console.error('Error in getPurchased:', error);
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
}

export const getPurchaseHistory = async (req: Request<any, any, any, { startDate: string, endDate: string }>, res: Response) => {
    try {
        const { startDate, endDate } = req.query;
        console.log("start",startDate, "end",endDate);
        if (!startDate || !endDate) {
            res.status(400).json({ message: 'Start date and end date are required' });
            return;
        }

        const start = new Date(startDate as string);
        const end = new Date(new Date(endDate as string).setHours(23, 59, 59, 999));

        console.log("after converting","start",startDate, "end",endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            res.status(400).json({ message: 'Invalid start or end date' });
            return;
        }

        const history = await Product.find({
            purchased: true,
             purchaseDate: { $gte: start, $lte: end },
        });
        res.status(200).json(history);
    } catch (error) {
        console.error('Error in getPurchaseHistory:', error);
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
}

export const addToCart = async (req: Request<any, any, { productId: string, quantity: number }>, res: Response) => {
    const { productId, quantity } = req.body;
  
    try {
        const cartItem: CartItem = new Cart({ productId, quantity });
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        console.error('Error in addToCart:', error);
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};
