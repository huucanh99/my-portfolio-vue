<!-- <script setup>
import { ref } from 'vue'
import { loginApi } from '../api/auth'
import { setAuthToken } from '../lib/http'

const email = ref('')
const password = ref('')
const message = ref('')

const handleLogin = async () => {
  try {
    const res = await loginApi(email.value, password.value)
    message.value = res.message
    if (res.token) {
      localStorage.setItem('token', res.token)
      setAuthToken(res.token)
    }
  } catch (e) {
    message.value = e.response?.data?.message || 'Login failed'
  }
}
</script>

<template>
  <div class="login">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleLogin">Login</button>
    <p>{{ message }}</p>
  </div>
</template> -->
