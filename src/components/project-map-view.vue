<!--
 * @Descripttion: 选择地块外部框
 * @Author: yuanxiongfeng
 * @Date: 2022-11-27 02:37:09
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-30 02:11:03
-->
<template>
  <div v-if="isShowBlock" ref="target" class="block">
    <select-custom class="select" :options="options" @change="selectChange" ref="select"></select-custom>
    <el-carousel :autoplay="false" height="550px">
      <el-carousel-item v-for="(screen, index) in Math.ceil(projectList.length / 4)" :key="screen" class="block-card">
        <section
          v-for="item in projectList.slice(index * 4, index * 4 + 4)"
          :key="item.id"
          @click="changeProject(item)"
        >
          <project-map :img-url="item.overview"></project-map>
          <span class="block-text">{{ item.name }}</span>
        </section>
      </el-carousel-item>
    </el-carousel>
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
    const { data = [] } = await axios.post<any>(api.webProjects, {
      districtId: id || store.districtId
    })
    projectList.value = data
  } catch (error) {
    console.log(error)
  }
}

const options = computed(() => store.options)

const selectChange = (id: string) => {
  store.changeDistrictId(id)
  queryWebProjects(id)
}

onMounted(() => {
  queryWebProjects()
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
  padding: 80px 20px;
  // height: 700px;
  background: rgba(4, 22, 85, 0.5);
  position: relative;
  &-card {
    display: grid;
    grid-template-columns: 314px 314px;
    grid-template-rows: 200px 200px;
    grid-gap: 96px 57px;
    justify-content: center;
  }
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
