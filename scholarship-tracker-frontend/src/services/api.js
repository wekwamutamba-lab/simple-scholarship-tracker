import axios from 'axios';

const API = axios.create({
  baseURL: "https://simple-scholarship-tracker.onrender.com/api",
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