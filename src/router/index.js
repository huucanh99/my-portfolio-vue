// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

// Lazy-load views
const HomePage     = () => import('@/views/HomePage.vue')
const AboutPage    = () => import('@/views/AboutPage.vue')
const ProjectsPage = () => import('@/views/ProjectsPage.vue')
const ArticlesPage = () => import('@/views/ArticlesPage.vue')
const ContactPage  = () => import('@/views/ContactPage.vue')
const LoginPage    = () => import('@/views/LoginPage.vue')
const Dashboard    = () => import('@/views/Dashboard.vue')
const NotFound     = () => import('@/views/NotFound.vue')

const routes = [
  { path: '/',         name: 'Home',     component: HomePage },
  { path: '/about',    name: 'About',    component: AboutPage },
  { path: '/projects', name: 'Projects', component: ProjectsPage },
  { path: '/articles', name: 'Articles', component: ArticlesPage },
  { path: '/contact',  name: 'Contact',  component: ContactPage },

  // Ẩn Nav/Footer
  { path: '/login',     name: 'Login',     component: LoginPage,  meta: { hideChrome: true } },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard,  meta: { auth: true, hideChrome: true } },

  // 404 luôn để cuối
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { hideChrome: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  const auth = useAuth()

  // Chặn trang cần đăng nhập
  if (to.meta.auth && !auth.token) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  // Đã đăng nhập mà vào /login -> đẩy sang /dashboard
  if (to.path === '/login' && auth.token) {
    return { path: '/dashboard' }
  }
})

export default router
