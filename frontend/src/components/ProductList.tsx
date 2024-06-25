// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setProducts } from '../features/products/productSlice';
import { Container, Grid, Typography, TextField, MenuItem, Select, InputLabel, FormControl, Box, Button } from '@mui/material';
import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProductCard from './ProductCard';
import AddProductModal from './AddProductModal';
import CartIcon from './CartIcon';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
    const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch products and dispatch the setProducts action
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:4000/api/products');
      const data = await response.json();
      dispatch(setProducts(data));
    };

    fetchProducts();
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(e.target.value as string);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setPriceRange(e.target.value as number[]);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredProducts = products.filter((product) =>
    product.name && product.name.toLowerCase().includes(search.toLowerCase()) &&
    product.category.includes(category) &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1]
  );

  const handleProfile=()=>{
    navigate('/profile');
  }

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Product List
      </Typography>
      <Grid container spacing={2} alignItems="center" marginBottom={2} >
        <Grid item xs={12} sm={6} md={4} >
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Shirt">Shirt</MenuItem>
              <MenuItem value="T-Shirt">T-Shirt</MenuItem>
              <MenuItem value="Jeans">Jeans</MenuItem>
              <MenuItem value="Pants">Pants</MenuItem>
              <MenuItem value="Shoes">Shoes</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Sunglasses">Sunglasses</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Price Range</InputLabel>
            <Select
              value={priceRange}
              onChange={handlePriceRangeChange}
              label="Price Range"
            >
              <MenuItem value={[0, 1000]}>All</MenuItem>
              <MenuItem value={[0, 50]}>0 - 50</MenuItem>
              <MenuItem value={[51, 100]}>51 - 100</MenuItem>
              <MenuItem value={[101, 200]}>101 - 200</MenuItem>
              <MenuItem value={[201, 500]}>201 - 500</MenuItem>
              <MenuItem value={[501, 1000]}>501 - 1000</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={2}  sx={{display:'flex',justifyContent:'center',alignItems:'center',ml:5,mb:1}}>
          
            <Button variant="contained" color="primary"  sx={{mt:1,mr:5,px:8}} onClick={handleOpen}>
              Add Product
            </Button>
            
            <CartIcon />
          
        </Grid>
            <AccountCircleIcon sx={{ width: '70px', height: '70px', mt:2,ml:10 }} onClick={handleProfile} />
        
      </Grid>
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <AddProductModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default ProductList;
