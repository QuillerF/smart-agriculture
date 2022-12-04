<!--
 * @Descripttion: 小麦玉米价格走势图---- 折线图
 * @Author: yuanxiongfeng
 * @Date: 2022-11-26 22:04:24
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-04 20:19:29
-->
<template>
  <div class="card">
    <view-title>
      <span>价格走势图</span>
      <template #right>
        <div class="right">
          <section :select="select === '小麦'" class="right-item" @click="select = '小麦'">
            <point-light-svg></point-light-svg>
            <span>小麦</span>
          </section>
          <section :select="select === '玉米'" class="right-item" @click="select = '玉米'">
            <point-light-svg></point-light-svg>
            <span>玉米</span>
          </section>
        </div>
      </template>
    </view-title>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { Option, data1, data2 } from '@/model/line'
import pointLightSvg from '@/assets/svg/point-light.svg?component'

const option = ref(Option)

const select = ref('小麦')

watch(select, (val) => {
  if (val === '小麦') {
    option.value.series[0].data = data1
    return
  }
  option.value.series[0].data = data2
})
</script>

<style scoped lang="less">
.card {
  background: rgba(3, 19, 60, 0.5);
}
.chart {
  height: 208px;
}
.right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  color: #eff0f1;
  padding-right: 20px;
  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 5px;
    opacity: 0.6;
    &[select='true'] {
      opacity: 1;
    }
  }
}
</style>
