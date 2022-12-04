<!--
 * @Descripttion: 首页中国地图
 * @Author: yuanxiongfeng
 * @Date: 2022-11-26 16:16:20
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-04 20:26:36
-->
<template>
  <div class="card">
    <v-chart class="chart" :option="option" @click="handleClick" @zr:dblclick="handleDblclick" />
    <line-view class="line"></line-view>
  </div>
</template>

<script setup lang="ts">
import { Option, geoCoordMap, provinceMap, henanList, initMarkerData } from '@/model/map'
import * as echarts from 'echarts'

const option = ref(Option)

const emit = defineEmits(['open'])

const toLocalMap = async (data: { name: string }) => {
  if (data.name && provinceMap[data.name]) {
    if (!echarts.getMap(provinceMap[data.name])) {
      const json = await import(`@/assets/province/${provinceMap[data.name]}.json`)
      json && echarts.registerMap(provinceMap[data.name], json as any)
    }
    option.value.geo.map = provinceMap[data.name]
    option.value.geo.center = geoCoordMap[data.name]
    option.value.series[0].data = data.name === '河南' ? henanList : []
  }
}

const handleClick = async (data: any) => {
  console.log('clickdata', data)
  if (data.componentSubType === 'scatter') {
    if (provinceMap[data.name]) {
      toLocalMap(data)
      return
    }
    emit('open', data)
  }
  if (data.componentType === 'geo') {
    toLocalMap(data)
  }
}

const handleDblclick = (data: any) => {
  // console.log('clickdata', data)
  option.value.geo.map = 'china'
  option.value.geo.center = geoCoordMap['陕西']
  option.value.series[0].data = initMarkerData
}

const showMarker = () => {
  option.value.series[0].data = henanList
}

const clearMarker = () => {
  option.value.series[0].data = []
}

defineExpose({
  showMarker,
  clearMarker
})
</script>

<style scoped lang="less">
.card {
  position: relative;
}
.chart {
  height: 865px;
}
.line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
