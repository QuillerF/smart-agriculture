import { defineStore } from 'pinia'

const useSystemStore = defineStore({
  id: 'system',
  state: () => ({
    userInfo: { pd: '', user_id: '', person_id: '' },
    authId: [] as string[],
    districtId: ''
  }),
  getters: {
    hasAuth: (state: any) => (key: string) => {
      try {
        return state.authId.includes(key)
      } catch {
        return false
      }
    }
  },
  actions: {
    // 修改用户信息
    changeUserInfo(params: any) {
      this.userInfo = params
    },
    // 修改districtId
    changeDistrictId(id: string) {
      this.districtId = id
    }
  }
})

export default useSystemStore
