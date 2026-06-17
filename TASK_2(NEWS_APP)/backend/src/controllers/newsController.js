import { errorHandler } from '../utils/error.js';

export const getNews = async (req, res, next) => {
  try {
    const { category = 'general', page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    const API_KEY = process.env.MEDIASTACK_API_KEY;

    if (!API_KEY) {
      return next(errorHandler(500, 'News API key not configured'));
    }

    const url = `http://api.mediastack.com/v1/news?access_key=${API_KEY}&categories=${category}&languages=en&limit=${limit}&offset=${offset}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return next(
        errorHandler(500, data.error.message || 'Failed to fetch news')
      );
    }

    res.status(200).json({
      success: true,
      data: data.data,
      pagination: data.pagination,
    });
  } catch (error) {
    next(error);
  }
};
