import axios from 'redaxios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default apiClient;
