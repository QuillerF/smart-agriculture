<!--
 * @Descripttion: 粮食仓储---- 关系图
 * @Author: yuanxiongfeng
 * @Date: 2022-11-21 19:29:09
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-27 00:52:09
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
import { Option, OptionStore } from '@/model/grain-storage'
import useHttpStore from '@/store/http'

const option = ref(Option)
const optionStore = ref(OptionStore)

const { axios, api } = useHttpStore()

enum statusEnum {
  '正常' = 1,
  '异常' = 0
}

interface returnItemType {
  store5: number
  store1: number
  store2: number
  store3: number
  store4: number
  weight: number
  total: number
}

const countRatio = (weight: number, total: number): number => {
  if (weight > 0 && total > 0) {
    return Number((weight / total).toFixed(1))
  }
  return 0
}

const queryWebStorage = async () => {
  try {
    const { data } = await axios.post<{ data: returnItemType }>(api.webStorage, { provinceId: 17 })
    option.value.series[0].data = [{ name: '存储量', value: data.weight }]
    option.value.series[0].axisLine.lineStyle.color[0][0] = countRatio(data.weight, data.total)
    optionStore.value.series[1].data = optionStore.value.series[1].data.map(
      (el: { nodeStatus: string }, index: number) => {
        el.nodeStatus = statusEnum[data[`store${index + 1}` as keyof returnItemType]]
        return el
      }
    )
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  queryWebStorage()
})
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
