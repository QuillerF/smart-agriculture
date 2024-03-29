export const Option = {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    // backgroundColor: 'rgba(31, 36, 41, 0.5)',
    borderWidth: 0,
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#ffed52',
        type: 'dotted'
      }
    },
    textStyle: {
      fontSize: 14
      // color: '#e6e6e7'
    },
    formatter: '{b}年<br/> {a0}：{c0}元'
  },
  legend: {
    show: false,
    top: '0',
    right: '3%',
    icon: 'roundRect',
    itemWidth: 12,
    itemHeight: 2,
    textStyle: {
      color: '#ffffff',
      fontStyle: 'normal',
      fontSize: 14
    }
  },
  grid: {
    top: 40,
    left: 20,
    right: 20,
    bottom: 20,
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [] as any,
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#396990'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#92714d',
          opacity: 0.5,
          type: 'solid'
        }
      },
      axisLabel: {
        formatter: `{value}年`,
        color: '#bcbcbc',
        fontSize: 14,
        margin: 8
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '(价格:元)',
      nameGap: 10,
      nameTextStyle: {
        color: '#bebebe',
        fontSize: 14
      },
      min: 0,
      max(data: { max: number }) {
        return data.max < 1 || isNaN(data.max) ? 1 : null
      },
      axisLabel: {
        formatter: '{value}',
        color: '#bcbcbc',
        fontSize: 14
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#396990'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#454e68',
          opacity: 0.5,
          type: 'dashed'
        }
      }
    }
  ],
  series: [
    {
      name: '小麦',
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        width: 2,
        color: '#57aeff'
      },
      itemStyle: {
        color: '#57aeff'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(101,155,210,0.2)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(101,155,210,0)' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      data: [] as any
    }
  ]
}
