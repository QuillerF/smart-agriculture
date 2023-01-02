import * as echarts from 'echarts'

let colors = [
  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
    {
      offset: 0,
      color: '#35b1fe'
    },
    {
      offset: 1,
      color: '#2491fa'
    }
  ]),
  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
    {
      offset: 0,
      color: '#19d995'
    },
    {
      offset: 1,
      color: '#14a569'
    }
  ])
]

let datas = [
  { name: '未完成', value: 0 },
  { name: '已完成', value: 0 }
]

export const Option = {
  backgroundColor: 'transparent',
  title: [
    {
      text: '占比',
      x: 'center',
      y: '43%',
      textStyle: {
        fontSize: 20,
        fontWeight: 'bolder',
        color: '#f0f0f0'
      }
    }
  ],
  tooltip: {
    trigger: 'item',
    formatter: '{b}\n{c}%'
  },
  series: [
    {
      type: 'pie',
      startAngle: -45,
      center: ['50%', '50%'],
      radius: [60, 80],
      itemStyle: {
        color: (params: { dataIndex: number }) => colors[params.dataIndex]
      },
      label: {
        show: true,
        formatter: (params: { name: any; value: any; dataIndex: number }) =>
          `${params.name}\n{yellow|${params.value}%}`,
        color: '#fff',
        fontSize: 14,
        lineHeight: 20,
        rich: {
          yellow: {
            color: '#ffbb39',
            fontSize: 30,
            lineHeight: 40
          }
        }
      },
      labelLine: {
        length: 25,
        length2: 25,
        lineStyle: {
          width: 1
        }
      },
      data: datas,
      z: 0
    }
  ]
}
