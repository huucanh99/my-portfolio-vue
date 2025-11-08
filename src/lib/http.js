// src/lib/http.js
import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  withCredentials: false,
})

// Helper: set / remove token
export function setAuthToken(token) {
  if (token) http.defaults.headers.common.Authorization = `Bearer ${token}`
  else delete http.defaults.headers.common.Authorization
}
