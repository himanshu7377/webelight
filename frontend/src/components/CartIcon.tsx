
import React from 'react';
import { useAppSelector } from '../store/store';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const CartIcon: React.FC = () => {
  const cart = useAppSelector((state) => state.products.cart);
  const navigate = useNavigate();

  // Function to handle cart icon click
  const handleClick = () => {
    navigate('/cart');
  };

  return (
    <IconButton color="inherit" onClick={handleClick}  >
      <Badge badgeContent={cart.length} color="secondary">
        <ShoppingCartIcon sx={{ width: '60px', height: '60px' }} />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
