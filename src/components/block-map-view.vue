<template>
  <div class="block">
    <section @click="changeProject">
      <block-map></block-map>
      <span class="block-text">惠安街道11666亩</span>
    </section>
  </div>
</template>

<script setup lang="ts">
const changeProject = () => {
  console.log('哈哈哈哈哈')
}
</script>

<style scoped lang="less">
.block {
  display: grid;
  grid-template-columns: 314px 314px;
  grid-template-rows: 200px 200px;
  grid-gap: 96px 57px;
  padding: 80px;
  height: 700px;
  background: rgba(4, 22, 85, 0.5);
  &-text {
    font-size: 14px;
    line-height: 25px;
    letter-spacing: 0px;
    color: #f0f0f0;
    opacity: 0.7;
    width: 100%;
    display: inline-block;
    text-align: center;
  }
}
</style>
