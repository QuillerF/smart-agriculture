<template>
  <div class="card">
    <v-chart class="chart" :option="option" @click="openProjectList" />
    <line-view class="line"></line-view>
  </div>
</template>

<script setup lang="ts">
import { Option } from '@/model/map'

const option = ref(Option)

const emit = defineEmits(['open'])

const openProjectList = (data: any) => {
  console.log('clickdata', data)
  if (data.componentSubType === 'scatter') {
    emit('open', data)
  }
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
