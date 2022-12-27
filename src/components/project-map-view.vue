<!--
 * @Descripttion: 选择地块外部框
 * @Author: yuanxiongfeng
 * @Date: 2022-11-27 02:37:09
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-28 00:21:41
-->
<template>
  <div v-if="isShowBlock" ref="target" class="block">
    <select-custom class="select" :options="options" @change="selectChange" ref="select"></select-custom>
    <section v-for="item in projectList" :key="item.id" @click="changeProject(item)">
      <project-map :img-url="item.overview"></project-map>
      <span class="block-text">{{ item.name }}</span>
    </section>
  </div>
</template>

<script setup lang="ts">
import useHttpStore from '@/store/http'
import useSystemStore from '@/store/system'

const router = useRouter()
const store = useSystemStore()

const target = templateRef<HTMLElement>('target', null)
const select = templateRef<HTMLElement>('select', null)

const isShowBlock = ref(false)

const emit = defineEmits(['close'])

const { axios, api } = useHttpStore()
const projectList = ref([] as any)
const queryWebProjects = async (id = '') => {
  try {
    const { data } = await axios.post<any>(api.webProjects, {
      districtId: id || store.districtId
    })
    projectList.value = data.length
      ? data
      : [
          {
            area: 6026465.36, // 地块面积
            overview: 'https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281', //概览图地址
            name: '兰考智慧地块项目', // 项目名称
            id: 1 // 项目id
          }
        ]
  } catch (error) {
    console.log(error)
  }
}

const options = ref([] as any)

const queryWebHomeLand = async () => {
  try {
    const { data = [{ id: 1, name: '开封' }] } = await axios.post<any>(api.webHomeLand, {
      provinceId: store.provinceData.id,
      cityId: store.districtId
    })
    options.value = data.map((el: { id: any; name: any }) => ({
      value: el.id,
      label: `${store.provinceData.name}-${el.name}`
    }))
  } catch (error) {
    console.log(error)
  }
}

const selectChange = (id: string) => {
  queryWebProjects(id)
}

onMounted(() => {
  queryWebProjects()
  queryWebHomeLand()
})

const showModal = () => {
  isShowBlock.value = true
}

const changeProject = (item: any) => {
  store.changeProjectId(item.id)
  router.push({ path: '/block' })
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
