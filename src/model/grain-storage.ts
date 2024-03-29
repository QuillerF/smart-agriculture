import * as echarts from 'echarts'

const dataArr = [
  {
    value: 0,
    name: '存储量'
  }
]

const color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
  {
    offset: 0,
    color: '#2387ec' // 0% 处的颜色
  },
  {
    offset: 0.99,
    color: '#2ce7ad' // 100% 处的颜色
  },
  {
    offset: 1,
    color: '#aad7fc' // 100% 处的颜色
  }
])

const colorSet = [
  [0, color],
  [1, '#202e5c']
]

const rich = {
  title: {
    fontSize: 16,
    color: '#31e4ff',
    lineHeight: 30
  },
  value: {
    fontSize: 32,
    color: '#31e4ff',
    lineHeight: 40
  }
}
// 环形图配置
export const Option = {
  backgroundColor: 'transparent',
  series: [
    {
      type: 'gauge',
      radius: 95,
      center: ['50%', 121],
      startAngle: '225',
      endAngle: '-45',
      pointer: {
        show: false
      },
      detail: {
        formatter(value: number) {
          let num = Number(value).toFixed(1)
          return `{title|存储量}\n{value|${num}}\n{title|万吨}`
        },
        rich,
        offsetCenter: [0, 0]
      },
      data: dataArr,
      title: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: colorSet,
          width: 30,
          opacity: 1
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    }
  ]
}

// 仓储下半部分数据
import storeItem from '@/assets/img/store-item-bg.png'

let nodes = [
  {
    x: 350,
    y: 1000,
    nodeName: '01',
    svgPath: storeItem
  },
  {
    x: 650,
    y: 1000,
    nodeName: '02',
    svgPath: storeItem
  },
  {
    x: 800,
    y: 50,
    nodeName: '03',
    svgPath: storeItem
  },
  {
    x: 500,
    y: 50,
    nodeName: '04',
    svgPath: storeItem
  },
  {
    x: 200,
    y: 50,
    nodeName: '05',
    svgPath: storeItem
  }
]

let charts = {
  nodes: [] as any,
  linesData: [
    {
      coords: [
        [350, 1000],
        [650, 1000],
        [800, 1000],
        [800, 50],
        [500, 50],
        [200, 50],
        [200, 1000],
        [350, 1000]
      ]
    }
  ]
}

for (let j = 0; j < nodes.length; j++) {
  const { x, y, nodeName, svgPath } = nodes[j]
  let node = {
    nodeName,
    nodeStatus: '正常',
    value: [x, y],
    symbolSize: [70, 110],
    symbol: `image://${svgPath}`,
    itemStyle: {
      color: '#030f30'
    }
  }
  charts.nodes.push(node)
}

export const OptionStore = {
  backgroundColor: 'transparent',
  xAxis: {
    min: 0,
    max: 1000,
    show: false,
    type: 'value'
  },
  yAxis: {
    min: 0,
    max: 1000,
    show: false,
    type: 'value'
  },
  series: [
    {
      type: 'lines',
      polyline: true,
      coordinateSystem: 'cartesian2d',
      lineStyle: {
        type: 'solid',
        width: 1,
        color: '#0c4964',
        curveness: 0.3
      },
      effect: {
        show: true,
        period: 10,
        trailLength: 0.1,
        symbol: 'rect',
        color: '#33eef1',
        symbolSize: [3, 6]
      },
      data: charts.linesData
    },
    {
      type: 'graph',
      coordinateSystem: 'cartesian2d',
      label: {
        show: true,
        position: 'inside',
        align: 'center',
        formatter(item: { data: { nodeName: any; nodeStatus: string } }) {
          return `{title|${item.data.nodeName}}\n{desc|${item.data.nodeStatus}}`
        },
        rich: {
          title: {
            color: '#31e4ff',
            fontSize: 14,
            lineHeight: 30
          },
          desc: {
            color: '#24d356',
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 40
          }
        }
      },
      zLevel: 100,
      data: charts.nodes
    }
  ]
}
