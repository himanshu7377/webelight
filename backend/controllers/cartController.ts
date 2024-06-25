import { Request, Response } from 'express';
import Cart, { CartItem } from '../models/Cart';



export const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const cartItems = await Cart.find();
        res.json(cartItems);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
        
    }
}


export const updateCart = async (req: Request, res: Response): Promise<void> => {
    const { productId, quantity } = req.body;
    try {
        const cartItem = await Cart.findOneAndUpdate({ productId }, { quantity }, { new: true });
        if (cartItem) {
            res.json(cartItem);
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}


export const addToCart = async (req: Request, res: Response): Promise<void> => {
    const { productId, quantity } = req.body;
  
    try {
      const cartItem: CartItem = new Cart({ productId, quantity });
      await cartItem.save();
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  };
