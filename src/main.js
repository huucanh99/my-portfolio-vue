import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18nInstance } from './i18n'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMailBulk, faLink, faChevronRight, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub, faStackOverflow, faInstagram } from '@fortawesome/free-brands-svg-icons'

library.add(faMailBulk, faLink, faChevronRight, faBriefcase, faTwitter, faGithub, faStackOverflow, faInstagram)

async function bootstrap () {
  const i18n = await createI18nInstance()
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(i18n)
  app.component('font-awesome-icon', FontAwesomeIcon)
  app.config.globalProperties.$i18n = i18n
  app.mount('#app')
}
bootstrap()
