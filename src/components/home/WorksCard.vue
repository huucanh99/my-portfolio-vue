<template>
  <div class="card">
    <div class="head">
      <svg viewBox="0 0 512 512" class="icon"><path fill="currentColor" d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"/></svg>
      <div class="title">Work</div>
    </div>

    <div class="list">
      <div class="row" v-for="(w,i) in items" :key="i">
        <img :src="w.logo" :alt="w.company" class="logo" />
        <div class="meta">
          <div class="company">{{ w.company }}</div>
          <div class="role">{{ w.role }}</div>
        </div>
        <div class="time">{{ w.time }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true }
})
</script>

<style scoped>
.card{
  background:#fff;
  border-radius: 20px;
  padding: 26px 26px 10px;
  border: 1px solid #eef2f7;
  box-shadow: 0 2px 24px rgba(0,0,0,.05);
}
.head{ display:flex; align-items:center; gap:12px; }
.icon{ width:18px; height:18px; color:#94a3b8; }
.title{ font-size:14px; font-weight:700; color:#334155; }
.list{ margin-top:28px; display:flex; flex-direction:column; gap:22px; }
.row{ display:flex; align-items:center; gap:14px; position:relative; }
.logo{
  width:36px; height:36px; border-radius:50%;
  outline:6px solid #fff; box-shadow:0 7px 10px rgba(0,0,0,.12);
  object-fit:cover;
}
.meta{ display:grid; }
.company{ font-weight:700; color:#0f172a; }
.role{ font-size:12px; color:#64748b; }
.time{ margin-left:auto; font-size:12px; color:#94a3b8; }
</style>
