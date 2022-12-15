// 构造器
export class OptionItem {
  type = 'liquidFill'

  radius = '80px'

  name = '小麦种植'

  center = ['25%', '25%']

  color = [
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: '#fa8a21' // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#fff231' // 100% 处的颜色
        }
      ]
    }
  ]

  data = [0, 0]

  backgroundStyle = {
    color: {
      type: 'radial',
      x: 0.5,
      y: 0.5,
      r: 0.55,
      colorStops: [
        {
          offset: 0.7,
          color: 'rgba(5, 26, 25, 0.1)' // 0% 处的颜色
        },
        {
          offset: 0.8,
          color: 'rgba(148, 255, 251, 0.1)' // 100% 处的颜色
        },
        {
          offset: 0.95,
          color: 'rgba(148, 255, 251, 0.24)' // 100% 处的颜色
        }
      ],
      globalCoord: false // 缺省为 false
    }
  }

  label = {
    formatter: ['{t|a}', '{a|50}{t|%}'].join('\n'),
    rich: {
      verticalAlign: 'bottom',
      t: {
        color: '#ecf0ff',
        fontSize: 14,
        padding: [0, 0, 0, 12]
      },
      a: {
        color: '#fee21d',
        fontSize: 20,
        lineHeight: 40,
        padding: [0, 0, 0, 12]
      }
    },
    position: 'right',
    align: 'left'
  }

  outline = {
    show: true,
    borderDistance: 2,
    itemStyle: {
      color: 'none',
      borderColor: 'rgba(241, 197, 78, 0.2)',
      borderWidth: 2,
      shadowBlur: 200,
      shadowColor: 'rgba(241, 197, 78, 0.2)'
    }
  }

  constructor({
    name,
    color1,
    color2,
    center,
    value = {
      value: 0.5,
      unit: '亩',
      real: 500000
    }
  }: {
    name: string
    color1: string
    color2: string
    center: string[]
    value: any
  }) {
    this.name = name
    this.color[0].colorStops = [
      {
        offset: 0,
        color: color1 // 0% 处的颜色
      },
      {
        offset: 1,
        color: color2 // 100% 处的颜色
      }
    ]
    this.center = center
    this.data = [value.value, value.value]
    this.label.formatter = [`{t|${name}}`, `{a|${value.real ?? '--'}}{t|${value.unit}}`].join('\n')
    this.label.rich.a.color = color2
  }
}

// 构造参数

export const OptionItemParam = [
  {
    name: '小麦种植',
    color1: '#fa8a21',
    color2: '#fff231',
    center: ['15%', '25%'],
    value: {
      value: 0,
      unit: '%',
      real: null
    }
  },
  {
    name: '水稻种植',
    color1: '#32d5f7',
    color2: '#30d0fd',
    center: ['65%', '25%'],
    value: {
      value: 0,
      unit: '%',
      real: null
    }
  },
  {
    name: '玉米种植',
    color1: '#30eea2',
    color2: '#2bddba',
    center: ['15%', '75%'],
    value: {
      value: 0,
      unit: '%',
      real: null
    }
  },
  {
    name: '其他种植',
    color1: '#e726f1',
    color2: '#e82cf8',
    center: ['65%', '75%'],
    value: {
      value: 0,
      unit: '%',
      real: null
    }
  }
]

export const OptionItemProjectParam = [
  {
    name: '惠安街道',
    color1: '#fa8a21',
    color2: '#fff231',
    center: ['15%', '25%'],
    value: {
      value: 0.5,
      unit: '亩',
      real: 500000
    }
  },
  {
    name: '红庙镇',
    color1: '#32d5f7',
    color2: '#30d0fd',
    center: ['65%', '25%'],
    value: {
      value: 0.5,
      unit: '亩',
      real: 500000
    }
  },
  {
    name: '葡萄架乡、闫楼乡',
    color1: '#30eea2',
    color2: '#2bddba',
    center: ['15%', '75%'],
    value: {
      value: 0.5,
      unit: '亩',
      real: 500000
    }
  },
  {
    name: '红庙北村',
    color1: '#e726f1',
    color2: '#e82cf8',
    center: ['65%', '75%'],
    value: {
      value: 0.5,
      unit: '亩',
      real: 500000
    }
  }
]
