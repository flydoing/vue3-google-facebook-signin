<template>
  <FacebookSignin 
    :appId="facebookAppId" 
    @success="onSignInSuccessFacebook"
    @error="onSignInErrorFacebook"
  >
    <span class="btn-primary">Facebook登录自定义样式按钮</span>
  </FacebookSignin>
  <GoogleSignin
    :clientId="clientId"
    @success="onSignInSuccessGoogle"
    @error="onSignInErrorGoogle"
  >
    <span class="btn-primary">Google登录自定义样式按钮</span>
  </GoogleSignin>
</template>
<script setup>
import { ref } from 'vue'
// 本地调试
// import GoogleSignin from './packages/GoogleSignin/index'
// import FacebookSignin from './packages/FacebookSignin/index'

// npm install 安装后调用
import { GoogleSignin, FacebookSignin } from 'vue3-google-facebook-signin'

/*
 * 官方参考：facebook登录：https://developers.facebook.com/docs/facebook-login/web?locale=zh_CN
 * Facebook应用的appId
*/
const facebookAppId = ref('') // Facebook应用的appId
function onSignInSuccessFacebook(response) {
  // 成功回调数据，自行处理：response
  let facebookIdsStr = ''
  let facebookIdsList = []
  // 当存在多个userID时
  const userID = response.authResponse.userID
  if (userID) {
    window.FB.api(`/${userID}/ids_for_business`, function (response) {
      if (response && !response.error) {
        facebookIdsList = response.data
        facebookIdsList.map((item) => {
          facebookIdsStr = facebookIdsStr + item.id + ','
        })
        facebookIdsStr = facebookIdsStr.substring(
          0,
          facebookIdsStr.length - 1
        )
        console.log(facebookIdsList)
      }
    })
  } else {
    console.log('登录失败')
  }
}
function onSignInErrorFacebook(error) {
  console.log(error)
}

/*
 * 官方参考：google登录：https://developers.google.com/identity/sign-in/web/reference?hl=zh-cn#googleusergetauthresponseincludeauthorizationdata
 * 谷歌应用的clientId
*/
const clientId = ref('162166690503-hl5n584h6v4m4hv3htst8lnc4tpca9qt.apps.googleusercontent.com') // 谷歌应用的clientId
function onSignInSuccessGoogle(idToken) {
  console.log(idToken)
}
function onSignInErrorGoogle(error) {
  console.log(error)
}

</script>

<style scoped>
.btn-primary {
  display: inline-block;
  margin: 20px auto;
  padding: 5px 15px;
  color: #ffffff;
  background-color: #666666;
  border-radius: 10px;
  cursor: pointer;
}
</style>