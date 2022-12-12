<!--
 * @Descripttion: 产量统计/ 预警通知 ---- 动态列表组件
 * @Author: yuanxiongfeng
 * @Date: 2022-11-26 14:49:57
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-13 00:26:41
-->
<template>
  <div class="card">
    <view-title>{{ title }}</view-title>
    <div class="card-list">
      <dv-scroll-board :config="config" style="height: 330px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { tableProjectData, tableData } from '@/model/output'
import useHttpStore from '@/store/http'
import { Ref } from 'vue'
const props = withDefaults(defineProps<{ target?: 'home' | 'project' }>(), {
  target: 'home'
})

const title = computed(() => (props.target === 'home' ? '产量统计' : '预警通知'))

const dataList: Ref<returnItemType[]> = ref([])

const config = reactiveComputed(() => {
  if (props.target === 'home') {
    tableData.data = dataList.value.map((el) => [el.year, el.weight, el.name])
    return tableData
  }
  return tableProjectData
})

const { axios, api } = useHttpStore()

interface returnItemType {
  year: string
  name: string
  weight: number
}

const queryWebProportion = async () => {
  try {
    const { data } = await axios.post<{ data: returnItemType[] }>(api.webCounting)
    dataList.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  queryWebProportion()
})
</script>

<style scoped lang="less">
.card-list {
  padding-top: 20px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(3, 15, 48, 0), rgba(3, 15, 48, 0) 60%, rgba(3, 15, 48, 0.8));
    z-index: 20;
  }
}
:deep(.header) {
  color: #48ece7;
}
:deep(.row-item) {
  color: #cfcfcf;
}
</style>
