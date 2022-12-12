<!--
 * @Descripttion: 选择地块外部框
 * @Author: yuanxiongfeng
 * @Date: 2022-11-27 02:37:09
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-12 02:25:30
-->
<template>
  <div v-if="isShowBlock" ref="target" class="block">
    <select-custom class="select" ref="select"></select-custom>
    <section v-for="item in 4" :key="item" @click="changeProject">
      <block-map></block-map>
      <span class="block-text">惠安街道11666亩</span>
    </section>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const target = templateRef<HTMLElement>('target', null)
const select = templateRef<HTMLElement>('select', null)

const isShowBlock = ref(false)

const emit = defineEmits(['close'])

onClickOutside(
  target,
  (event) => {
    isShowBlock.value = false
    emit('close')
  },
  {
    ignore: [select]
  }
)

const showModal = () => {
  isShowBlock.value = true
}

const changeProject = () => {
  router.push('/project')
}

defineExpose({
  showModal
})
</script>

<style scoped lang="less">
.block {
  display: grid;
  grid-template-columns: 314px 314px;
  grid-template-rows: 200px 200px;
  grid-gap: 96px 57px;
  padding: 80px;
  height: 700px;
  background: rgba(4, 22, 85, 0.5);
  position: relative;
  .select {
    position: absolute;
    top: 20px;
    left: 20px;
  }
  &-text {
    font-size: 14px;
    line-height: 25px;
    letter-spacing: 0px;
    color: #f0f0f0;
    opacity: 0.7;
    width: 100%;
    display: inline-block;
    text-align: center;
    margin-top: 5px;
  }
}
</style>
