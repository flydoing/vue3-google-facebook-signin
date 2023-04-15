
import GoogleSignin from './index.vue'
GoogleSignin.install = app => {
  app.component(GoogleSignin.name, 'GoogleSignin')
}


export default GoogleSignin

