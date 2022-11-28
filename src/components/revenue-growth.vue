<template>
  <div class="card">
    <view-title>{{ title }}</view-title>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { Option, projectOption } from '@/model/revenue'
const props = withDefaults(defineProps<{ target: 'home' | 'project' }>(), {
  target: 'home'
})
const title = computed(() => (props.target === 'home' ? '收入增长比' : '价格走势'))
const option = computed(() => {
  if (props.target === 'home') {
    return Option
  }
  return projectOption
})
</script>

<style scoped lang="less">
.chart {
  height: 290px;
}
</style>
