<template>
  <!-- <dv-full-screen-container> </dv-full-screen-container> -->
  <div class="home">
    <home-header></home-header>
    <main class="home-main">
      <section class="home-main-left">
        <proportion-crops></proportion-crops>
        <revenue-growth></revenue-growth>
        <operation-progress></operation-progress>
      </section>
      <section class="home-main-center">
        <over-view></over-view>
        <main-map ref="map" @open="openBlockView"></main-map>
        <block-map-view ref="target" class="block-map" @close="showMarker"></block-map-view>
      </section>
      <section class="home-main-right">
        <grain-storage></grain-storage>
        <output-statistics></output-statistics>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import BlockMapView from '@/components/block-map-view.vue'
import MainMap from '@/components/main-map.vue'

const map = templateRef<InstanceType<typeof MainMap>>('map', null)
const target = templateRef<InstanceType<typeof BlockMapView>>('target', null)

const openBlockView = () => {
  map.value.clearMarker()
  target.value.showModal()
}

const showMarker = () => {
  map.value.showMarker()
}
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.home {
  background-color: #020a25;
  width: 100%;
  // height: 100%;
  position: relative;
  padding-top: 87px;
  &-main {
    display: grid;
    grid-template-columns: 470px 1fr 470px;
    grid-gap: 20px;
    padding: 0px 20px 20px;
    height: calc(100% - 20px);
    z-index: 1;
    &-left,
    &-right {
      background-color: #030f30;
      padding: 20px;
      padding-bottom: 0;
    }
    &-center {
      position: relative;
      .block-map {
        position: absolute;
        top: 112px;
        left: 0;
        z-index: 50;
      }
    }
  }
}
</style>
