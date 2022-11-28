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
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/project',
    name: 'project',
    meta: {
      title: '',
      icon: ''
    },
    component: () => import('@/views/project/index.vue')
  }
]

export default asyncRoutes
