import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../components/Gallery.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../components/ChatComponent.vue')
    },
    {
      path: '/metrics',
      name: 'metrics',
      component: () => import('../components/Metrics.vue') // Добавил Metrics
    }
  ]
})

export default router
