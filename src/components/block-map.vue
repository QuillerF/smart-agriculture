<template>
  <div ref="chart" class="chart"></div>
</template>

<script setup lang="ts">
import { Option } from '@/model/block-map'
import lntLatJson from '@/assets/block.json'

const chart = templateRef<HTMLElement>('chart', null)

onMounted(() => {
  nextTick(() => {
    initMap()
  })
})
const initMap = () => {
  let Bmap = window.BMapGL
  let map = new Bmap.Map(chart.value, { backgroundColor: [4, 22, 78, 100] })
  map.enableScrollWheelZoom(true)
  // 隐藏室内图
  map.setDisplayOptions({
    poi: false
  })

  const mapStyle = { features: ['road', 'building', 'water', 'land'] }
  // map.setMapStyle(mapStyle)

  map.centerAndZoom(new Bmap.Point(113.6166, 34.803161), 14)
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
}
</script>

<style scoped lang="less">
.chart {
  width: 100%;
  height: 100%;
  background: rgba(6, 14, 44, 0.4) !important;
  background-image: none !important;
  border: solid 1px #1a7683;
}

:global(.anchorBL) {
  display: none;
}
</style>
