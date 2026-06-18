import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import Home from '../views/Home.vue'
import Store from '../views/Store.vue'
import Catch from '../views/Catch.vue'
import AgeConfirmation from '../views/AgeConfirmation.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'Home', component: Home, meta: { requiresAge: true } },
    { path: '/wersdas', name: 'About', component: Home, meta: { requiresAge: true } },
    { path: '/wasmachndie', name: 'Products', component: Home, meta: { requiresAge: true } },
    { path: '/store/:pathMatch(.*)*', name: 'Store', component: Store, meta: { requiresAge: true } },
    { path: '/impressum', name: 'Imprint', component: () => import('../views/Imprint.vue') },
    { path: '/age-confirmation', name: 'AgeConfirmation', component: AgeConfirmation },
    { path: '/too-young', name: 'TooYoung', component: () => import('../views/TooYoung.vue') },
    { path: '/:pathMatch(.*)*', name: '404_error', component: Catch },
  ],
})

router.beforeEach((to) => {
  if (to.name !== 'AgeConfirmation' && Cookies.get('age') === undefined) return { name: 'AgeConfirmation' }
  if (to.matched.some(route => route.meta.requiresAge) && Number(Cookies.get('age')) <= 0) return { name: 'TooYoung' }
  return true
})

export default router
