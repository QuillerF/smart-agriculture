const files = import.meta.glob('../api/modules/*.ts', { eager: true })
// 合并所有的API
const allApi = Object.keys(files).reduce((con: any, src: string) => Object.assign(con, (files as any)[src].default), {})
export default allApi
