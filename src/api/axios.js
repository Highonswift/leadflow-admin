import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.yourbackend.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization Token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or use your Auth context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
