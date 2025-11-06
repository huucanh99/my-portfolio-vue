<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <ul class="links">
        <li><RouterLink to="/">{{ t('nav.home') }}</RouterLink></li>
        <li><RouterLink to="/about">{{ t('nav.about') }}</RouterLink></li>
        <li><RouterLink to="/projects">{{ t('nav.projects') }}</RouterLink></li>
        <li><RouterLink to="/articles">{{ t('nav.articles') }}</RouterLink></li>
        <li><RouterLink to="/contact">{{ t('nav.contact') }}</RouterLink></li>
      </ul>
      <div class="copy">© {{ year }} {{ t('footer.rights') }}</div>
    </div>
  </footer>
</template>

<style scoped>
.footer{
  margin-top: 56px;
  border-top: 1px solid #f3f4f6;
  padding: 22px 0;
}
.footer-inner{
  max-width: 1000px; margin: 0 auto; padding: 0 16px;
  display:flex; align-items:center; justify-content:space-between;
  gap: 12px;
}
.links{
  display:flex; gap:18px; list-style:none; margin:0; padding:0;
}
.links a{ color:#6b7280; text-decoration:none; font-weight:600; }
.links a:hover{ color:#374151; }
.copy{ color:#9ca3af; font-size:14px; }
@media (max-width:640px){
  .footer-inner{ flex-direction:column; }
}
</style>
