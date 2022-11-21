<template>
  <div class="card">
    <view-title>作业进度比</view-title>
    <v-chart class="chart" :option="option" />
    <pie-border class="border"></pie-border>
  </div>
</template>

<script setup lang="ts">
import pieBorder from '@/assets/svg/pie-border.svg?component'
import { Option } from '@/model/operation'
const option = ref(Option)
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
