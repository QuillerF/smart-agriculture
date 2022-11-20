import { defineStore } from 'pinia'

const useSystemStore = defineStore({
  id: 'system',
  state: () => ({
    userInfo: { pd: '', user_id: '', person_id: '' },
    authId: [] as string[],
    breadcrumbArr: [] as any[],
    themeColor: 'white',
    projects: [] as any[],
    project_id: ''
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
      if (params.authorizations && params.authorizations.length) {
        const authId = new Set(
          params.authorizations.map(({ authorizationId }: any) => authorizationId).filter((item: any) => item)
        )
        this.authId = [...authId] as any
      } else {
        this.authId = []
      }
    },
    // 修改projectId
    changeProjectId(params: string) {
      this.project_id = params
    },
    // 更改面包屑数据
    changeBreadcrumb(params: any) {
      if (Array.isArray(params)) {
        this.breadcrumbArr = params || []
      } else {
        const sessionBreadcrumbArr = sessionStorage.getItem('breadcrumbArr')
        if (sessionBreadcrumbArr && sessionBreadcrumbArr != '[]') {
          this.breadcrumbArr = JSON.parse(sessionBreadcrumbArr)
          sessionStorage.removeItem('breadcrumbArr')
        }
        const findIndex = this.breadcrumbArr.findIndex((n: any) => n.path == params.path)
        if (findIndex === -1) {
          return this.breadcrumbArr.push(params)
        }
        this.breadcrumbArr.splice(findIndex + 1)
      }
    },

    // 更改当前选择的项目
    changeProjectsParams(params: any[]) {
      this.projects = params
    }
  }
})

export default useSystemStore
