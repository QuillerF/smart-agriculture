<template>
  <div v-show="isShow" ref="target" class="machine">
    <h1 class="machine-title">
      <position></position>
      <span>设备信息</span>
      <close class="close" @click="handleClose"></close>
    </h1>
    <section class="machine-main">
      <img :src="machineImg" alt="" />
      <ul class="machine-main-right">
        <li class="machine-main-right-title">
          <span>设备名称：水肥一体机</span>
        </li>
        <li>设备状态：正常 供电状态：正常</li>
        <li>水泵状态：正常 水位深度：正常</li>
        <li>设备编号：HNJD-001</li>
        <li>设备Mac：558841895</li>
        <li>网关Mac：558841895</li>
        <li>远程开关:</li>
        <li>查看灌溉任务>></li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import machineImg from '@/assets/img/machine-highlight.png'
import close from '@/assets/svg/close.svg?component'
import position from '@/assets/svg/position.svg?component'

const isShow = ref(false)

const handleOpen = () => {
  isShow.value = true
}

const handleClose = () => {
  isShow.value = false
}

const target = templateRef<HTMLElement>('target', null)
onClickOutside(target, (event) => {
  isShow.value = false
})
defineExpose({
  handleOpen,
  handleClose
})
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.machine {
  width: 320px;
  height: 300px;
  background-color: rgba(5, 15, 48, 0.4);
  border: solid 1px #1a7683;
  color: #f0f0f0;
  padding: 12px;
  &-title {
    width: 296px;
    height: 35px;
    background: linear-gradient(to right, #0b2545, transparent);
    padding: 0 10px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    grid-gap: 12px;
    font-size: 14px;
  }
  &-main {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 8px;
    &-right {
      list-style: none;
      margin: 0;
      padding: 0;
      opacity: 1;
      & > li {
        font-size: 12px;
        line-height: 23px;
        letter-spacing: 0px;
        color: #ffffff;
        opacity: 0.8;
      }
    }
  }
}
.close {
  cursor: pointer;
}
</style>
