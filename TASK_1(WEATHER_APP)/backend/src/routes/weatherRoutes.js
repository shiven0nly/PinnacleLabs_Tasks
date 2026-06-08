import express from 'express';
const router = express.Router();
import { getWeatherData } from './../controllers/weatherController.js';

// Route: GET / api/weather?city=delhi
router.get('/', getWeatherData);

export default router;
