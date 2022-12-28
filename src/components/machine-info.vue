<!--
 * @Descripttion: 设备信息弹窗
 * @Author: yuanxiongfeng
 * @Date: 2022-11-28 02:56:49
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-29 01:06:57
-->
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
        <li class="machine-main-right-title">设备名称：水肥一体机</li>
        <li>设备状态：正常 供电状态：正常</li>
        <li>水泵状态：正常 水位深度：正常</li>
        <li>设备编号：{{ machineInfo.code }}</li>
        <li>设备Mac：{{ machineInfo.mac }}</li>
        <li>网关Mac：{{ machineInfo.mac }}</li>
        <li class="machine-main-right-switch">
          <span> 远程开关: </span>
          <el-switch v-model="switchVal" class="ml-2" style="--el-switch-on-color: #11ab69" />
        </li>
        <li class="machine-main-right-link">查看灌溉任务>></li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import machineImg from '@/assets/img/machine-highlight.png'
import close from '@/assets/svg/close.svg?component'
import position from '@/assets/svg/position.svg?component'

const isShow = ref(false)

const switchVal = ref(true)

const machineInfo = ref({} as any)

const handleOpen = (value: any) => {
  machineInfo.value = value
  switchVal.value = machineInfo.value.status === 1
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
    grid-gap: 20px;
    &-right {
      list-style: none;
      margin: 0;
      padding: 0;
      color: #7b8092;
      font-size: 12px;
      line-height: 23px;
      letter-spacing: 0px;
      &-title {
        color: #fff;
        position: relative;
        &::before {
          content: '';
          width: 4px;
          height: 4px;
          background-color: #25faf3;
          position: absolute;
          left: -12px;
          top: 9px;
        }
      }
      &-switch {
        color: #fff;
        margin-top: 6px;
        display: flex;
        align-items: center;
        gap: 14px;
      }
      &-link {
        cursor: pointer;
        text-decoration: underline;
        color: #25faf3;
        text-align: right;
        margin-top: 15px;
      }
    }
  }
}
.close {
  cursor: pointer;
}
</style>
