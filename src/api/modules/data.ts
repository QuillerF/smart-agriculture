/*
 * @Descripttion: 数据接口
 * @Author: yuanxiongfeng
 * @Date: 2022-11-20 20:47:35
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-12 21:27:58
 */

export default {
  // 大屏顶部数据
  webTop: '/web/top',
  // 农作物占比-全国和项目大屏
  webProportion: '/web/proportion',
  // 已开放地区-全国和项目大屏
  webHomeLand: '/web/homeLand',
  // 产量统计-全国和项目大屏
  webCounting: '/web/counting',
  // 收入增长比-全国和项目大屏
  webIncomeRatio: '/web/incomeRatio',
  // 价格走势-三个大屏
  webPriceByYear: '/web/priceByYear',
  // 进度比-三个大屏
  webProgress: '/web/progress',
  // 仓储-全国和项目大屏
  webStorage: '/web/storage',
  // 项目概览-项目大屏/种植统计-地块大屏
  webProjects: '/web/projects',
  // 项目地块-地块大屏
  webProjectLands: '/web/projectLands',
  // 生长周期-地块大屏
  webGrowth: '/web/growth',

  // ? 灌溉管理
  // 灌溉管理-水肥机列表
  webFertilization: '/web/fertilization',
  // 水肥机远程开关
  webFertilizationEdit: '/web/fertilization/edit',
  // 查看灌溉任务
  getZhnyAssignment: '/zhny/assignment?fertilizationId=1',
  // ? 监控管理
  // 监控管理
  webCamera: '/web/camera',
  // 查看实时画面
  getZhnyDeviceCameraDetail: '/zhny/deviceCamera/detail',

  // ? 四清管理
  webCollector: '/web/collector',
  // 四情管理-设备数据
  webCollectorGetDevice: '/web/collector/getDevice',
  // ? 控制中心
  getZhnySystemMain: '/zhny/system/main',
  // ? 预警记录-地块大屏
  webWarning: '/web/warning',
  // 查看预警
  getZhnyDeviceWarning: '/zhny/deviceWarning?deviceType=camera&status=0'
}
