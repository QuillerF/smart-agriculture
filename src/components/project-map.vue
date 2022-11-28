<template>
  <div class="card">
    <div class="card-chart">
      <div ref="chart" class="card-chart-view"></div>
    </div>
    <work-bench class="line"></work-bench>
    <machine-info ref="machine" class="machine-info"></machine-info>
  </div>
</template>

<script setup lang="ts">
import { maxBy, minBy } from 'lodash'
import lntLatJson from '@/assets/block.json'
import MachineInfo from './machine-info.vue'

const chart = templateRef<HTMLElement>('chart', null)
const machine = templateRef<InstanceType<typeof MachineInfo>>('machine', null)

onMounted(() => {
  nextTick(() => {
    initMap()
  })
})

const initMap = () => {
  let Bmap = window.BMapGL
  let map = new Bmap.Map(chart.value, { backgroundColor: [4, 22, 78, 100] })
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

  // 添加标记
  const myIcon = new Bmap.Icon('/src/assets/img//machine.png', new Bmap.Size(54, 54), {
    // 指定定位位置。
    // 当标注显示在地图上时，其所指向的地理位置距离图标左上
    // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
    // 图标中央下端的尖角位置。
    anchor: new Bmap.Size(10, 25),
    // 设置图片偏移。
    // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
    // 需要指定大图的偏移位置，此做法与css sprites技术类似。
    imageOffset: new Bmap.Size(0, 0) // 设置图片偏移
  })
  // 创建标注对象并添加到地图
  const marker = new Bmap.Marker(point, { icon: myIcon })
  marker.id = '001'
  marker.addEventListener('click', (data: any) => {
    console.log('marker', data)
    machine.value.handleOpen()
  })
  map.addOverlay(marker)
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
.machine-info {
  position: absolute;
  top: 100px;
  right: 20px;
  z-index: 100;
}
</style>
