<!--
 * @Descripttion: 收入增长比, 地块价格走势, 叠加条形图
 * @Author: yuanxiongfeng
 * @Date: 2022-11-21 13:28:07
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2023-01-02 22:30:20
-->
<template>
  <div class="card">
    <view-title>{{ title }}</view-title>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { Option, ProjectOption, CropTypeEnum } from '@/model/revenue-growth'
import useHttpStore from '@/store/http'
import useSystemStore from '@/store/system'
import { cloneDeep, uniq, isNil } from 'lodash'
const props = withDefaults(defineProps<{ target?: 'home' | 'project' }>(), {
  target: 'home'
})
const title = computed(() => (props.target === 'home' ? '收入增长比' : '价格走势'))

const option = ref({} as any)

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
  option.value = Option
  try {
    const { data } = await axios.post<{ data: returnItemType }>(api.webIncomeRatio)
    const { wheatLastYear, cornLastYear, riceLastYear, otherLastYear } = data
    const { wheatThisYear, cornThisYear, riceThisYear, otherThisYear } = data
    option.value.series[0].data = [wheatLastYear, cornLastYear, riceLastYear, otherLastYear].map((el) => ({
      value: el ?? null,
      label: {
        position: el > 0 || isNil(el) ? 'top' : 'bottom'
      }
    }))
    option.value.series[1].data = [wheatThisYear, cornThisYear, riceThisYear, otherThisYear].map((el) => ({
      value: el ?? null,
      label: {
        position: el >= 0 || isNil(el) ? 'top' : 'bottom'
      }
    }))
  } catch (error) {
    console.log(error)
  }
}

interface returnPriceType {
  year: string
  price: number
}

const queryWebPriceByYear = async (crop: number) => {
  try {
    const { data } = await axios.post<{ data: returnPriceType[] }>(api.webPriceByYear, {
      crop,
      districtId: store.districtId
    })
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const setBlockData = async () => {
  option.value = cloneDeep(ProjectOption)
  const data1 = await queryWebPriceByYear(CropTypeEnum['小麦'])
  const data2 = await queryWebPriceByYear(CropTypeEnum['玉米'])
  const xAxisData = uniq([...data1.map((el) => el.year), ...data2.map((el) => el.year)]).sort(
    (a, b) => Number(a) - Number(b)
  )
  option.value.xAxis.data = xAxisData
  option.value.series[0].data = xAxisData.map((el) => data1.find((item) => item.year === el)?.price || null)
  option.value.series[1].data = xAxisData.map((el) => data2.find((item) => item.year === el)?.price || null)
}

const route = useRoute()
const store = useSystemStore()

onMounted(async () => {
  if (route.name === 'block') {
    setBlockData()
    return
  }
  queryWebIncomeRatio()
})
</script>

<style scoped lang="less">
.chart {
  height: 290px;
}
</style>
