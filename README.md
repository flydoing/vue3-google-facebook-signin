# vue3-google-facebook-signin

[![Build](https://github.com/gjincai/vue3-google-facebook-signin/actions/workflows/build.yaml/badge.svg)](https://github.com/gjincai/vue3-google-facebook-signin/actions/workflows/build.yaml) [![npm](https://img.shields.io/npm/v/vue3-google-facebook-signin)](https://www.npmjs.com/package/vue3-google-facebook-signin) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/vue3-google-facebook-signin) ![npm](https://img.shields.io/npm/dw/vue3-google-facebook-signin) ![NPM](https://img.shields.io/npm/l/vue3-google-facebook-signin)

海外第三方登录：facebook登录，google登录
(传入对应的Facebook应用的appId、谷歌应用的clientId即可)

## 安装

- With **NPM**

```bash
npm install -S vue3-google-facebook-signin
```

- With **Yarn**

```bash
yarn add vue3-google-facebook-signin
```

- With **PNPM**

```bash
pnpm add vue3-google-facebook-signin
```

## 开始使用

### 使用示例

```html
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
```

```html
<script setup>
import { ref } from 'vue'
import { GoogleSignin, FacebookSignin } from 'vue3-google-facebook-signin'
/*
 * facebook登录，官方参考：https://developers.facebook.com/docs/facebook-login/web?locale=zh_CN
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
 * google登录，官方参考：https://developers.google.com/identity/sign-in/web/reference?hl=zh-cn#googleusergetauthresponseincludeauthorizationdata
 * 谷歌应用的clientId
*/
const clientId = ref('') // 谷歌应用的clientId
function onSignInSuccessGoogle(idToken) {
  console.log(idToken)
}
function onSignInErrorGoogle(error) {
  console.log(error)
}

</script>
```

- 注意1：Facebook的登录，需要在Facebook的后台配置 `JavaScript SDK 允许使用的网域`，官网后台：[https://developers.facebook.com/](https://developers.facebook.com/)

- 注意2：Google的登录，需要在Google的后台控制台 `“Web 应用”的客户端 ID`处 配置 `已获授权的网域，已获授权的javascript来源，已获授权的重定向 URL`，官网后台：[https://console.developers.google.com/](https://console.developers.google.com/)
