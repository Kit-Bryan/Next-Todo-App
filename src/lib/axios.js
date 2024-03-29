import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
})


api.interceptors.request.use(async (config) => {
    // If this is a non-get request, get the CSRF cookie
    if (config.method !== 'get') {
        try {
            // Send a GET request to the /sanctum/csrf-cookie endpoint
            await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/sanctum/csrf-cookie');
        } catch (err) {
            console.error('CSRF cookie has not been set: ', err);
        }
    }
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api
