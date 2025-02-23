import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Services from '../views/Services.vue'
import Tools from '../views/Tools.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Cart from '../views/Cart.vue'
import MyOrders from '../views/MyOrders.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/services',
      name: 'services',
      component: Services
    },
    {
      path: '/tools',
      name: 'tools',
      component: Tools
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/about',
      name: 'about',
      // 路由级代码分割 - 这会为此路由生成单独的 chunk (About.[hash].js)
      component: () => import('../views/About.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/Blog.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/auth/register',
      name: 'register',
      component: Register,
      meta: { requiresGuest: true }
    },
    {
      path: '/orders',
      name: 'orders',
      component: MyOrders,
      meta: { requiresAuth: true }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  // 需要登录的路由
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth/login')
    return
  }

  // 已登录用户不能访问登录/注册页
  if (to.meta.requiresGuest && isAuthenticated) {
    next('/')
    return
  }

  next()
})

export default router 