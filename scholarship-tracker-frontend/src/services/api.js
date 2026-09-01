import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://simple-scholarship-tracker.onrender.com/api'
    : 'http://localhost:5000/api');

const API = axios.create({
  baseURL: API_BASE_URL,
});



API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (formData) => API.post('/auth/login', formData);
export const registerUser = (formData) => API.post('/auth/register', formData);
export const fetchScholarships = () => API.get('/scholarships');
export const createScholarship = (data) => API.post('/scholarships', data);
export const deleteScholarship = (id) => API.delete(`/scholarships/${id}`);

export default API;
