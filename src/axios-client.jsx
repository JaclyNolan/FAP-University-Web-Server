import axios from "axios";
import BACKEND_SERVER_URL from "./helpers/constants/config";

const axiosClient = axios.create({
  baseURL: `${BACKEND_SERVER_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  const urlWithParams = `${config.url}?${new URLSearchParams(config.params).toString()}`;
  console.log('Request URL with Params:', urlWithParams);
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401) window.location.replace('/login')
  // if (error.response.status === 404) window.location.replace('/404')
  throw error;
})

export default axiosClient
