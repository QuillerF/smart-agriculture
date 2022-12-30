<!--
 * @Descripttion: 选择器通用组件
 * @Author: yuanxiongfeng
 * @Date: 2022-11-29 03:00:47
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-31 01:26:39
-->
<template>
  <el-select
    ref="select"
    v-model="selectVal"
    :teleported="false"
    class="select-custom"
    popper-class="popper"
    placeholder="请选择"
    size="default"
    @change="change"
  >
    <template #prefix>
      <select-svg></select-svg>
    </template>
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script setup lang="ts">
import selectSvg from '@/assets/svg/select.svg?component'
import useSystemStore from '@/store/system'

interface ItemType {
  value: string
  label: string
}

const props = withDefaults(
  defineProps<{
    options?: ItemType[]
  }>(),
  {
    options: () => [
      {
        value: 'Option1',
        label: '河南-兰考项目'
      }
    ]
  }
)

const selectVal = ref('')

const emit = defineEmits(['change'])

const change = (id: string) => {
  emit('change', id)
}
const store = useSystemStore()
const route = useRoute()
watch(
  () => props.options,
  (val) => {
    const id = route.name === 'block' ? store.projectId : store.districtId
    selectVal.value = val.find((el) => el?.value === id)?.value || val[0]?.value
  },
  {
    immediate: true
  }
)
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
