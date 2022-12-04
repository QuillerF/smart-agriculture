<!--
 * @Descripttion: 粮食仓储---- 关系图
 * @Author: yuanxiongfeng
 * @Date: 2022-11-21 19:29:09
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-04 19:21:49
-->
<template>
  <div class="card">
    <view-title>粮食仓储监测</view-title>
    <v-chart class="chart" :option="option" />
    <v-chart class="chart-store" :option="optionStore" />
    <img class="border" :src="pieStorage" alt="" />
  </div>
</template>

<script setup lang="ts">
import pieStorage from '@/assets/img/percent-bg.png'
import { Option, optionStore } from '@/model/grain'

const option = ref(Option)
</script>

<style scoped lang="less">
.card {
  position: relative;
}

.chart {
  height: 200px;
  position: relative;
  z-index: 1;
}
.chart-store {
  height: 300px;
  position: relative;
  margin-top: 20px;
  z-index: 1;
}
.border {
  position: absolute;
  transform: translate(-50%);
  top: 104px;
  left: 50%;
  z-index: 0;
}
</style>
