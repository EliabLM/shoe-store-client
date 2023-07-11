import axios from 'axios';

// Development
const baseURL = 'http://localhost:4000/api/v1';

// Production
// const baseURL = 'https://shoe-store-server.fly.dev/api/v1';

export const axiosInstance = axios.create({
  baseURL,
});
