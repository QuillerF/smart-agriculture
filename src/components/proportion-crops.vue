<!--
 * @Descripttion: 农作物占比分析/种植统计 4个水球图
 * @Author: yuanxiongfeng
 * @Date: 2022-11-21 01:40:33
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-04 19:18:59
-->
<template>
  <div class="card">
    <view-title>{{ title }}</view-title>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { OptionItem, OptionItemParam, OptionItemProjectParam } from '@/model/proportion'

const props = withDefaults(defineProps<{ target?: 'home' | 'project' }>(), {
  target: 'home'
})

const title = computed(() => (props.target === 'home' ? '农作物占比分析' : '种植统计（亩）'))

const list = computed(() => {
  if (props.target === 'home') {
    return OptionItemParam.map((el) => new OptionItem(el))
  }
  return OptionItemProjectParam.map((el: any) => new OptionItem(el))
})

const option = ref({
  series: list.value
})
</script>

<style scoped lang="less">
.chart {
  height: 268px;
}
</style>
