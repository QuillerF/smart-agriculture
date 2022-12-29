<!--
 * @Descripttion: 首页中国地图
 * @Author: yuanxiongfeng
 * @Date: 2022-11-26 16:16:20
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-30 01:35:18
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
import { fa } from 'element-plus/es/locale'
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

const route = useRoute()
const router = useRouter()
const store = useSystemStore()

// const queryWebHomeLand = async () => {
//   try {
//     const { data = [] } = await axios.post<any>(api.webHomeLand, {
//       provinceId: '',
//       cityId: store.cityId
//     })
//     options.value = data.map((el: { id: any; name: any }) => ({
//       value: el.id,
//       label: `${store.provinceData.name}-${el.name}`
//     }))
//     store.changeDistrictId(options.value[0]?.value)
//     queryWebProjects()
//   } catch (error) {
//     console.log(error)
//   }
// }

const handleClick = async (data: any) => {
  console.log('clickData', data)
  if (data.componentSubType === 'scatter') {
    if (provinceMap[data.name.slice(0, -1)]) {
      store.changeProvinceData(data.data)
      provinceMarkerData.value = await queryWebHomeLand(data.data.id)
      toLocalMap(data.data)
      return
    }
    const options = await queryWebHomeLand('', data.data.id)
    store.changeCityId(data.data.id)
    store.changeDistrictId(options[0].value)
    store.changeOptions(options)
    router.push('/project')
    // emit('open', data)
  }
  if (data.componentType === 'geo') {
    toLocalMap(data)
  }
}

const handleDblclick = () => {
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

const queryWebHomeLand = async (provinceId = '', cityId = '') => {
  try {
    const { data } = await axios.post<{ data: returnItemType[] }>(api.webHomeLand, { provinceId, cityId })
    return cityId
      ? data.map((el: { id: any; name: any }) => ({
          value: el.id,
          label: `${store.provinceData.name}-${el.name}`
        }))
      : ConvertData(data)
  } catch (error) {
    console.log(error)
    return []
  }
}

onMounted(async () => {
  if (route.name === 'project') {
    toLocalMap(store.provinceData)
    option.value.series[0].data = []
    return
  }
  initMarkerData.value = await queryWebHomeLand('')
  handleDblclick()
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
