import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import exceptionRoutes from '@/router/route.exception'
import asyncRoutes from '@/router/route.async'
import commonRoutes from '@/router/route.common'

import axios from '@/api/axios'
import api from '@/api/api'

import pinia from '@/store'
import useSystemStore from '@/store/system'

const store = useSystemStore(pinia)

const routes: RouteRecordRaw[] = [
  // 无鉴权的业务路由 ex:登录
  ...commonRoutes,
  // 带鉴权的业务路由
  ...asyncRoutes,
  // 异常页必须放在路由匹配规则的最后
  ...exceptionRoutes
]

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes
})

/**
 * @description: 全局路由前置守卫，在进入路由前触发，导航在所有守卫 resolve 完之前一直处于等待中。
 * @param {RouteLocationNormalized} to  即将要进入的目标
 * @param {RouteLocationNormalizedLoaded} from  当前导航正在离开的路由
 * @return {*}
 */
router.beforeEach(async (to, from, next) => {
  if (to.meta.isException) {
    return next()
  }
  // 设置页面标题
  document.title = (to.meta.title as string) || import.meta.env.VITE_APP_TITLE
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  const { user_id } = store.userInfo
  if (user_id) {
    return next()
  }
  const { loginName, project_id = '' } = to.query
  if (project_id) {
    store.changeProjectId(project_id as string)
  }
  if (!loginName) {
    // return next('/401')
  }
  return next()
  try {
    const { result, content } = await axios.post(api.login, {
      loginName,
      loginDevice: 'PC'
    })
    // 登录成功
    if (result === 'success' && content.length) {
      const [userInfo] = content
      userInfo.user_id = userInfo.userId
      store.changeUserInfo(userInfo)
    } else {
      console.log('登录失败！')
    }
  } catch (error) {
    next('/401')
  }
  return next()
})

router.afterEach((to, from) => {
  console.log('全局路由后置守卫：to,from\n', to, from)
  NProgress.done()
  // 需要添加面包屑信息
  if (to.meta?.title) {
    const { meta, params, path, query } = to
    store.changeBreadcrumb({ name: meta.title, params, query, path })
  }
})

export default router
