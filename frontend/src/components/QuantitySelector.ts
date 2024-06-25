import React from 'react';
import { useAppDispatch } from '../store/store';
import { updateCartQuantity } from '../features/products/productSlice';
import { Box, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const QuantitySelector: React.FC<{ item: CartItem }> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (quantity: number) => {
    dispatch(updateCartQuantity({ ...item, quantity }));
  };

  const handleIncrement = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      handleQuantityChange(item.quantity - 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}  display="flex" alignItems="center">
      <IconButton onClick={handleDecrement} aria-label="Decrease quantity">
        <RemoveIcon />
      </IconButton>
      <Typography variant="body1">{item.quantity}</Typography>
      <IconButton onClick={handleIncrement} aria-label="Increase quantity">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
