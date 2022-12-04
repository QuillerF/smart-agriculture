<!--
 * @Descripttion: 面板标题通用组件
 * @Author: yuanxiongfeng
 * @Date: 2022-11-20 21:16:50
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-04 19:59:38
-->
<template>
  <div class="view-title">
    <border-left></border-left>
    <span class="view-title-text">{{ title }}<slot></slot></span>
    <slot name="right">
      <border-right></border-right>
    </slot>
  </div>
</template>

<script setup lang="ts">
import borderLeft from '@/assets/svg/border-left.svg?component'
import borderRight from '@/assets/svg/border-right.svg?component'
withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: ''
  }
)
</script>

<style scoped lang="less">
.view-title {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 10px;
  align-items: center;
  width: 100%;
  height: 42px;
  border: 1px solid #0f3361;
  border-left: none;
  border-right: none;
  &-text {
    font-family: SourceHanSansCN-Bold;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0px;
    color: #c8dbf4;
  }
}
</style>
