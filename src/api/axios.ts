import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import showCodeMessage from '@/api/code'
import { formatJsonToUrlParams, instanceObject } from '@/utils/format'

import pinia from '@/store'
import useSystemStore from '@/store/system'
import qs from 'qs'
import Cookies from 'js-cookie'

const store = useSystemStore(pinia)

const BASE_PREFIX = import.meta.env.VITE_API_BASEURL

// 创建实例
export const axiosInstance: AxiosInstance = axios.create({
  // 前缀
  baseURL: BASE_PREFIX,
  withCredentials: true,
  // 超时
  timeout: 1000 * 60 * 60 * 24,
  // 请求头
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { districtId, isProject } = store
    const { userId } = store.userInfo
    // 公共参数
    const params = { userId, districtId: isProject ? districtId : '' }
    // 合并参数
    if (config.headers?.mergeParams !== false) {
      config.method === 'post'
        ? (config.data = `data=${JSON.stringify(Object.assign(params, config.data))}`)
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
  get<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.get(url, { ...config, params: data })
  },

  post<T = ResponseDataType>(url: string, data?: object, query?: object): Promise<T> {
    return axiosInstance.post(`${url}${query ? '?' : ''}${qs.stringify(query)}`, data)
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
