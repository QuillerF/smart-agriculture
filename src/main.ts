import { createApp } from 'vue'
import App from './App.vue'

// 导入axios模块
import axios from '@/api/axios'

// 导出 api
import api from '@/api/api'

// vue router
import router from '@/router/index'

// pinia
import store from '@/store'

import '@/assets/styles/index.less'

import './style.css'

const app = createApp(App)

app.use(router).use(store)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$api = api

app.mount('#app')
