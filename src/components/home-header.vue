<!--
 * @Descripttion: 首页头部
 * @Author: yuanxiongfeng
 * @Date: 2022-12-04 18:37:17
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2023-01-03 02:21:35
-->
<template>
  <header class="home-header">
    <section class="home-header-content">
      <div>
        <img :src="topPosImg" alt="" />
        <span>东方红智慧农业大数据平台</span>
      </div>
      <div>
        <component :is="getWeatherImg"></component>
        <!-- <img :src="getWeatherImg" alt="" /> -->
        <span>{{ weather.wea }}</span>
        <span style="color: #49a3ff">{{ weather.tem_day }}°C</span>
      </div>
      <div>
        <img :src="topCalenderImg" alt="" />
        <span style="color: #49a3ff">{{ dayjs().format('YYYY.MM.DD') }}</span>
        <span>星期{{ WeeksEnum[dayjs().day()] }}</span>
      </div>
      <div>
        <img :src="topManagerImg" alt="" />
        <span style="color: #49a3ff">{{ userName }}</span>
        <span style="margin-left: 10px">退出</span>
      </div>
    </section>
  </header>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import topPosImg from '@/assets/img/top-pos.png'
import topManagerImg from '@/assets/img/top-manager.png'
import topCalenderImg from '@/assets/img/top-calender.png'
import { WeeksEnum, WeatherImgs } from '@/model/home'
import { Ref } from 'vue'
import useHttpStore from '@/store/http'

const weather: Ref<any> = ref({})

const userName = ref('管理员')

const getWeatherImg = computed(() => WeatherImgs[(weather.value.wea_img as string) || 'qing'])

const { axios, api } = useHttpStore()

onMounted(() => {
  userName.value = Cookies.get('username') || '管理员'
  if (!sessionStorage.getItem('weather')) {
    getWeather()
    return
  }
  weather.value = JSON.parse(sessionStorage.getItem('weather') as string)
})

const getWeather = async () => {
  const res = await axios.get(
    'https://www.yiketianqi.com/free/day',
    {
      appid: '82555458',
      appsecret: '7KBO1M68',
      unescape: 1,
      vue: 1,
      city: '郑州'
    },
    {
      withCredentials: false
    }
  )
  sessionStorage.setItem('weather', JSON.stringify(res))
  weather.value = res
}
</script>

<style scoped lang="less">
.home-header {
  background: url('@/assets/img/top.png');
  background-repeat: no-repeat;
  background-size: auto;
  background-position: center -136px;
  width: 100%;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  &-content {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    align-items: center;
    align-self: center;
    gap: 120px;
    color: #d5e4f9;
    margin-top: 50px;
    padding: 0 50px;
    font-size: 15px;
    font-weight: 400;
    opacity: 0.9;
    img {
      display: inline-block;
    }
    & > div {
      display: flex;
      align-items: center;
      gap: 15px;
    }
  }
}
</style>
