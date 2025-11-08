<template>
  <section class="dash">
    <div class="card">
      <h1 class="title">Dashboard</h1>

      <div v-if="auth.user" class="grid">
        <p><b>Name:</b> {{ auth.user.name }}</p>
        <p><b>Email:</b> {{ auth.user.email }}</p>
        <p><b>Role:</b> {{ auth.user.role }}</p>
        <p><b>UserId:</b> {{ auth.user._id }}</p>
      </div>

      <div class="actions">
        <button class="btn" @click="refresh">Refresh</button>
        <button class="btn ghost" @click="logout">Logout</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'

const auth = useAuth()
const router = useRouter()

const refresh = async () => {
  try { await auth.fetchMe() } catch (e) { /* ignore */ }
}

const logout = () => {
  auth.logout()
  router.push('/login')
}

onMounted(async () => {
  // nếu reload trực tiếp vào /dashboard, fetch lại user
  if (!auth.user && auth.token) {
    await refresh()
  }
})
</script>

<style scoped>
.dash { min-height: calc(100dvh - 140px); display: grid; place-items: center; padding: 24px; }
.card {
  width: 100%; max-width: 720px; background: #fff;
  border: 1px solid rgba(0,0,0,.06); border-radius: 16px; padding: 24px;
  box-shadow: 0 10px 24px rgba(0,0,0,.06);
}
.title { margin: 0 0 16px; font-size: 24px; font-weight: 800; }
.grid { display: grid; gap: 8px; }
.actions { margin-top: 16px; display: flex; gap: 10px; }
.btn {
  background: #10b981; color: #fff; border: 0; border-radius: 10px;
  padding: 10px 14px; font-weight: 700; cursor: pointer;
}
.btn.ghost { background: #f3f4f6; color: #111827; }
</style>
