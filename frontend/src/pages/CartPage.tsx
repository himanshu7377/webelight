import React from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../store/store";
import {
  updateCartQuantity,
  removeFromCart,
} from "../features/products/productSlice";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.products.cart);

  // Function to handle quantity change of an item in the cart
  const handleQuantityChange = (_id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateCartQuantity({ _id, quantity }));
    }
  };

  const handlePurchase = async () => {
    const productIds = cart.map(item => item._id); // Assuming each item in cart has _id field
    try {
      const response = await axios.put('http://localhost:4000/api/purchased', { productIds });
      console.log('Products purchased:', response.data);
      // Optionally, update UI or navigate to another page after successful purchase
      navigate('/');
    } catch (error) {
      console.error('Error purchasing products:', error);
    }
  };

  // Function to remove an item from the cart
  const handleRemoveFromCart = (_id: string) => {
    console.log("Removing item with id:", _id);
    dispatch(removeFromCart(_id));
  };

  // Calculate total price of items in the cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome To Cart Page
      </Typography>
      <Card>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", mt: 2 }}
        >
          Cart Items List
        </Typography>
        {cart.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <CardContent>
            {/* {console.log("Cart item",item)} */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="h6">${item.price}</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <TextField
                  type="number"
                  label="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item._id, parseInt(e.target.value))
                  }
                  inputProps={{ min: 1 }}
                />
                <IconButton
                  onClick={() => {
                    console.log("Clicked to remove item with id:", item._id);
                    handleRemoveFromCart(item._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Grid>
        ))}
        <Box marginTop={4} display="flex" justifyContent="space-around">
          <Typography variant="h6">
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={handlePurchase}>
            Checkout
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default CartPage;
