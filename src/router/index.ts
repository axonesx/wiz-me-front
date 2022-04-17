import { handleFetchParameters, logout } from '@/services/router.service'
import { store } from '@/store'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import SignUpView from '../views/signUp/SignUpView.vue'
import NotFoundView from '../views/notFound/NotFoundView.vue'
import AccountView from '../views/account/AccountView.vue'

const HOME_PAGE_PATH = '/home'
const LOGIN_PAGE_PATH = '/login'
const SIGN_UP_PAGE_PATH = '/sign-up'
const NOT_FOUND_PAGE_PATH = '/not-found'
const ACCOUNT_PAGE_PATH = '/account'

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
    path: SIGN_UP_PAGE_PATH,
    name: 'sign-up',
    component: SignUpView
  },
  {
    path: ACCOUNT_PAGE_PATH,
    name: 'account',
    component: AccountView
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
  return store.getters.isAuthenticated
}

router.beforeEach(async (to) => {
  await handleFetchParameters()
  if(to.name === 'login' || to.name === 'sign-up') logout()
  if(!isAuthenticated() && to.name !== 'login' && to.name !== 'sign-up') return { name: 'login' }
})

export default router
