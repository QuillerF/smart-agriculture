<!--
 * @Descripttion: 作业进度比 ---- 旋转饼图
 * @Author: yuanxiongfeng
 * @Date: 2022-11-21 15:49:05
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-31 00:21:04
-->
<template>
  <div class="card">
    <view-title>{{ title }}</view-title>
    <v-chart class="chart" :option="option" />
    <pie-border class="border"></pie-border>
  </div>
</template>

<script setup lang="ts">
import pieBorder from '@/assets/svg/pie-border.svg?component'
import { Option } from '@/model/operation-progress'
import useHttpStore from '@/store/http'
import useSystemStore from '@/store/system'

const props = withDefaults(defineProps<{ target?: 'home' | 'project' }>(), {
  target: 'home'
})
const title = computed(() => (props.target === 'home' ? '作业进度比' : '收割进度'))

const option = ref(Option)

const { axios, api } = useHttpStore()

interface returnItemType {
  finished: number // 完成度
  unfinished: number // 未完成
}
const route = useRoute()
const store = useSystemStore()

const queryWebProgress = async () => {
  try {
    const { data } = await axios.post<{ data: returnItemType }>(api.webProgress, {
      projectId: route.name === 'block' ? store.projectId : '',
      districtId: route.name === 'block' ? '' : store.districtId
    })
    if (data) {
      const { finished, unfinished } = data
      option.value.series[0].data = [
        { name: '未完成', value: unfinished * 100 },
        { name: '已完成', value: finished * 100 }
      ]
    } else {
      option.value.series[0].data = []
    }
  } catch (error) {
    console.log(error)
  }
}
watch(
  () => store.projectId,
  () => {
    queryWebProgress()
  }
)

onMounted(() => {
  queryWebProgress()
})
</script>

<style scoped lang="less">
.card {
  position: relative;
}
.chart {
  height: 266px;
  position: relative;
  z-index: 1;
}
.border {
  position: absolute;
  top: 76.25px;
  left: 112.25px;
  z-index: 0;
  animation: turn 10s infinite;
  animation-timing-function: linear;
}
@keyframes turn {
  100% {
    transform: rotate(360deg);
  }
}
</style>
