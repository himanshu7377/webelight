// src/components/ProductCard.tsx
import React from 'react';
import { useAppDispatch } from '../store/store';
import { addToCart } from '../features/products/productSlice';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    console.log('Product added to cart:', product);
  };

  return (
    <Card style={{ height: '100%' }}>
      <CardMedia
        component="img"
        // alt={product.name}
        height="140"
        image={product.imageUrl}
        // title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
        <Typography variant="h6">${product.price}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
