import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8080/api', // ✅ đường gốc cho mọi request
  timeout: 10000, // ✅ timeout hợp lý (10s)
});

// ✅ Interceptor thêm token Authorization vào header
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http; // ✅ export default đúng cú pháp
