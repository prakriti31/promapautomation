import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // proxy via Vite to PHP backend
    maxBodyLength: Infinity,     // allow large file uploads
    maxContentLength: Infinity,
});

const token = localStorage.getItem('token');
if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;


api.interceptors.request.use((cfg) => {
    const token = localStorage.getItem('token');
    if (token) cfg.headers['Authorization'] = `Bearer ${token}`;
    return cfg;
});

export default api;
