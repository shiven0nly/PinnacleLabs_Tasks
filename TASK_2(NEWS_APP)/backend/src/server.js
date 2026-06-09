import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database is connected")
    })
    .catch((err)=>{
        console.log(`Database is not connected ${err}`);
    })

//MiddleWare
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running at ${PORT}`);
  
});
