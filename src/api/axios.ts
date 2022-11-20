import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import showCodeMessage from '@/api/code'
import { formatJsonToUrlParams, instanceObject } from '@/utils/format'

import pinia from '@/store'
import useSystemStore from '@/store/system'

const store = useSystemStore(pinia)

const BASE_PREFIX = import.meta.env.VITE_API_BASEURL

// 创建实例
export const axiosInstance: AxiosInstance = axios.create({
  // 前缀
  baseURL: BASE_PREFIX,
  // 超时
  timeout: 1000 * 60 * 60 * 24,
  // 请求头
  headers: {
    post: {
      'Content-Type': 'application/json,charset=utf-8'
    }
  }
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { project_id } = store
    const { pd, user_id, person_id } = store.userInfo
    // 公共参数
    const params = { user_id, pd, person_id, userId: user_id, personId: person_id }
    Object.assign(params, project_id ? { project_id, projectId: project_id } : {})
    // 运维系统需要额外的参数
    if (config.url && config.url.includes('EMS_SaaS_Web')) {
      Object.assign(params, {
        puser: {
          userId: user_id,
          loginDevice: 'PC',
          pd
        }
      })
    }
    // 合并参数
    if (config.headers?.mergeParams !== false) {
      config.method === 'post'
        ? (config.data = Object.assign(params, config.data))
        : (config.params = Object.assign(params, config.params))
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// 响应拦截器
export interface ResponseDataType {
  content: any
  result: string
  message: string
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data
    }
    ElMessage.info(JSON.stringify(response.status))
    return response
  },
  (error: AxiosError) => {
    const { response } = error
    if (response) {
      ElMessage.error(showCodeMessage(response.status))
      return Promise.reject(response.data)
    }
    ElMessage.warning('网络连接异常,请稍后再试!')
    return Promise.reject(error)
  }
)

export const service = {
  get<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.get(url, { params: data })
  },

  post<T = ResponseDataType>(url: string, data?: object): Promise<T> {
    return axiosInstance.post(url, data)
  },

  put<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.put(url, data)
  },

  delete<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.delete(url, data)
  },

  upload: (url: string, file: FormData | File) =>
    axiosInstance.post(url, file, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  download: (url: string, data: instanceObject) => {
    window.location.href = `${BASE_PREFIX}/${url}?${formatJsonToUrlParams(data)}`
  }
}

export default service
