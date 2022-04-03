import { handleFetchParameters } from '@/services/router.service'
import { store } from '@/store'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import NotFoundView from '../views/notFound/NotFoundView.vue'

const HOME_PAGE_PATH = '/home'
const LOGIN_PAGE_PATH = '/login'
const NOT_FOUND_PAGE_PATH = '/not-found'

const routes: Array<RouteRecordRaw> = [
  {
    path: HOME_PAGE_PATH,
    name: 'home',
    component: HomeView
  },
  {
    path: '',
    redirect: {
      name: 'home',
    }
  },
  {
    path: '/',
    redirect: {
      name: 'home',
    }
  },
  {
    path: LOGIN_PAGE_PATH,
    name: 'login',
    component: LoginView
  },
  {
    path: NOT_FOUND_PAGE_PATH,
    name: 'not-found',
    component: NotFoundView
  },
  {
    path: '/:catchAll(.*)',
    redirect: {
      name: 'not-found',
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const isAuthenticated = () => {
  console.log(store.getters.isAuthenticated)
  return store.getters.isAuthenticated
}

router.beforeEach(async (to) => {
  await handleFetchParameters()
  if ( !isAuthenticated() && to.name !== 'login'){
    return { name: 'login' }
  }
})

export default router
