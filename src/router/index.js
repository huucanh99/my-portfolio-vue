// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

// lazy-load tất cả các view
const HomePage     = () => import('@/views/HomePage.vue')
const AboutPage    = () => import('@/views/AboutPage.vue')
const ProjectsPage = () => import('@/views/ProjectsPage.vue')
const ArticlesPage = () => import('@/views/ArticlesPage.vue')
const ContactPage  = () => import('@/views/ContactPage.vue')
const Dashboard    = () => import('@/views/Dashboard.vue')
const LoginPage    = () => import('@/views/LoginPage.vue')
const NotFound     = () => import('@/views/NotFound.vue') // tạo file đơn giản nếu chưa có

const routes = [
  { path: '/',         name: 'Home',     component: HomePage },
  { path: '/about',    name: 'About',    component: AboutPage },
  { path: '/projects', name: 'Projects', component: ProjectsPage },
  { path: '/articles', name: 'Articles', component: ArticlesPage },
  { path: '/contact',  name: 'Contact',  component: ContactPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // trang cần đăng nhập
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { auth: true } },

  // auth pages
  { path: '/login', name: 'Login', component: LoginPage },

  // 404
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // luôn scroll lên đầu khi điều hướng
  scrollBehavior() {
    return { top: 0 }
  }
})


router.beforeEach((to) => {
  const auth = useAuth()

  // Nếu vào route cần login mà chưa có token -> chuyển về /login
  if (to.meta.auth && !auth.token) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  // Nếu đã login mà vẫn vào /login -> chuyển thẳng /dashboard
  if (to.path === '/login' && auth.token) {
    return { path: '/dashboard' }
  }
})
export default router
