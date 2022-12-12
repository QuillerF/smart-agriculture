<!--
 * @Descripttion: 收入增长比, 价格走势, 叠加条形图
 * @Author: yuanxiongfeng
 * @Date: 2022-11-21 13:28:07
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-13 01:37:13
-->
<template>
  <div class="card">
    <view-title>{{ title }}</view-title>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { Option, ProjectOption } from '@/model/revenue'
import useHttpStore from '@/store/http'
const props = withDefaults(defineProps<{ target?: 'home' | 'project' }>(), {
  target: 'home'
})
const title = computed(() => (props.target === 'home' ? '收入增长比' : '价格走势'))

const option = ref(Option)

const { axios, api } = useHttpStore()

interface returnItemType {
  riceThisYear: number // 水稻今年增长比
  cornLastYear: number // 玉米去年增长比
  riceLastYear: number // 水稻去年增长比
  wheatThisYear: number // 小麦今年增长比
  wheatLastYear: number // 小麦去年增长比
  otherLastYear: number // 其他去年增长比
  otherThisYear: number // 其他今年增长比
  cornThisYear: number
}

const queryWebIncomeRatio = async () => {
  try {
    const { data } = await axios.post<{ data: returnItemType }>(api.webIncomeRatio)
    // const options = props.target === 'home' ? Option : ProjectOption
    const { wheatLastYear, cornLastYear, riceLastYear, otherLastYear } = data
    const { wheatThisYear, cornThisYear, riceThisYear, otherThisYear } = data
    option.value.series[0].data = [wheatLastYear, cornLastYear, riceLastYear, otherLastYear].map((el) => el ?? null)
    option.value.series[1].data = [wheatThisYear, cornThisYear, riceThisYear, otherThisYear].map((el) => el ?? null)
    // option.value = options
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  queryWebIncomeRatio()
})
</script>

<style scoped lang="less">
.chart {
  height: 290px;
}
</style>
