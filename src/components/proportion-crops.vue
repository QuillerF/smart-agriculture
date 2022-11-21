<template>
  <div class="card">
    <view-title>农作物占比分析</view-title>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { OptionItem, OptionItemParam } from '@/model/proportion'

const list = OptionItemParam.map((el) => new OptionItem(el))
const option = ref({
  series: list
})
</script>

<style scoped lang="less">
.chart {
  height: 268px;
}
</style>
