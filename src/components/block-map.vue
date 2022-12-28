<!--
 * @Descripttion:  地块页面的地图
 * @Author: yuanxiongfeng
 * @Date: 2022-11-28 01:05:49
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-29 00:55:27
-->
<template>
  <div class="card">
    <div class="card-chart">
      <div ref="chart" class="card-chart-view"></div>
    </div>
    <work-bench class="line" @change="changeMarker"></work-bench>
    <select-custom :options="options" class="select" @change="selectChange"></select-custom>
    <machine-info ref="machine" class="machine-info"></machine-info>
  </div>
</template>

<script setup lang="ts">
import { MachineEnum } from '@/model/project-map'
import { maxBy, minBy } from 'lodash'
// import lntLatJson from '@/assets/block.json'
import MachineInfo from './machine-info.vue'
import useHttpStore from '@/store/http'
import useSystemStore from '@/store/system'

const Bmap = window.BMapGL

const options = ref([
  {
    value: 'Option1',
    label: '惠安街道11666亩'
  }
])

const selectChange = (id: string) => {
  store.changeProjectId(id)
  initMap()
}

const queryWebProjects = async (id = '') => {
  try {
    const { data } = await axios.post<any>(api.webProjects, {
      districtId: id || store.districtId
    })
    options.value = data.map((el: { id: any; name: any; area: any }) => ({
      value: el.id,
      label: `${el.name}${el.area}亩`
    }))
  } catch (error) {
    console.log(error)
  }
}

const chart = templateRef<HTMLElement>('chart', null)
const machine = templateRef<InstanceType<typeof MachineInfo>>('machine', null)

const mapData = ref()

const myIcon = new Bmap.Icon('/src/assets/img/marker-machine.png', new Bmap.Size(54, 54), {
  anchor: new Bmap.Size(10, 25),
  imageOffset: new Bmap.Size(0, 0) // 设置图片偏移
})

const markersList = ref([] as any)

const addMarkerWater = async () => {
  try {
    const { data } = await axios.post<any>(api.webFertilization, {
      projectId: store.projectId
    })
    markersList.value = data
    const pointData = data.map((item: any) => {
      item.point = new Bmap.Point(item.lng, item.lat)
      return item
    })
    const markerData = pointData.map((el: { point: any; id: any }) => {
      const marker = new Bmap.Marker(el.point, { icon: myIcon })
      marker.id = el.id
      marker.addEventListener('click', (data: any) => {
        console.log('marker', data)
        machine.value.handleOpen(el)
      })
      return marker
    })
    markerData.forEach((el: any) => {
      mapData.value.addOverlay(el)
    })
  } catch (error) {
    console.log(error)
  }
}

const changeMarker = (val: string) => {
  const icon = MachineEnum[val]
  const nowIcon = new Bmap.Icon(icon, new Bmap.Size(54, 54), {
    anchor: new Bmap.Size(10, 25),
    imageOffset: new Bmap.Size(0, 0) // 设置图片偏移
  })
  // markerData.forEach((el: { setIcon: (arg0: any) => void }) => {
  //   el.setIcon(nowIcon)
  // })
}

// const removeMarker = () => {
//   mapData.value.removeOverlay(markerData.value)
// }

const { axios, api } = useHttpStore()
const store = useSystemStore()

const initMap = async () => {
  const { data } = await axios.post<{ data: any }>(api.webProjectLands, {
    projectId: store.projectId
  })
  const Bmap = window.BMapGL
  let map = new Bmap.Map(chart.value, { backgroundColor: [4, 22, 78, 100] })
  mapData.value = map
  map.enableScrollWheelZoom(true)
  // 隐藏标注
  map.setDisplayOptions({
    poi: false
  })
  data.forEach((el: any) => {
    const lntLatJson = JSON.parse(el.points) as any[]
    // 设置中心点
    const centerLng = ((maxBy(lntLatJson, 'lng')?.lng || 0) + (minBy(lntLatJson, 'lng')?.lng || 0)) / 2
    const centerLat = ((maxBy(lntLatJson, 'lat')?.lat || 0) + (minBy(lntLatJson, 'lat')?.lat || 0)) / 2
    map.centerAndZoom(new Bmap.Point(centerLng, centerLat), 16)

    // 画线和区域掩膜
    const polygon = new Bmap.Polygon(
      lntLatJson.map((el) => new Bmap.Point(el.lng, el.lat)),
      { strokeColor: '#031042', strokeWeight: 2, strokeOpacity: 0.5, fillColor: '#64a800' }
    )
    const path = lntLatJson.map((el) => new Bmap.Point(el.lng, el.lat))
    const mapMask = new Bmap.MapMask(path, {
      showRegion: 'inside', // 显示区域范围以内部分
      isBuildingMask: true, // 楼块是否参与掩膜
      isPoiMask: true, // poi标注是否参与掩膜
      isMapMask: true // 底图是否参与掩膜
    })
    map.addOverlay(mapMask)
    map.addOverlay(polygon)

    // 添加文本
    const point = new Bmap.Point(centerLng, centerLat)
    const content = `编号<br/>${el.code}`
    const label = new Bmap.Label(content, {
      position: point,
      offset: new Bmap.Size(-40, 0)
    })
    map.addOverlay(label) // 将标注添加到地图中
    label.setStyle({
      // 设置label的样式
      color: '#fff',
      fontSize: '14px',
      border: 'none',
      padding: [0, -20, 0, 0],
      backgroundColor: 'transparent'
    })

    // 添加标记物
    // markerData.forEach((el) => {
    //   map.addOverlay(el)
    // })
    addMarkerWater()
  })
}

onMounted(() => {
  queryWebProjects()
  nextTick(() => {
    initMap()
  })
})
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.card {
  background: #031241;
  position: relative;
  &-chart {
    position: relative;
    height: 865px;
    padding-bottom: 200px;
    &-view {
      height: 100%;
      background: #031241 !important;
      background-image: none !important;
    }
  }
}

:global(.anchorBL) {
  display: none;
}
.line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.select {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
}
.machine-info {
  position: absolute;
  top: 100px;
  right: 20px;
  z-index: 100;
}
</style>
