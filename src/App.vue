<script setup lang="ts"></script>

<template>
  <!-- <dv-full-screen-container> </dv-full-screen-container> -->
  <router-view v-slot="{ Component }">
    <!-- <keep-alive :include="['home']"> -->
    <!-- </keep-alive> -->
    <component :is="Component" />
  </router-view>
</template>

<style></style>
