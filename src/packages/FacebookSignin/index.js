
import FacebookSignin from './index.vue'
FacebookSignin.install = app => {
  app.component(FacebookSignin.name, 'FacebookSignin')
}


export default FacebookSignin

