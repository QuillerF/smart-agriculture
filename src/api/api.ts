// const files = import.meta.glob('../api/modules/*.ts', { import: 'default', eager: true })
// // 合并所有的API
// const allApi = Object.keys(files).reduce((con, src: string) => Object.assign(con, files[src]), {})
// export default allApi

import data from './modules/data'
import common from './modules/common'

export default {
  ...data,
  ...common
} as typeof data & typeof common
