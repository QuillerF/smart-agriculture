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

const handleClick = async (data: any) => {
  console.log('clickdata', data)
  if (data.componentSubType === 'scatter') {
    emit('open', data)
  }
  if (data.componentType === 'geo') {
    const json = await import(`@/assets/province/${provinceMap[data.name]}.json`)
    if (json) {
      if (!echarts.getMap(provinceMap[data.name])) {
        echarts.registerMap(provinceMap[data.name], json as any)
      }
      option.value.geo.map = provinceMap[data.name]
      // option.value.geo.center = geoCoordMap[data.name]
      option.value.series[0].data = data.name === '河南' ? henanList : []
    }
  }
}

const handleDblclick = (data: any) => {
  // console.log('clickdata', data)
  option.value.geo.map = 'china'
  option.value.series[0].data = initMarkerData
}
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
