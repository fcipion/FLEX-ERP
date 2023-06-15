import axios from 'axios';
import { url } from './Peticiones';

const serviceToken = localStorage.getItem('serviceToken');
const http = axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${serviceToken}` }
});

export { http };
