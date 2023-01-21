import axios from 'redaxios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

export default apiClient;
