<!--
 * @Descripttion: 设备信息弹窗
 * @Author: yuanxiongfeng
 * @Date: 2022-11-28 02:56:49
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2023-01-03 02:12:10
-->
<template>
  <div v-show="isShow" ref="target" class="machine">
    <h1 class="machine-title">
      <position></position>
      <span>设备信息</span>
      <close class="close" @click="handleClose"></close>
    </h1>
    <section class="machine-main">
      <img :src="getImgUrl" alt="" />
      <ul class="machine-main-right">
        <li class="machine-main-right-title">设备名称：{{ getMachineName }}</li>
        <li v-if="markerType === 'water'">
          设备状态：{{ machineStateEnum[machineInfo.state as keyof typeof machineStateEnum] }} 供电状态：{{
            switchStateEnum[machineInfo.switchState as keyof typeof switchStateEnum]
          }}
        </li>
        <li v-if="markerType !== 'watch'">
          设备状态：{{ machineStateEnum[machineInfo.state as keyof typeof machineStateEnum] }} 供电状态：{{
            switchStateEnum[machineInfo.status as keyof typeof switchStateEnum]
          }}
        </li>
        <li v-if="markerType === 'water'">
          水泵状态：{{ pumpStateEnum[machineInfo.pumpState as keyof typeof pumpStateEnum] }} 水位深度：{{
            waterStateEnum[machineInfo.waterState as keyof typeof waterStateEnum]
          }}
        </li>
        <li v-if="markerType === 'watch'">
          网络状态：{{ netStateEnum[machineInfo.state as keyof typeof netStateEnum] }} 供电状态：{{
            switchStateEnum[machineInfo.status as keyof typeof switchStateEnum]
          }}
        </li>
        <li>设备编号：{{ machineInfo.code }}</li>
        <li>设备Mac：{{ machineInfo.mac }}</li>
        <li>网关Mac：{{ machineInfo.mac }}</li>
        <li v-if="markerType === 'water'" class="machine-main-right-switch">
          <span> 远程开关: </span>
          <el-switch v-model="switchVal" @change="switchChange" class="ml-2" style="--el-switch-on-color: #11ab69" />
        </li>
        <li v-if="markerType === 'water'" class="machine-main-right-link" @click="toManagePage('water')">
          查看灌溉任务>>
        </li>
      </ul>
    </section>
    <section v-if="markerType === 'watch'" class="machine-bottom">
      <div class="machine-bottom-button" @click="toManagePage('warning')">查看预警记录</div>
      <div class="machine-bottom-button" @click="toManagePage('watch')">查看实时监控</div>
    </section>
    <section v-if="markerType === 'four'" class="machine-four">
      <div>数据参数 （ 更新时间：{{ updateTime }} ）</div>
      <ul class="machine-four-main">
        <li v-for="item in fourList" :key="item.label" class="machine-four-button">
          <span>{{ item.label }}</span>
          <span>{{ `${item.value || '--'}${item.unit}` }}</span>
        </li>
      </ul>
    </section>
    <!-- <section v-if="markerType === 'four'" class="machine-main-right-link">查看更多数据>></section> -->
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import machineWaterImg from '@/assets/img/machine-water.png'
import machineWatchImg from '@/assets/img/machine-watch.png'
import machineFourImg from '@/assets/img/machine-four.png'
import close from '@/assets/svg/close.svg?component'
import position from '@/assets/svg/position.svg?component'
import useHttpStore from '@/store/http'

const machineStateEnum = {
  '01': '故障',
  '02': '断电',
  '10': '正常'
}

const switchStateEnum = {
  '0': '关闭',
  '1': '开启'
}

const waterStateEnum = {
  '0': '缺水',
  '1': '正常'
}

const pumpStateEnum = {
  '0': '故障',
  '1': '正常'
}

const netStateEnum = {
  '01': '故障',
  '02': '断电',
  '03': '断网',
  '10': '正常'
}

const machineImgEnum = {
  water: machineWaterImg,
  four: machineFourImg,
  watch: machineWatchImg
}

const machineNameEnum = {
  water: '水肥一体机',
  four: '四情监测',
  watch: '监控球机'
}

