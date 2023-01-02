<!--
 * @Descripttion: 产量统计/ 预警通知 ---- 动态列表组件
 * @Author: yuanxiongfeng
 * @Date: 2022-11-26 14:49:57
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2023-01-03 02:17:13
-->
<template>
  <div class="card">
    <view-title>{{ title }}</view-title>
    <div class="card-list">
      <dv-scroll-board :config="config" style="height: 330px" @click="toManagePage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { tableProjectData, tableData } from '@/model/output-statistics'
import useHttpStore from '@/store/http'
import useSystemStore from '@/store/system'
import { Ref } from 'vue'
const props = withDefaults(defineProps<{ target?: 'home' | 'project' }>(), {
  target: 'home'
})

const title = computed(() => (props.target === 'home' ? '产量统计' : '预警通知'))

const dataList: Ref<returnItemType[]> = ref([])

const dataListWarning: Ref<returnWarningType[]> = ref([])

const toManagePage = (data: any) => {
  // console.log('data', data)
  if (data.columnIndex === 3) {
    window.open(`${import.meta.env.VITE_MANAGE_HOST}/zhny/deviceWarning?deviceType=camera&status=0`)
  }
}

const config = reactiveComputed(() => {
  if (props.target === 'home') {
    tableData.data = dataList.value.map((el) => [el.year, el.weight, el.name])
    return tableData
  }
  tableProjectData.data = dataListWarning.value.map((el) => [
    el.time,
    el.type,
    el.district,
    '<span style="color:#42b8b8;cursor:pointer;">查看</span>'
  ])
  return tableProjectData
})

const { axios, api } = useHttpStore()

interface returnItemType {
  year: string
  name: string
  weight: number
}

interface returnWarningType {
  deviceType: string
  district: string
  id: string
  time: string
  type: string
}

const queryWebProportion = async () => {
  try {
    const { data } = await axios.post<{ data: returnItemType[] }>(api.webCounting)
    dataList.value = data
  } catch (error) {
    console.log(error)
  }
}

const store = useSystemStore()

const queryWebWarning = async () => {
  try {
    const { data } = await axios.post<{ data: returnWarningType[] }>(api.webWarning, {
      projectId: store.projectId
    })
    dataListWarning.value = data.map((el) => {
      el.time = dayjs(el.time).format('YYYY-MM-DD HH:mm:ss')
      return el
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  if (props.target === 'home') {
    queryWebProportion()
  } else {
    queryWebWarning()
  }
})
</script>

<style scoped lang="less">
.card-list {
  padding-top: 20px;
  position: relative;
  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   background: linear-gradient(to bottom, rgba(3, 15, 48, 0), rgba(3, 15, 48, 0) 60%, rgba(3, 15, 48, 0.8));
  //   z-index: 20;
  // }
}
:deep(.header) {
  color: #48ece7;
}
:deep(.row-item) {
  color: #cfcfcf;
}
</style>
