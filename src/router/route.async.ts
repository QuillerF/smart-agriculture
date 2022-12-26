// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '',
      icon: ''
    },
    component: () => import('@/views/home/home.vue')
  },
  {
    path: '/project',
    name: 'project',
    meta: {
      title: '',
      icon: ''
    },
    component: () => import('@/views/project/index.vue')
  },
  {
    path: '/block',
    name: 'block',
    meta: {
      title: '',
      icon: ''
    },
    component: () => import('@/views/block/index.vue')
  }
]

export default asyncRoutes
