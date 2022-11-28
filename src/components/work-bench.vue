<template>
  <div class="card">
    <view-title>工作台</view-title>
    <div class="chart">
      <section class="chart-item">
        <img :src="waterImg" alt="" />
        <div>灌溉管理</div>
      </section>
      <section class="chart-item">
        <img :src="monitorImg" alt="" />
        <div>监控管理</div>
      </section>
      <section class="chart-item">
        <img :src="fourImg" alt="" />
        <div>四情管理</div>
      </section>
      <section class="chart-item">
        <img :src="centerImg" alt="" />
        <div>控制中心</div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import centerImg from '@/assets/img/manage-center.png'
import fourImg from '@/assets/img/manage-four.png'
import monitorImg from '@/assets/img/manage-monitor.png'
import waterImg from '@/assets/img/manage-water.png'
</script>

<style scoped lang="less">
.card {
  background: rgba(3, 19, 60, 0.5);
}
.chart {
  height: 208px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 96px;
  align-items: center;
  justify-content: center;
  &-item {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
    align-items: center;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>
