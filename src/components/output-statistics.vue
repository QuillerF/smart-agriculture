<template>
  <div class="card">
    <view-title>产量统计</view-title>
    <div class="card-list">
      <dv-scroll-board :config="config" style="height: 330px" />
    </div>
  </div>
</template>

<script setup lang="ts">
const config = reactive({
  header: ['年份', '产量(吨)', '地区'],
  rowNum: 7,
  headerBGC: '#132239',
  headerHeight: 42,
  oddRowBGC: 'transparent',
  evenRowBGC: '#0d1838',
  index: false,
  align: ['left', 'center', 'center'],
  data: [
    ['2022-06-07', '160450', '河南'],
    ['2022-06-07', '160450', '河南'],
    ['2022-06-07', '160450', '河南'],
    ['2022-06-07', '160450', '河南'],
    ['2022-06-07', '160450', '河南'],
    ['2022-06-07', '160450', '河南'],
    ['2022-06-07', '160450', '河南'],
    ['2022-06-07', '160450', '河南'],
    ['2022-06-07', '160450', '河南'],
    ['2022-06-07', '160450', '河南']
  ]
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
