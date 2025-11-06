<template>
  <div class="articles">
    <article v-for="(a,i) in items" :key="i" class="article">
      <div class="date">|&nbsp;&nbsp;{{ a.date }}</div>
      <h3 class="title">{{ a.title }}</h3>
      <p class="desc">{{ a.desc }}</p>
      <a class="link" :href="a.href" target="_blank" rel="noreferrer">
        Read article
        <svg aria-hidden="true" viewBox="0 0 320 512" class="chev"><path fill="currentColor" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
      </a>
    </article>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, required: true }
})
</script>

<style scoped>
.articles{ display:flex; flex-direction:column; gap:36px; }
.article{
  background: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: 0 2px 24px rgba(0,0,0,.06);
  border: 1px solid #f1f5f9; /* viền mờ như ảnh */
}
.date{ color:#94a3b8; font-size:12px; margin-bottom:8px; }
.title{ margin:0 0 12px 0; font-size:20px; color:#0f172a; }
.desc{ margin:0 0 14px 0; color:#475569; line-height:1.7; }
.link{
  font-weight:700; color:#10b981; text-decoration:none; display:inline-flex; gap:8px; align-items:center;
}
.chev{ width:10px; height:10px; }
</style>
