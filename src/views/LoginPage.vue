<template>
  <section class="auth-wrap">
    <div class="card">
      <h1 class="title">Login</h1>

      <form @submit.prevent="onSubmit" class="form">
        <label class="field">
          <span>Email</span>
          <input v-model.trim="email" type="email" placeholder="you@example.com" required />
        </label>

        <label class="field">
          <span>Password</span>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </label>

        <button class="btn" :disabled="loading">
          <span v-if="!loading">Sign in</span>
          <span v-else>Loading…</span>
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <p class="hint">
        (Demo) Bạn có thể đăng ký trước qua API <code>/api/auth/register</code> hoặc tự thêm trang register sau.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    const ok = await auth.login({ email: email.value, password: password.value })
    if (ok) {
      const redirect = route.query.redirect || '/dashboard'
      await router.replace(redirect)                // <- replace để chắc chắn
    } else {
      error.value = 'Login failed'
    }
  } catch (e) {
    // tuỳ server trả về mà lấy message cho hợp
    console.log('❌ login fail:', e?.response?.data || e?.message || e)
    error.value = e?.response?.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-wrap {
  min-height: calc(100dvh - 140px);
  display: grid;
  place-items: center;
  padding: 24px;
}
.card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border: 1px solid rgba(0,0,0,.06);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 24px rgba(0,0,0,.06);
}
.title {
  margin: 0 0 16px;
  font-size: 24px;
  font-weight: 800;
}
.form { display: grid; gap: 14px; }
.field { display: grid; gap: 6px; }
.field span { font-size: 13px; color: #6b7280; }
input {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
}
input:focus { border-color: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,.15); }
.btn {
  margin-top: 6px;
  background: #10b981;
  color: #fff;
  border: 0;
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 700;
  cursor: pointer;
}
.btn[disabled] { opacity: .7; cursor: default; }
.error { color: #ef4444; font-size: 13px; margin-top: 6px; }
.hint { color: #6b7280; font-size: 12px; margin-top: 14px; }
code { background: #f3f4f6; padding: 2px 6px; border-radius: 6px; }
</style>
