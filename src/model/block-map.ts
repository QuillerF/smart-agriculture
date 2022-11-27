import * as echarts from 'echarts'

import blockJson from '@/assets/block.json'
import mapMark from '@/assets/img/map-mark.png'

export const ConvertDataGeojson = (data: { lng: any; lat: any }[]) => {
  const init = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 44610,
        properties: { _draw_type: 'line' },
        geometry: {
          type: 'LineString',
          coordinates: [data.map((el) => [el.lng, el.lat])]
        }
      }
    ]
  }
  const features = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: []
    }
  }

  return init
}
const geojsonData = ConvertDataGeojson(blockJson)
console.log('block1', blockJson)
console.log('block2', geojsonData)

echarts.registerMap('block', geojsonData as any) // 注册可用的地图

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
    map: 'block',
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
  series: []
}
