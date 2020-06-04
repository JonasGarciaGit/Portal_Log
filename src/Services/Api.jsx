import axios from 'axios';

const api = axios.create({
    baseURL: window.env.API_DOMAIN_ADDR
});

export default api;