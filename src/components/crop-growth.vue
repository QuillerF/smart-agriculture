<template>
  <div class="card">
    <view-title>当前作物生长—成熟期</view-title>
    <div class="chart">
      <img class="border" :src="botanyImg" alt="" />
      <section class="chart-item">株高： 280cm</section>
      <section class="chart-item top2">茎粗： 3.5cm</section>
      <section class="chart-item top3">叶片数： 18</section>
      <section class="chart-item right">湿度： 71.3%</section>
      <section class="chart-item right top2">温度： 20℃</section>
    </div>
  </div>
</template>

<script setup lang="ts">
import botanyImg from '@/assets/img/botany.png'
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.card {
  position: relative;
}

.chart {
  height: 520px;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  &-item {
    position: absolute;
    top: 110px;
    left: 27px;
    color: #c8dbf4;
    font-size: 15px;
    line-height: 25px;
    border-bottom: 1px solid #2795fa;
    padding: 0 10px;
    &::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      width: 20px;
      height: 1px;
      background: #2795fa;
      transform: rotate(210deg);
      transform-origin: 100% 1px;
    }
  }
  .top2 {
    top: 210px;
  }
  .top3 {
    top: 310px;
  }
  .right {
    right: 20px;
    left: unset;
    &::after {
      left: 0;
      transform: rotate(150deg);
      transform-origin: 0 1px;
    }
  }
}
</style>
