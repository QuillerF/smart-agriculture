<template>
  <div class="card">
    <view-title>收入增长比</view-title>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { Option } from '@/model/revenue'
const option = ref(Option)
</script>

<style scoped lang="less">
.chart {
  height: 290px;
}
</style>
