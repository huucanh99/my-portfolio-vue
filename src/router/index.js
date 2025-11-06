import { createRouter, createWebHistory } from 'vue-router'

// Lưu ý: đúng tên file & phân biệt hoa/thường
import HomePage     from '@/views/HomePage.vue'
import AboutPage    from '@/views/AboutPage.vue'
import ProjectsPage from '@/views/ProjectsPage.vue'
import ArticlesPage from '@/views/ArticlesPage.vue'
import ContactPage  from '@/views/ContactPage.vue'

const routes = [
  { path: '/',         name: 'Home',     component: HomePage },
  { path: '/about',    name: 'About',    component: AboutPage },
  { path: '/projects', name: 'Projects', component: ProjectsPage },
  { path: '/articles', name: 'Articles', component: ArticlesPage },
  { path: '/contact',  name: 'Contact',  component: ContactPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router