const fourList = ref([
  {
    label: '风速',
    prop: 'windSpeed',
    value: '',
    unit: 'm/s'
  },
  {
    label: '风向',
    prop: 'windDirection',
    value: '',
    unit: ''
  },
  {
    label: '降雨量',
    prop: 'rainfall',
    value: '',
    unit: 'mm'
  },
  {
    label: '空气温度',
    prop: 'highTemperatur',
    value: '',
    unit: '℃'
  },
  {
    label: '土壤温度',
    prop: 'soilTemperature',
    value: '',
    unit: '℃'
  },
  {
    label: '土壤湿度',
    prop: 'soilMoisture',
    value: '',
    unit: '%'
  },
  {
    label: '太阳辐射',
    prop: 'radiation',
    value: '',
    unit: 'W/m²'
  },
  {
    label: '光照',
    prop: 'illumination',
    value: '',
    unit: 'Klux'
  },
  {
    label: 'pH值',
    prop: 'ph',
    value: '',
    unit: ''
  },
  {
    label: '氮含量',
    prop: 'nitrogen',
    value: '',
    unit: 'mg/kg'
  },
  {
    label: '磷含量',
    prop: 'phosphorus',
    value: '',
    unit: 'mg/kg'
  },
  {
    label: '钾含量',
    prop: 'potassium',
    value: '',
    unit: 'mg/kg'
  }
])

const updateTime = ref('')

const isShow = ref(false)

const switchVal = ref(true)

const machineInfo = ref({} as any)

const markerType = ref('water' as keyof typeof machineImgEnum)

const getImgUrl = computed(() => machineImgEnum[markerType.value])
const getMachineName = computed(() => machineNameEnum[markerType.value])

const handleOpen = (value: any, marker: string) => {
  machineInfo.value = value
  markerType.value = (marker as keyof typeof machineImgEnum) || 'water'
  switchVal.value = machineInfo.value.status === 1
  if (marker === 'four') {
    queryWebCollectorGetDevice()
  }
  isShow.value = true
}

const toManagePage = (markerType: any) => {
  switch (markerType) {
    case 'water':
      window.open(`${import.meta.env.VITE_MANAGE_HOST}/zhny/zhny/assignment?fertilizationId=${machineInfo.value.id}`)
      break
    case 'warning':
      window.open(`${import.meta.env.VITE_MANAGE_HOST}/zhny/zhny/deviceWarning?deviceType=camera`)
      break
    case 'watch':
      window.open(`${import.meta.env.VITE_MANAGE_HOST}/zhny/zhny/deviceCamera/detail/${machineInfo.value.id}`)
      break
    default:
      break
  }
}

const queryWebCollectorGetDevice = async (id = '') => {
  try {
    const { data = {} } = await axios.post<any>(api.webCollectorGetDevice, {
      id: machineInfo.value.id
    })
    const dataObj = { ...data, ...data.weather, ...data.growthParam, ...data.zhGrowth }
    fourList.value.forEach((item) => {
      item.value = dataObj[item.prop]
    })
    updateTime.value = (dayjs(dataObj.updateTime).isValid() ? dayjs(dataObj.updateTime) : dayjs()).format('YYYY-MM-DD')
  } catch (error) {
    console.log(error)
  }
}

const handleClose = () => {
  isShow.value = false
}

const { axios, api } = useHttpStore()

const emit = defineEmits(['change'])

const switchChange = useDebounceFn(async (val: any) => {
  const { data } = await axios.post<any>(api.webFertilizationEdit, {
    id: machineInfo.value.id,
    switchState: val
  })
  emit('change')
}, 1000)

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
  min-height: 300px;
  background-color: rgba(5, 15, 48, 0.4);
  border: solid 1px #1a7683;
  color: #f0f0f0;
  padding: 12px 20px;
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
        font-size: 12px;
        text-align: right;
        margin-top: 15px;
      }
    }
  }
  &-bottom {
    display: flex;
    justify-content: space-between;
    // gap: 20px;
    margin-top: 40px;
    &-button {
      width: 130px;
      height: 30px;
      background-color: transparent;
      border: solid 1px #25faf3;
      cursor: pointer;
      color: #25faf3;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: rgba(37, 250, 243, 0.2);
      }
    }
  }
  &-four {
    font-size: 12px;
    &-main {
      margin-top: 12px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px 17px;
      list-style: none;
      & > li {
        height: 46px;
        border: solid 1px #25faf3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        line-height: 1em;
        color: #25faf3;
      }
    }
  }
}
.close {
  cursor: pointer;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
