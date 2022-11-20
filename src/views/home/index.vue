<template>
  <div class="home">你好啊</div>
</template>

<script setup lang="ts">
import { NavList } from '@/model/home'
const navList = ref(NavList)
const active = ref(1)
</script>

<style scoped lang="less">
.home {
  background: url('@/assets/img/home-bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  height: 100vh;
}
</style>
