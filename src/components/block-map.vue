<template>
  <div ref="chart" class="chart"></div>
</template>

<script setup lang="ts">
import { maxBy, minBy } from 'lodash'
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
  // 隐藏标注
  map.setDisplayOptions({
    poi: false
  })
  // 设置中心点
  const centerLng = ((maxBy(lntLatJson, 'lng')?.lng || 0) + (minBy(lntLatJson, 'lng')?.lng || 0)) / 2
  const centerLat = ((maxBy(lntLatJson, 'lat')?.lat || 0) + (minBy(lntLatJson, 'lat')?.lat || 0)) / 2
  map.centerAndZoom(new Bmap.Point(centerLng, centerLat), 14)

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
}
</script>

<style scoped lang="less">
.chart {
  width: 100%;
  height: 100%;
  background: rgba(6, 14, 44, 0.4) !important;
  background-image: none !important;
  border: solid 1px rgba(26, 118, 131, 0.4);
}

:global(.anchorBL) {
  display: none;
}
</style>
