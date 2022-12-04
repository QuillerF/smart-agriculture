<!--
 * @Descripttion:  地块页面的地图
 * @Author: yuanxiongfeng
 * @Date: 2022-11-28 01:05:49
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-04 22:55:31
-->
<template>
  <div class="card">
    <div class="card-chart">
      <div ref="chart" class="card-chart-view"></div>
    </div>
    <work-bench class="line" @change="changeMarker"></work-bench>
    <select-custom :options="options" class="select"></select-custom>
    <machine-info ref="machine" class="machine-info"></machine-info>
  </div>
</template>

<script setup lang="ts">
import { MachineEnum } from '@/model/project-map'
import { maxBy, minBy } from 'lodash'
import lntLatJson from '@/assets/block.json'
import MachineInfo from './machine-info.vue'

const Bmap = window.BMapGL

const options = ref([
  {
    value: 'Option1',
    label: '惠安街道11666亩'
  },
  {
    value: 'Option2',
    label: '红庙镇11666亩'
  },
  {
    value: 'Option3',
    label: '红庙北村11666亩'
  }
])

const markersList = [
  [113.614964, 34.809666],
  [113.613706, 34.80445],
  [113.613491, 34.80027],
  [113.620444, 34.800293]
]

const chart = templateRef<HTMLElement>('chart', null)
const machine = templateRef<InstanceType<typeof MachineInfo>>('machine', null)

onMounted(() => {
  nextTick(() => {
    initMap()
  })
})

const mapData = ref()

const pointData = markersList.map(([lng, lat]) => new Bmap.Point(lng, lat))

const myIcon = new Bmap.Icon('/src/assets/img/marker-machine.png', new Bmap.Size(54, 54), {
  anchor: new Bmap.Size(10, 25),
  imageOffset: new Bmap.Size(0, 0) // 设置图片偏移
})

const markerData = pointData.map((el) => {
  const marker = new Bmap.Marker(el, { icon: myIcon })
  marker.id = '001'
  marker.addEventListener('click', (data: any) => {
    console.log('marker', data)
    machine.value.handleOpen()
  })
  return marker
})

const changeMarker = (val: string) => {
  const icon = MachineEnum[val]
  const nowIcon = new Bmap.Icon(icon, new Bmap.Size(54, 54), {
    anchor: new Bmap.Size(10, 25),
    imageOffset: new Bmap.Size(0, 0) // 设置图片偏移
  })
  markerData.forEach((el) => {
    el.setIcon(nowIcon)
  })
}

// const removeMarker = () => {
//   mapData.value.removeOverlay(markerData.value)
// }

const initMap = () => {
  const Bmap = window.BMapGL
  let map = new Bmap.Map(chart.value, { backgroundColor: [4, 22, 78, 100] })
  mapData.value = map
  map.enableScrollWheelZoom(true)
  // 隐藏标注
  map.setDisplayOptions({
    poi: false
  })
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
  const content = '编号<br/>001'
  const label = new Bmap.Label(content, {
    // 创建文本标注
    position: point,
    offset: new Bmap.Size(-40, 0)
  })
  map.addOverlay(label) // 将标注添加到地图中
  label.setStyle({
    // 设置label的样式
    color: '#fff',
    fontSize: '14px',
    border: 'none',
    padding: [0, 20, 0, 0],
    backgroundColor: 'transparent'
  })

  // 添加标记物
  markerData.forEach((el) => {
    map.addOverlay(el)
  })
}
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
