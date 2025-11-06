<template>
  <div id="app">
    <NavBar />
    <main class="app-main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from '@/components/common/NavBar.vue'
import Footer from '@/components/common/AppFooter.vue'
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
.app-main{
  /* chừa chỗ cho NavBar fixed trên cùng */
  /* padding-top: 88px; khớp NAV_TOP(16) + NAV_H(40) + GAP(12) + buffer */
}
</style>
