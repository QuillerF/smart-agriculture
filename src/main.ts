import { createApp } from 'vue'
import App from './App.vue'

// vue router
import router from '@/router/index'

// pinia
import store from '@/store'

import dataV from '@kjgl77/datav-vue3'

import '@/assets/styles/index.less'

import './style.css'

import ECharts from 'vue-echarts'
import 'echarts'
import 'echarts-liquidfill'

const app = createApp(App)

app.component('v-chart', ECharts)
app.use(router).use(store).use(dataV)

app.mount('#app')
