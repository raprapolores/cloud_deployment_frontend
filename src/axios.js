import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cloud-app-b4haceamhabcb2gt.canadacentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;