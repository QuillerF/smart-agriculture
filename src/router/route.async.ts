// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '',
      icon: ''
    },
    component: () => import('@/views/home/index.vue')
  }
]

export default asyncRoutes
