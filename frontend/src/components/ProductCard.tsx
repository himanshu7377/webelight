
import React from 'react';

import { useAppDispatch } from '../store/store';
import { addToCart } from '../features/products/productSlice';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const dispatch = useAppDispatch();



  // Add product to cart function
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    console.log('Product added to cart:', product);
  };

  return (
    <Card style={{ height: '100%' , borderRadius: '30px'}}>
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={product.imageUrl} alt={product.name} width={400} height={300} onError={(e) => e.currentTarget.src = './noimg.png'} />
      </Box>
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
