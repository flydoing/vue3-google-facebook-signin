<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="facebook-signin" ref="refFacebookSignin">
    <slot></slot>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
const emit = defineEmits(['success', 'error', 'faillure'])
// const facebook_sdk_src = 'https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v3.3&appId=替换成自己的&autoLogAppEvents=1'

const props = defineProps({
  appId: {
    type: String,
    required: true,
    default: ''
  },
  params: {
    type: Object,
    default() {
      return {
        scope: 'email,user_likes',
        return_scopes: true
      }
    }
  }
})
const facebook_sdk_src = `https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v3.3&appId=${props.appId}&autoLogAppEvents=1`
const refFacebookSignin = ref(null)
function initLoadFB() {
  // 加载sdk
  (function (d, s, id) {
    const fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) { return }
    const js = d.createElement(s); js.id = id
    js.src = facebook_sdk_src
    fjs.parentNode.insertBefore(js, fjs)
  }(document, 'script', 'facebook-jssdk'))
}
onMounted(() => {
  if (!props.appId) {
    emit('error', 'FacebookSignin=>参数缺失：appId')
    return
  }
  initLoadFB()
  refFacebookSignin.value.addEventListener('click', () => {
    if (!document.getElementById('facebook-jssdk')) {
      console.log('facebook-jssdk 加载中，请稍微...')
      return
    }
    window.FB.login((response) => {
      emit(response.authResponse ? 'success' : 'error', response)
    }, props.params)
  })
})

</script>
<script>
export default {
  name: 'FacebookSignin'
}
</script>
