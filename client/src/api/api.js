import axios from 'axios';

const api = axios.create({
    baseURL: '/api',          // Vite proxy → PHP backend
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
});

/* ───── attach token on every request ───── */
const token = localStorage.getItem('token');
if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;

api.interceptors.request.use(cfg => {
    const t = localStorage.getItem('token');
    if (t) cfg.headers.Authorization = `Bearer ${t}`;
    return cfg;
});

/* ───── global 401 handler – log-out on expired / bad token ───── */
api.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete api.defaults.headers.common.Authorization;

            // hard redirect so React tree re-mounts in logged-out state
            window.location.replace('/login');
        }
        return Promise.reject(err);
    },
);

export default api;
