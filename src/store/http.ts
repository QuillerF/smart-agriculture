import { defineStore } from 'pinia'
// 导入axios模块
import axios from '@/api/axios'
// 导出 api
import api from '@/api/api'

const useHttpStore = defineStore({
  id: 'http',
  state: () => ({
    axios,
    api
  })
})

export default useHttpStore
