import axios from 'axios';

// Gunakan proxy jika di local terkena CORS, atau gunakan extension browser
const BASE_URL = 'https://zeldvorik.ru/apiv3/api.php';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchMovies = async (action, page = 1, query = null, detailPath = null) => {
  try {
    const params = { action, page };
    if (query) params.q = query;
    if (detailPath) params.detailPath = detailPath;

    const response = await api.get('', { params });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

export const endpoints = {
  trending: 'trending',
  indoMovies: 'indonesian-movies',
  indoDrama: 'indonesian-drama',
  kdrama: 'kdrama',
  shortTv: 'short-tv',
  anime: 'anime',
  search: 'search',
  detail: 'detail'
};
