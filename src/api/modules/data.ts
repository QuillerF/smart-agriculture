/*
 * @Descripttion:
 * @Author: fyl
 * @Date: 2021-10-20 14:05:35
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-11-17 16:18:42
 */
export default {
  // 项目看板
  // 能效指标类型列表
  queryEnergyEfficiencyIndexList: '/data-billboard-report/paradisaGroupHomeController/queryEnergyEfficiencyIndexList',
  // 项目信息
  queryProjectInfo: '/data-billboard-report/paradisaProjectHomeController/queryProjectInfo',
  // 项目月实际用电量&计划用电量（月定额）
  publicAreaRealAndPlanTotalElec: '/budget-manage/Spring/MVC/entrance/unifier/GetProjectSummaryV146',
  // 项目月实际用电量&计划用电量（月定额）
  queryProjectMonthAlarm: '/data-billboard-report/merchantsShekouProjectController/queryProjectMonthAlarm',
  // 能耗趋势（本月每天/本年每月）
  publicAreaRealAndPlanElecList: '/budget-manage/Spring/MVC/entrance/unifier/GetItemMonthDataListV146',
  // 碳排放&能耗走势
  publicAreaCarbonList: '/data-billboard-report/merchantsShekouProjectController/publicAreaCarbonList',
  // 能耗分布
  elecDistribution: '/data-billboard-report/merchantsShekouProjectController/elecDistribution',
  // 公区节能率
  publicAreaElecRateList: '/data-billboard-report/merchantsShekouProjectController/publicAreaElecRateList',
  // 能效指标
  queryProjectEnergyEfficiencyIndexData:
    '/energy-efficiency/Spring/MVC/entrance/unifier/queryObjectEfficiencyTargetChart',
  // 获取能效指标评价
  queryProjectEnergyEfficiencyIndexEvaluate:
    '/data-billboard-report/paradisaProjectHomeController/queryProjectEnergyEfficiencyIndexEvaluate',
  // 环境品质
  queryProjectEnvironmentalQuality:
    '/data-billboard-report/merchantsShekouProjectController/queryProjectEnvironmentalQuality',
  // 年能耗指标
  queryProjectElecIndicator: 'data-billboard-report/merchantsShekouProjectController/queryProjectElecIndicator',
  // 项目热平衡率
  queryProjectHeatBalance: '/data-billboard-report/merchantsShekouProjectController/queryProjectHeatBalance',
  // 项目多套中央供冷系统
  queryProjectToObject: '/data-billboard-report/merchantsShekouProjectController/queryProjectToObject',
  // 项目环境不达标次数
  environmentFloorUnqualifiedQuantityProject:
    '/data-billboard-report/merchantsShekouProjectController/environmentFloorUnqualifiedQuantity',

  // 集团看板
  // 公、租区电耗占比
  publicRentAreaTotalElec: 'data-billboard-report/merchantsShekouGroupController/projectsPublicRentAreaElecList',
  // 公区总电耗
  publicAreaRealAndPlanElecListGroup: '/budget-manage/Spring/MVC/entrance/unifier/getEnergyOverviewEnergyInfoList',
  // 本月告警管理
  projectsMonthAlarm: 'data-billboard-report/merchantsShekouGroupController/projectsMonthAlarm',
  // 气候区
  listClimateZoneService: '/EMS_SaaS_Web/Spring/MVC/entrance/unifier/listClimateZoneService',
  // 总能耗指标排名
  totalElecIndicatorRank: '/data-billboard-report/merchantsShekouGroupController/totalElecIndicatorRank',
  // 碳排放量&能耗趋势
  publicAreaTotalCarbonList: '/data-billboard-report/merchantsShekouGroupController/publicAreaTotalCarbonList',
  // 去年各项目公区节能率
  yesteryearProjectsPublicAreaElecRate:
    '/data-billboard-report/merchantsShekouGroupController/yesteryearProjectsPublicAreaElecRate',
  // 接入项目总数&总面积
  projectsNumAndArea: '/data-billboard-report/merchantsShekouGroupController/projectsNumAndArea',
  // 项目总能耗&总碳排放量
  totalElecAndCarbon: '/data-billboard-report/merchantsShekouGroupController/totalElecAndCarbon',
  // 接入项目列表
  queryUserProjectFunctionType: '/data-billboard-report/phoenicoGroupHomeController/queryUserProjectFunctionType',
  // 单项目总设备数量
  queryExpectScrapCountByProjects:
    'data-billboard-report/merchantsShekouGroupController/queryExpectScrapCountByProjects',
  // 单项目公区总能耗&年实际电耗
  publicAreaTotalElecList: '/data-billboard-report/merchantsShekouGroupController/publicAreaTotalElecList',
  // 冷站能效
  queryGroupEnergyEfficiencyIndex: '/energy-efficiency/Spring/MVC/entrance/unifier/queryProjectEfficiencyTargetChart',
  // 环境品质
  queryGroupEnvironmentalQuality: '/data-billboard-report/phoenicoGroupHomeController/queryGroupEnvironmentalQuality',
  // 环境品质分类列表
  queryGroupEnvironmentTypeList: '/data-billboard-report/paradisaGroupHomeController/queryGroupEnvironmentTypeList',
  // 集团热平衡率
  queryGroupHeatBalance: '/data-billboard-report/merchantsShekouGroupController/queryGroupHeatBalance',
  // 集团环境不达标次数
  environmentFloorUnqualifiedQuantityGroup:
    '/data-billboard-report/merchantsShekouGroupController/environmentFloorUnqualifiedQuantity',
  // 不平衡率
  viewQueryList: '/iot-data-analysis/alarm/show/view/queryList'
}
