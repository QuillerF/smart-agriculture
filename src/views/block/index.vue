<template>
  <div class="home">
    <home-header></home-header>
    <main class="home-main">
      <section class="home-main-left">
        <proportion-crops target="project"></proportion-crops>
        <revenue-growth target="project"></revenue-growth>
        <operation-progress target="project"></operation-progress>
      </section>
      <section class="home-main-center">
        <over-view></over-view>
        <block-map></block-map>
      </section>
      <section class="home-main-right">
        <crop-growth></crop-growth>
        <output-statistics target="project"></output-statistics>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const isShowBlock = ref(false)

const target = templateRef<HTMLElement>('target', null)

onClickOutside(target, (event) => {
  isShowBlock.value = false
})
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
