import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue') // уже работает
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: defineAsyncComponent(() => import('../components/Gallery.vue'))
    },
    {
      path: '/chat',
      name: 'chat',
      component: defineAsyncComponent(() => import('../components/ChatComponent.vue'))
    },
    {
      path: '/metrics',
      name: 'metrics',
      component: defineAsyncComponent(() => import('../components/Metrics.vue'))
    }
  ]
})

export default router
