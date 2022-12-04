<template>
  <el-select
    ref="select"
    v-model="value"
    :teleported="false"
    class="select-custom"
    popper-class="popper"
    placeholder="请选择"
    size="default"
  >
    <template #prefix>
      <select-svg></select-svg>
    </template>
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script setup lang="ts">
import selectSvg from '@/assets/svg/select.svg?component'
import downSvg from '@/assets/svg/down.svg?component'

const value = ref('Option1')

const options = [
  {
    value: 'Option1',
    label: '河南-兰考项目'
  },
  {
    value: 'Option2',
    label: '河南-新乡项目'
  },
  {
    value: 'Option3',
    label: '河南-郑州项目'
  }
]
</script>

<style scoped lang="less">
.select-custom {
  border: 1px solid rgba(26, 118, 131, 0.4) !important;
  --el-select-input-focus-border-color: rgba(26, 118, 131, 0.5);
  &:hover {
    box-shadow: 0 0 0 1 #0d3b5d !important;
  }
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 8px;
    background: #44defd;
    z-index: 100;
  }
}

:deep(.el-input__wrapper) {
  background-color: #060e2c;
  box-shadow: none !important;
  border-radius: 0;
  color: #a8adc1;
}
:deep(.el-input__inner) {
  color: #a8adc1;
}
:deep(.el-popper__arrow) {
  display: none;
}
:deep(.popper) {
  background: #060e2c;
  border-radius: 0;
  border-color: #0d3b5d;
  color: #f0f0f0 !important;
}
:deep(.el-select-dropdown__item) {
  color: #a8adc1;
}

:deep(.el-select-dropdown__item.selected) {
  color: #409eff;
}
:deep(.el-select-dropdown__item.hover) {
  background: #130f40;
}
:deep(.el-icon svg) {
  color: #187380;
}
:deep(.el-icon) {
  border: 1px solid #187380;
  padding: 2px;
  background: #0c2744;
  transform: none !important;
}
:deep(.el-select .el-input .el-select__caret.is-reverse) {
  transform: none;
}
:deep(.is-reverse svg) {
  transform: rotateZ(-180deg);
}
</style>
