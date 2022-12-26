import { defineStore } from 'pinia'

const useSystemStore = defineStore({
  id: 'system',
  state: () => ({
    userInfo: { userId: '' },
    districtId: '',
    projectId: '',
    provinceData: { id: '', name: '' },
    isProject: false
  }),
  getters: {
    getProvinceId: (state) => state.provinceData.id
  },
  actions: {
    // 修改用户信息
    changeUserInfo(params: any) {
      this.userInfo = params
    },
    // 修改districtId
    changeDistrictId(id: string) {
      this.districtId = id
    },
    // 修改projectId
    changeProjectId(id: string) {
      this.projectId = id
    },
    // 修改省份数据
    changeProvinceData(data: any) {
      this.provinceData = data
    },
    // 修改是否是项目页面
    changeIsProject(val: boolean) {
      this.isProject = val
    }
  }
})

export default useSystemStore
