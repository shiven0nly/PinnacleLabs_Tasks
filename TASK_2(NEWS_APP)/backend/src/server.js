import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoute.js';
import postRoutes from './routes/postRoute.js';
import newsRoutes from './routes/newsRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.log(`Database is not connected ${err}`);
  });

// for allowing json in req body;
app.use(express.json());
app.use(cookieParser());
// for allowing cross origin requests with credentials
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running at ${PORT}`);
});

//import auth routes
app.use('/api/auth', authRoutes);
//import user routes
app.use('/api/user', userRoutes);
//import post routes
app.use('/api/post', postRoutes);
//import news routes
app.use('/api/news', newsRoutes);

// MiddleWare
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
