import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, price, category, description, imageUrl } = req.body;

  const newProduct = new Product({
    name,
    price,
    category,
    description,
    imageUrl,
  });

  try {
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};
