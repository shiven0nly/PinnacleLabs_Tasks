import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoute.js';

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

//MiddleWare
// for allowing json in req body;
app.use(express.json());
// for allowing cross origin requests
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running at ${PORT}`);
});

//import auth routes
app.use('/api/auth', authRoutes);
