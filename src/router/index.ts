import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginView },

    { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
    {
      path: '/documentos',
      name: 'documentos',
      component: () => import('../views/DocumentosView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('../views/ErrorView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Encriptados',
      name: 'Encriptados',
      component: () => import('../views/ErrorView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Medicina',
      name: 'Medicina',
      component: () => import('../views/ErrorView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Satelites',
      name: 'Satelites',
      component: () => import('../views/ErrorView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Mapeados',
      name: 'Mapeados',
      component: () => import('../views/ErrorView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Alejandria',
      name: 'Alejandria',
      component: () => import('../views/AlejandriaView.vue'),
      meta: { requiresAuth: true }
    },
    { path: '/:pathMatch(.*)*', redirect: '/login' }
  ]
})

// 🔒 guardia del umbral
router.beforeEach((to) => {
  const isAuthed = localStorage.getItem('auth.v1') === '1'
  if (!isAuthed && to.path !== '/login') {
    return { name: 'login', query: { next: to.fullPath } }
  }
  if (isAuthed && to.name === 'login') {
    return { name: 'home' }
  }
})

export default router
