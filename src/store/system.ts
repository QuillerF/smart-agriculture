import { defineStore } from 'pinia'

const useSystemStore = defineStore({
  id: 'system',
  state: () => ({
    userInfo: { userId: '' },
    provinceData: { id: '', name: '' },
    options: [] as any,
    cityId: '',
    districtId: '',
    projectId: '',
    isProject: false
  }),
  getters: {
    getProvinceId: (state) => state.provinceData.id || ''
  },
  actions: {
    // 修改用户信息
    changeUserInfo(params: any) {
      this.userInfo = params
    },
    // 修改省份数据
    changeProvinceData(data: any) {
      this.provinceData = data
    },
    // 修改下拉选择
    changeOptions(data: any) {
      this.options = data
    },
    // 修改cityId
    changeCityId(id: string) {
      this.cityId = id
    },
    // 修改districtId
    changeDistrictId(id: string) {
      this.districtId = id
    },
    // 修改projectId
    changeProjectId(id: string) {
      this.projectId = id
    },

    // 修改是否是项目页面
    changeIsProject(val: boolean) {
      this.isProject = val
    }
  }
})

export default useSystemStore
