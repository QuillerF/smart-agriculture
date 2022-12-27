<!--
 * @Descripttion: 首页中国地图
 * @Author: yuanxiongfeng
 * @Date: 2022-11-26 16:16:20
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-28 01:41:38
-->
<template>
  <div class="card">
    <v-chart class="chart" :option="option" @click="handleClick" @zr:dblclick="handleDblclick" />
    <line-view class="line"></line-view>
  </div>
</template>

<script setup lang="ts">
import { Option, geoCoordMap, provinceMap, ConvertData, returnItemType } from '@/model/main-map'
import useHttpStore from '@/store/http'
import useSystemStore from '@/store/system'
import * as echarts from 'echarts'
import { Ref } from 'vue'

const option = ref(Option)

const emit = defineEmits(['open'])

const toLocalMap = async (data: { name: string; componentType?: string }) => {
  const dataName = data.componentType === 'geo' ? data.name : data.name.slice(0, -1)
  if (data.name && provinceMap[dataName]) {
    if (!echarts.getMap(provinceMap[dataName])) {
      const json = await import(`@/assets/province/${provinceMap[dataName]}.json`)
      json && echarts.registerMap(provinceMap[dataName], json as any)
    }
    option.value.geo.map = provinceMap[dataName]
    option.value.geo.center = geoCoordMap[dataName]
    option.value.series[0].data = provinceMarkerData.value
  }
}

const router = useRouter()
const store = useSystemStore()

const isProvince = ref(false)

const handleClick = async (data: any) => {
  console.log('clickData', data)
  if (data.componentSubType === 'scatter') {
    if (provinceMap[data.name.slice(0, -1)] && !isProvince.value) {
      isProvince.value = true
      store.changeProvinceData(data.data)
      provinceMarkerData.value = await queryWebHomeLand(data.data.id)
      toLocalMap(data.data)
      return
    }
    store.changeDistrictId(data.data.id)
    router.push('/project')
    // emit('open', data)
  }
  if (data.componentType === 'geo') {
    toLocalMap(data)
  }
}

const handleDblclick = (data: any) => {
  isProvince.value = false
  option.value.geo.map = 'china'
  option.value.geo.center = geoCoordMap['陕西']
  option.value.series[0].data = initMarkerData
}

const showMarker = () => {
  option.value.series[0].data = provinceMarkerData
}

const clearMarker = () => {
  option.value.series[0].data = []
}

const { axios, api } = useHttpStore()

const initMarkerData: Ref<Partial<returnItemType>[]> = ref([])
const provinceMarkerData: Ref<Partial<returnItemType>[]> = ref([])

const queryWebHomeLand = async (provinceId: string) => {
  try {
    const { data } = await axios.post<{ data: returnItemType[] }>(api.webHomeLand, { provinceId })
    return ConvertData(data)
  } catch (error) {
    console.log(error)
    return []
  }
}

onActivated(() => {
  showMarker()
})

onMounted(async () => {
  if (store.isProject) {
    toLocalMap(store.provinceData)
    option.value.series[0].data = []
    return
  }
  initMarkerData.value = await queryWebHomeLand('')
  option.value.series[0].data = initMarkerData.value
})

defineExpose({
  showMarker,
  clearMarker
})
</script>

<style scoped lang="less">
.card {
  position: relative;
}
.chart {
  height: 865px;
}
.line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
