<!--
 * @Descripttion: 农作物占比分析/种植统计 4个水球图
 * @Author: yuanxiongfeng
 * @Date: 2022-11-21 01:40:33
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-29 00:03:36
-->
<template>
  <div class="card">
    <view-title>{{ title }}</view-title>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { OptionItem, OptionItemParam, OptionItemProjectParam } from '@/model/proportion-crops'
import useHttpStore from '@/store/http'
import useSystemStore from '@/store/system'

const props = withDefaults(defineProps<{ target?: 'home' | 'project' }>(), {
  target: 'home'
})

const title = computed(() => (props.target === 'home' ? '农作物占比分析' : '种植统计（亩）'))

const list = computed(() => {
  if (props.target === 'home') {
    return OptionItemParam
  }
  return OptionItemProjectParam
})

const option = ref({
  series: list.value.map((el) => new OptionItem(el))
})

const { axios, api } = useHttpStore()

interface itemDataType {
  other: number
  corn: number
  wheat: number
  rice: number
}

const queryWebProportion = async () => {
  try {
    const { data } = await axios.post<{ data: itemDataType }>(api.webProportion)
    const params = list.value.map((el) => {
      switch (el.name) {
        case '小麦种植':
          el.value.value = data.wheat / 100
          el.value.real = data.wheat
          break
        case '水稻种植':
          el.value.value = data.rice / 100
          el.value.real = data.rice
          break
        case '玉米种植':
          el.value.value = data.corn / 100
          el.value.real = data.corn
          break
        default:
          el.value.value = data.other / 100
          el.value.real = data.other
          break
      }
      return el
    })
    option.value.series = params.map((el) => new OptionItem(el))
  } catch (error) {
    console.log(error)
  }
}

const store = useSystemStore()

const queryWebProjects = async (id = '') => {
  try {
    const { data } = await axios.post<any>(api.webProjects, {
      districtId: id || store.districtId
    })
    const total = data.reduce((total: number, cur: { area: any }) => total + Number(cur.area), 0)
    list.value.map((el, index) => {
      el.name = data[index].name
      el.value.value = data[index].area / total
      el.value.real = data[index].area
      return el
    })
  } catch (error) {
    console.log(error)
  }
}

const route = useRoute()
onMounted(() => {
  if (route.name === 'block') {
    queryWebProjects()
    return
  }
  queryWebProportion()
})
</script>

<style scoped lang="less">
.chart {
  height: 268px;
}
</style>
