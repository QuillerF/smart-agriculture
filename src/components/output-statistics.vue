<template>
  <div class="card">
    <view-title>{{ title }}</view-title>
    <div class="card-list">
      <dv-scroll-board :config="config" style="height: 330px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { tableProjectData, tableData } from '@/model/output'
const props = withDefaults(defineProps<{ target?: 'home' | 'project' }>(), {
  target: 'home'
})
const title = computed(() => (props.target === 'home' ? '产量统计' : '预警通知'))

const config = reactiveComputed(() => {
  if (props.target === 'home') {
    return tableData
  }
  return tableProjectData
})
</script>

<style scoped lang="less">
.card-list {
  padding-top: 20px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(3, 15, 48, 0), rgba(3, 15, 48, 0) 60%, rgba(3, 15, 48, 0.8));
    z-index: 20;
  }
}
:deep(.header) {
  color: #48ece7;
}
:deep(.row-item) {
  color: #cfcfcf;
}
</style>
