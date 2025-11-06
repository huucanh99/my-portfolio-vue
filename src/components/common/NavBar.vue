<!-- src/components/NavBar.vue -->
<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'

const route = useRoute()

// dùng GLOBAL composer để có setLocaleMessage/availableLocales
const {
  t,
  locale,
  availableLocales,
  setLocaleMessage
} = useI18n({ useScope: 'global' })

const links = [
  { to: '/',         key: 'nav.home' },
  { to: '/about',    key: 'nav.about' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/articles', key: 'nav.articles' },
  { to: '/contact',  key: 'nav.contact' },
]

// map loader cho từng locale (lazy-load JSON)
const loaders = {
  en: () => import('@/locales/en.json'),
  zh: () => import('@/locales/zh.json'),
}

onMounted(() => {
  const saved = localStorage.getItem('lang')
  if (saved && saved !== locale.value) {
    // nếu đã có messages cho saved → set ngay, chưa có → nạp rồi set
    changeLang(saved)
  }
})

const changeLang = async (lang) => {
  if (locale.value === lang) return
  // nếu chưa có messages cho lang thì nạp file JSON
  if (!availableLocales.value?.includes?.(lang)) {
    const mod = await loaders[lang]?.()
    if (mod?.default) setLocaleMessage(lang, mod.default)
  }
  locale.value = lang
  localStorage.setItem('lang', lang)
}

const isActive = (to) => {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>

<template>
  <div class="nav-container">
    <nav class="navbar">
      <div id="nav-pill" class="nav-background">
        <ul class="nav-list">
          <li v-for="l in links" :key="l.to" :class="{ active: isActive(l.to) }">
            <RouterLink :to="l.to">{{ t(l.key) }}</RouterLink>
          </li>
        </ul>

        <div class="lang-switch" role="group" aria-label="Language switcher">
          <button :class="{ active: locale === 'en' }" @click="changeLang('en')">EN</button>
          <span class="divider">/</span>
          <button :class="{ active: locale === 'zh' }" @click="changeLang('zh')">中文</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.nav-container{
  position: fixed; top:16px; left:0; right:0;
  display:flex; justify-content:center; z-index:1000;
}
.nav-background{
  background:#fff; border-radius:40px; height:40px;
  padding:0 18px; display:flex; align-items:center; gap:18px;
  border:1px solid rgba(0,0,0,.06);
  box-shadow:0 10px 24px rgba(0,0,0,.06);
}
.nav-list{
  display:flex; gap:24px; list-style:none; margin:0; padding:0;
}
.nav-list a{ text-decoration:none; color:#374151; font-weight:600; padding:6px 2px; }
.active a{ color: var(--primary, #10b981); }

.lang-switch{ display:flex; align-items:center; gap:8px; margin-left:8px; }
.lang-switch .divider{ color:#9ca3af; }
.lang-switch button{
  background:transparent; border:none; cursor:pointer; font-weight:700;
  color:#6b7280; padding:2px 4px; line-height:1;
}
.lang-switch button.active{ color: var(--primary, #10b981); }

@media (max-width:640px){
  .nav-background{ padding:0 12px; gap:12px; }
  .nav-list{ gap:14px; }
}
</style>
