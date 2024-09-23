// src/api.js
import axios from 'axios';

// Configure a URL base da sua API
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // ajuste a URL conforme necessário
});

export default api;
