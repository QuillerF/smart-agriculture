<template>
  <dv-full-screen-container>
    <div class="home">
      <header class="home-header"></header>
      <main class="home-main">
        <section class="home-main-left">
          <proportion-crops></proportion-crops>
          <revenue-growth></revenue-growth>
          <operation-progress></operation-progress>
        </section>
        <section class="home-main-center"></section>
        <section class="home-main-right"></section>
      </main>
    </div>
  </dv-full-screen-container>
</template>

<script setup lang="ts">
import { NavList } from '@/model/home'
const navList = ref(NavList)
const active = ref(1)
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.home {
  background-color: #020a25;
  height: 100%;
  position: relative;
  padding-top: 87px;
  &-header {
    background: url('@/assets/img/top.png');
    background-repeat: no-repeat;
    background-size: auto;
    background-position: center -136px;
    width: 100%;
    height: 150px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  &-main {
    display: grid;
    grid-template-columns: 470px 1fr 470px;
    grid-gap: 20px;
    padding: 0px 20px 20px;
    height: 100%;
    z-index: 1;
    &-left,
    &-right {
      background-color: #030f30;
      padding: 20px;
    }
  }
}
</style>
