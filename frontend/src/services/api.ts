import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-leitores.herokuapp.com/api'
});

export default api;