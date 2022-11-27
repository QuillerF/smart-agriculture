import * as echarts from 'echarts'

import chinaJson from '@/assets/china.json'
import mapMark from '@/assets/img/map-mark.png'

echarts.registerMap('china', chinaJson as any) // 注册可用的地图

const geoCoordMap: Record<string, any> = {
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

export const ConvertData = (list: { name: any; area: any }[]) =>
  list.map(({ name, area }) => ({
    name,
    area,
    value: geoCoordMap[name]
  }))

const list = [
  {
    name: '河南',
    area: 500000
  },
  {
    name: '山东',
    area: 500000
  },
  {
    name: '黑龙江',
    area: 500000
  },
  {
    name: '新疆',
    area: 500000
  },
  {
    name: '江西',
    area: 500000
  },
  {
    name: '广西',
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
    zoom: 1.15,
    top: '10%',
    // left:'52%',
    label: {
      emphasis: {
        show: false
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
            return `{area|${params.data.area}亩}\n{title|${params.data.name}}`
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
      data: ConvertData(list),
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      zLevel: 1
    }
  ]
}
