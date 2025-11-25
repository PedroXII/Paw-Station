import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
};

export const animalsAPI = {
  getAll: (filters = {}) => api.get('/animals', { params: filters }),
  getById: (id) => api.get(`/animals/${id}`),
  create: (animalData) => api.post('/animals', animalData),
  update: (id, animalData) => api.put(`/animals/${id}`, animalData),
};

export const adoptionsAPI = {
  create: (adoptionData) => api.post('/adoptions', adoptionData),
  getAll: () => api.get('/adoptions'),
  updateStatus: (id, status) => api.put(`/adoptions/${id}`, { status }),
};

export const donationsAPI = {
  create: (donationData) => api.post('/donations', donationData),
  getStats: () => api.get('/donations/stats'),
};

export default api;