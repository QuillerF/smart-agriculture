<!--
 * @Descripttion: 当前作物生长
 * @Author: yuanxiongfeng
 * @Date: 2022-11-28 11:52:25
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-27 01:39:24
-->
<template>
  <div class="card">
    <view-title>当前作物生长—{{ growthData.growth_name }}</view-title>
    <div class="chart">
      <img class="border" :src="botanyImg" alt="" />
      <section class="chart-item">株高： {{ growthData.height || '--' }}cm</section>
      <section class="chart-item top2">茎粗： {{ growthData.diameter || '--' }}cm</section>
      <section class="chart-item top3">叶片数： {{ growthData.pieces || '--' }}</section>
      <section class="chart-item right">湿度： 71.3%</section>
      <section class="chart-item right top2">温度： 20℃</section>
    </div>
  </div>
</template>

<script setup lang="ts">
import botanyImg from '@/assets/img/botany.png'
import useHttpStore from '@/store/http'
import useSystemStore from '@/store/system'
const store = useSystemStore()
const { axios, api } = useHttpStore()

const growthData = ref({} as returnType)

interface returnType {
  growth_name: string
  height: string
  diameter: string
  pieces: string
  crop: string
  spike_width: string
  baldtip_length: string
}

const queryWebStorage = async () => {
  try {
    const { data } = await axios.post<{ data: returnType }>(api.webGrowth, { projectId: store.projectId })
    growthData.value = data
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  queryWebStorage()
})
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
