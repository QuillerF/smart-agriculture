<template>
  <div class="card">
    <view-title>价格走势图</view-title>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { Option } from '@/model/line'
const option = ref(Option)
</script>

<style scoped lang="less">
.card {
  background: rgba(3, 19, 60, 0.5);
}
.chart {
  height: 208px;
}
</style>
