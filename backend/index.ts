import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import purchasedRoutes from './routes/purchasedRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', purchasedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
