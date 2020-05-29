import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/elasticOrbitall/v1/logs/esorblog-*'
});

export default api;