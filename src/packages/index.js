
import GoogleSignin from './GoogleSignin/index'
import FacebookSignin from './FacebookSignin/index'

// 全局安装
const install = app => {
  app.use(GoogleSignin)
  app.use(FacebookSignin)
}
const AllSignin = {
  install
}

export {
  GoogleSignin,
  FacebookSignin
}

export default AllSignin

