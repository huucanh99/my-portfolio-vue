// // src/stores/auth.js (Pinia)
// import { defineStore } from 'pinia'
// import  http  from '@/api/http'

// export const useAuth = defineStore('auth', {
//   state: () => ({ user: null, token: localStorage.getItem('token') || '' }),
//   actions: {
//     async login(payload) {
//       const { data } = await http.post('/auth/login', payload)
//       if (data.token) {
//         this.token = data.token
//         this.user = data.user
//         localStorage.setItem('token', data.token)
//       }
//       return data
//     },
//     logout() {
//       this.user = null
//       this.token = ''
//       localStorage.removeItem('token')
//     },
//     async fetchMe() {
//       const { data } = await http.get('/user/me')
//       this.user = data.user
//     }
//   }
// })
// src/stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:8080/api'
})
http.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export const useAuth = defineStore('auth', {
  state: () => ({ user: null, token: localStorage.getItem('token') || '' }),
  actions: {
    async login({ email, password }) {
      const { data } = await http.post('/auth/login', { email, password })
      // BE trả { token, user, ... }
      this.token = data.token || ''
      this.user  = data.user  || null
      if (this.token) localStorage.setItem('token', this.token)
      return true                      // <- quan trọng: trả về thành công
    },
    logout() {
      this.user = null
      this.token = ''
      localStorage.removeItem('token')
    }
  }
})
