import React, { useState } from 'react';
import { useAppDispatch } from '../store/store';
import { addProduct, setProducts } from '../features/products/productSlice';
import { Modal, Box, Typography, TextField, Button, Backdrop, Fade, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const categories = ['Pants', 'Shirts', 'Shoes', 'Accessories',"T-Shirt","Jeans","Sunglasses"];

const AddProductModal: React.FC<{ open: boolean, handleClose: () => void }> = ({ open, handleClose }) => {
  const dispatch = useAppDispatch();
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: '',
    description: '',
    imageUrl: '',
  });



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    // Send a PUT request to add the new product
    const response = await fetch('http://localhost:4000/api/addProduct', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      const addedProduct = await response.json();
      dispatch(addProduct(addedProduct));

       // Fetch the updated list of products
       const res = await fetch('http://localhost:4000/api/products');
       const updatedProducts = await res.json();
       dispatch(setProducts(updatedProducts));
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h6" gutterBottom>
            Add New Product
          </Typography>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Description"
            name="description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newProduct.imageUrl}
            onChange={handleInputChange}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddProductModal;
