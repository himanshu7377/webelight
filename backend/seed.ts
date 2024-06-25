import mongoose from 'mongoose';
import Product from './models/Product';
import connectDB from './config/db';

const seedProducts = async () => {
  await connectDB();

  const products = [
    {
      name: 'Classic White Shirt',
      price: 50,
      category: 'Shirt',
      description: 'A classic white shirt made from premium cotton.',
      imageUrl: 'https://example.com/images/classic-white-shirt.jpg',
    },
    {
      name: 'Casual Blue T-Shirt',
      price: 25,
      category: 'T-Shirt',
      description: 'A comfortable blue t-shirt perfect for casual wear.',
      imageUrl: 'https://example.com/images/casual-blue-tshirt.jpg',
    },
    {
      name: 'Slim Fit Jeans',
      price: 60,
      category: 'Jeans',
      description: 'Stylish slim fit jeans for a modern look.',
      imageUrl: 'https://example.com/images/slim-fit-jeans.jpg',
    },
    {
      name: 'Classic Chinos',
      price: 40,
      category: 'Pants',
      description: 'Versatile chinos that can be dressed up or down.',
      imageUrl: 'https://example.com/images/classic-chinos.jpg',
    },
    {
      name: 'Running Shoes',
      price: 80,
      category: 'Shoes',
      description: 'Lightweight running shoes with excellent cushioning.',
      imageUrl: 'https://example.com/images/running-shoes.jpg',
    },
    {
      name: 'Formal Black Shirt',
      price: 55,
      category: 'Shirt',
      description: 'Elegant black shirt suitable for formal occasions.',
      imageUrl: 'https://example.com/images/formal-black-shirt.jpg',
    },
    {
      name: 'Graphic T-Shirt',
      price: 30,
      category: 'T-Shirt',
      description: 'Trendy graphic t-shirt with unique design.',
      imageUrl: 'https://example.com/images/graphic-tshirt.jpg',
    },
    {
      name: 'Denim Jacket',
      price: 70,
      category: 'Jeans',
      description: 'Classic denim jacket for a casual and stylish look.',
      imageUrl: 'https://example.com/images/denim-jacket.jpg',
    },
    {
      name: 'Khaki Cargo Pants',
      price: 45,
      category: 'Pants',
      description: 'Comfortable cargo pants with multiple pockets.',
      imageUrl: 'https://example.com/images/khaki-cargo-pants.jpg',
    },
    {
      name: 'Leather Boots',
      price: 100,
      category: 'Shoes',
      description: 'Durable leather boots with a rugged design.',
      imageUrl: 'https://example.com/images/leather-boots.jpg',
    }
  ];
  

  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Database seeded');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedProducts();
