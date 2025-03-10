import axios from 'axios';

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Automatically attach the token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle token expiry & auto-refresh
let isRefreshing = false;
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            if (isRefreshing) return Promise.reject(error);

            isRefreshing = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const res = await axios.post('/auth/refresh-token', { refreshToken });

                // Save new token
                localStorage.setItem('token', res.data.token);

                // Broadcast token update to all tabs
                localStorage.setItem('token-refreshed', Date.now().toString());

                // Retry original request
                error.config.headers.Authorization = `Bearer ${res.data.token}`;
                return axios.request(error.config);
            } catch (err) {
                // Force Logout if refreshToken fails
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.setItem('logout-event', Date.now().toString());
                window.location.href = '/signin';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default API;