<script setup lang="ts"></script>

<template>
  <!-- <dv-full-screen-container> </dv-full-screen-container> -->
  <router-view v-slot="{ Component }">
    <keep-alive :include="['home']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style></style>
