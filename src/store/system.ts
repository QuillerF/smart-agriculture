import { defineStore } from 'pinia'

const useSystemStore = defineStore({
  id: 'system',
  state: () => ({
    userInfo: { userId: '' },
    districtId: '',
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
    // 修改districtId
    changeProvinceData(data: any) {
      this.provinceData = data
    },
    // 修改districtId
    changeIsProject(val: boolean) {
      this.isProject = val
    }
  }
})

export default useSystemStore
