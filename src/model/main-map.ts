import * as echarts from 'echarts'

import chinaJson from '@/assets/china.json'
import mapMark from '@/assets/img/map-mark.png'

echarts.registerMap('china', chinaJson as any) // 注册可用的地图

export const provinceMap: Record<string, any> = {
  北京: '110000',
  天津: '120000',
  河北: '130000',
  山西: '140000',
  内蒙古: '150000',
  辽宁: '210000',
  吉林: '220000',
  黑龙江: '230000',
  上海: '310000',
  江苏: '320000',
  浙江: '330000',
  安徽: '340000',
  福建: '350000',
  江西: '360000',
  山东: '370000',
  河南: '410000',
  湖北: '420000',
  湖南: '430000',
  广东: '440000',
  广西: '450000',
  海南: '460000',
  重庆: '500000',
  四川: '510000',
  贵州: '520000',
  云南: '530000',
  西藏: '540000',
  陕西: '610000',
  甘肃: '620000',
  青海: '630000',
  宁夏: '640000',
  新疆: '650000'
}

export const geoCoordMap: Record<string, any> = {
  北京: [116.4, 40.4],
  天津: [117.04, 39.52],
  河北: [115.21, 38.44],
  山西: [111.95, 37.65],
  内蒙古: [112.17, 42.81],
  辽宁: [123.42, 41.29],
  吉林: [126.32, 43.38],
  黑龙江: [128.34, 47.05],
  上海: [121.46, 31.28],
  江苏: [120.26, 32.54],
  浙江: [120.15, 29.28],
  安徽: [117.28, 31.86],
  福建: [118.31, 26.07],
  江西: [115.89, 27.97],
  山东: [118.01, 36.37],
  河南: [113.46, 34.25],
  湖北: [112.29, 30.98],
  湖南: [112.08, 27.79],
  广东: [113.98, 22.82],
  广西: [108.67, 23.68],
  海南: [110.03, 19.33],
  重庆: [107.51, 29.63],
  四川: [103.36, 30.65],
  贵州: [106.91, 26.67],
  云南: [101.71, 24.84],
  西藏: [89.13, 30.66],
  陕西: [108.94, 34.46],
  甘肃: [103.82, 36.05],
  青海: [97.07, 35.62],
  宁夏: [106.27, 36.76],
  新疆: [86.61, 40.79]
}
export interface returnItemType {
  id: string
  name: string
  area: number
  lng: string
  lat: string
  value: string[]
  standbyValue: string[]
}

export const ConvertData = (list: returnItemType[]) =>
  list.map(({ name, area, lng, lat, id }) => ({
    id,
    name,
    area,
    value: [lng, lat],
    standbyValue: geoCoordMap[name.slice(0, -1)]
  }))

export const henanList = [
  {
    name: '新乡',
    value: [113.9336, 35.30964],
    area: 500000
  },
  {
    name: '郑州',
    value: [113.631419, 34.753439],
    area: 500000
  },
  {
    name: '洛阳',
    value: [112.459421, 34.624263],
    area: 500000
  }
]

export const Option = {
  backgroundColor: '#031554',
  title: {
    left: 'left',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'item',
    show: false
  },
  geo: {
    map: 'china',
    center: geoCoordMap['陕西'],
    zoom: 1.15,
    top: '10%',
    label: {
      emphasis: {
        show: true,
        color: '#37fdff'
      }
    },
    roam: true,
    itemStyle: {
      normal: {
        areaColor: '#051e5f',
        borderColor: '#114182',
        borderWidth: 1,
        shadowBlur: 0,
        shadowColor: '#114182',
        shadowOffsetX: 0,
        shadowOffsetY: 0
      },
      emphasis: {
        label: {
          show: false
        },
        areaColor: 'rgba(0, 255, 255, .1)'
      }
    }
  },

  // 地图标记点
  series: [
    {
      name: '地图标记点',
      type: 'scatter',
      coordinateSystem: 'geo',
      symbol: `image://${mapMark}`,
      symbolSize: [74, 100],
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 14,
            align: 'center',
            lineHeight: 60
          },
          formatter(params: { data: { area: any; name: any } }) {
            return `{area|${params.data.area.toFixed(0)}亩}\n{title|${params.data.name}}`
          },
          rich: {
            area: {
              color: '#37fdff'
            },
            title: {
              color: '#020b24',
              fontWeight: 600,
              padding: [0, 0, 0, -5]
            }
          }
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: 18,
            align: 'center',
            lineHeight: 66
          }
        }
      },
      itemStyle: {
        normal: {
          color: '#D8BC37' // 标志颜色
        }
      },
      data: [] as any,
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      zLevel: 1
    }
  ]
}
