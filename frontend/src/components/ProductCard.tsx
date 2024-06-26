// src/components/ProductCard.tsx
import React from 'react';
import { useAppDispatch } from '../store/store';
import { addToCart } from '../features/products/productSlice';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    console.log('Product added to cart:', product);
  };

  return (
    <Card style={{ height: '100%' , borderRadius: '30px'}}>
      <CardMedia
        component="img"
        // alt={product.name}
        height="140"
        image={product.imageUrl}
        // title={product.name}
      />
      <CardContent  >
        <Box>
        <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'left' }} >
          {product.name}
        </Typography>
        </Box>
       
        <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'left' }}>
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'left' ,gap: 10  ,mt:2}}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}> price :${product.price}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        </Box>
       
      </CardContent>
    </Card>
  );
};

export default ProductCard;
