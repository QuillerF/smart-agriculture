<!--
 * @Descripttion: 工作台组件
 * @Author: yuanxiongfeng
 * @Date: 2022-11-28 11:37:21
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2023-01-03 01:51:14
-->
<template>
  <div class="card">
    <view-title>工作台</view-title>
    <div class="chart">
      <section
        v-for="item in workList"
        :key="item.label"
        :active="item.isChecked"
        class="chart-item"
        @click="handleClick(item)"
      >
        <div :active="item.isChecked" class="chart-item-img">
          <img :src="item.img" alt="" />
        </div>
        <div>{{ item.label }}</div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import centerImg from '@/assets/img/work-center.png'
import fourImg from '@/assets/img/work-four.png'
import watchImg from '@/assets/img/work-watch.png'
import waterImg from '@/assets/img/work-water.png'

const workList = ref([
  {
    label: '灌溉管理',
    key: 'water',
    isChecked: true,
    img: waterImg
  },
  {
    label: '监控管理',
    key: 'watch',
    isChecked: true,

    img: watchImg
  },
  {
    label: '四情管理',
    key: 'four',
    isChecked: true,

    img: fourImg
  },
  {
    label: '控制中心',
    key: 'center',
    isChecked: false,
    img: centerImg
  }
])

const emit = defineEmits(['change'])

const handleClick = (item: { key: string; isChecked: boolean }) => {
  if (item.key === 'center') {
    ElMessage.info('暂无数据')
    return
  }
  item.isChecked = !item.isChecked
  emit('change', item.key, item.isChecked)
}
</script>

<style scoped lang="less">
.card {
  background: rgba(3, 19, 60, 0.5);
}
.chart {
  height: 208px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 96px;
  align-items: center;
  justify-content: center;
  &-item {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
    align-items: center;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    &[active='true'] {
      color: #fff;
    }
    &-img {
      width: 82px;
      height: 82px;
      background: url('@/assets/img/work-bg.png');
      background-size: cover;
      display: flex;
      align-items: center;
      justify-content: center;
      &[active='true'] {
        background: url('@/assets/img/work-bg-active.png') !important;
        background-size: cover !important;
      }
    }
  }
}
</style>
