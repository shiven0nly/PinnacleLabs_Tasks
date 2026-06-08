import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import weatherRoutes from './routes/weatherRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// MiddleWare
app.use(cors()); // Allows requests from React frontend
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
