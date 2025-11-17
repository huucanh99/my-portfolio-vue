<template>
  <div id="app">
    <NavBar v-if="showChrome" />
    <main :class="['app-main', { 'with-nav': showChrome }]">
      <router-view />
    </main>
    <Footer v-if="showChrome" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/common/NavBar.vue'
import Footer from '@/components/common/AppFooter.vue'

const route = useRoute()
// Ẩn Nav/Footer khi meta.hideChrome = true (ví dụ: /login, /dashboard)
const showChrome = computed(() => !route.meta?.hideChrome)
</script>

<style>
:root{
  --primary: #10b981;
  --text: #111827;
  --bg: #ffffff;
}
html, body, #app { height: 100%; }
body {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif;
  color: var(--text);
  background: var(--bg);
}
/* Nếu có NavBar fixed thì chừa đệm, còn khi ẩn Nav thì bỏ đệm */
.app-main.with-nav { /* padding-top: 88px; */ }
</style>
