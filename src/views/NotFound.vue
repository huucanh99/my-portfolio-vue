<template>
  <section class="nf">
    <div class="box">
      <h1>404</h1>
      <p>Trang bạn tìm không tồn tại.</p>
      <router-link to="/" class="home">← Về trang chủ</router-link>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.nf { min-height: calc(100dvh - 140px); display: grid; place-items: center; padding: 24px; }
.box {
  text-align: center; background: #fff;
  border: 1px solid rgba(0,0,0,.06); border-radius: 16px; padding: 32px 28px;
  box-shadow: 0 10px 24px rgba(0,0,0,.06);
}
h1 { font-size: 64px; line-height: 1; margin: 0 0 8px; color: #111827; }
p { color: #6b7280; margin: 0 0 14px; }
.home {
  display: inline-block; padding: 10px 14px; border-radius: 10px;
  background: #10b981; color: #fff; text-decoration: none; font-weight: 700;
}
</style>
