// src/stores/auth.js (Pinia)
import { defineStore } from 'pinia'
import  http  from '@/api/http' // giả sử bạn export named { http }

export const useAuth = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || ''
  }),

  actions: {
    async login(payload) {
      try {
        // nếu http.baseURL = 'http://localhost:8080/api' -> path bỏ /api ở đầu
        const { data } = await http.post('/auth/login', payload)
        if (data?.token) {
          this.token = data.token
          this.user  = data.user || null
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(this.user))
        }
        return data
      } catch (e) {
        // bung message hợp lý cho UI
        const msg = e?.response?.data?.message || 'Login failed'
        throw new Error(msg)
      }
    },

    async fetchMe() {
      if (!this.token) return
      try {
        const { data } = await http.get('/user/me') // KHÔNG /api ở đây
        this.user = data?.user || null
        localStorage.setItem('user', JSON.stringify(this.user))
        return data
      } catch (e) {
        // nếu token hết hạn → logout
        this.logout()
        throw e
      }
    },

    logout() {
      this.user = null
      this.token = ''
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})
