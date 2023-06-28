import axios from "axios";
import BACKEND_SERVER_URL from "./helpers/constants/config";

const axiosClient = axios.create({
  baseURL: `${BACKEND_SERVER_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  throw error;
})

export default axiosClient
