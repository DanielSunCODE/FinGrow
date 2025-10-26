import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://goalflow-backend.onrender.com',
    timeout: 3000,
});