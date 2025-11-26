import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

import productRoutes from './routes/productRoutes';
import uploadRoutes from './routes/uploadRoutes';
import categoryRoutes from './routes/categoryRoutes';
import tagRoutes from './routes/tagRoutes';
import userRoutes from './routes/userRoutes';
import homeInfoRoutes from './routes/homeInfoRoutes';

// Routes
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/users', userRoutes);
app.use('/api/home-info', homeInfoRoutes);

app.get('/', (req, res) => {
  res.send('Product Review API is running');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

import sequelize from './config/database';
import './models'; // Import models to initialize relationships

// Start server
const startServer = async () => {
  try {
    // Test database connection
    // Schema is managed by migrations, not sync()
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} OK`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

startServer();
