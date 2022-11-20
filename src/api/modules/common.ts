export default {
  login: '/EMS_SaaS_Web/Spring/MVC/entrance/unifier/getPersonByUserNameService', // 登录
  upload: '/upload/meos', // 上传接口
  download: '/download/meos', // 下载接口 ($api.download/key?filename="xx"  (filename对下载的文件重命名))
  downloadbyparams: '/download/postByParams/', // 通过参数下载接口
  downloadpdf: '/meos/pdf', // 导出pdf
  getpartitionProjectsByUserId: '/EMS_SaaS_Web/Spring/MVC/entrance/unifier/getpartitionProjectsByUserId',//当前账号项目权限仅包含已选中的项目权限
  queryUserProjectFunctionType: '/data-billboard-report/phoenicoGroupHomeController/queryUserProjectFunctionType'//获取业态信息
}
