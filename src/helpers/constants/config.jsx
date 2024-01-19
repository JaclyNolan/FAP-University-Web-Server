// config.js
const BACKEND_SERVER_URL = import.meta.env.VITE_API_URL || 'http://localhost:80'; // Replace with your actual backend server URL
console.log(import.meta.env.VITE_API_URL)
export default BACKEND_SERVER_URL;
