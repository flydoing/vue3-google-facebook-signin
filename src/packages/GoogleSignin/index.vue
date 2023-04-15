<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="google-signin" ref="refGoogleSignin">
    <slot></slot>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
const emit = defineEmits(['success', 'error', 'faillure'])
const google_sdk_src = 'https://apis.google.com/js/api:client.js'
/*
googleSignInParams: {
  clientId: ''
}
*/
const props = defineProps({
  clientId: {
    type: String,
    required: true,
    default: ''
  }
})
const refGoogleSignin = ref(null)

function initLoadGoogle() {
  if (!props.clientId) {
    emit('error', 'GoogleSignin=>参数缺失：clientId')
    return
  }
  // 加载sdk
  const googleSignInAPI = document.createElement('script')
  googleSignInAPI.setAttribute('src', google_sdk_src)
  document.head.appendChild(googleSignInAPI)
  googleSignInAPI.onload = InitGoogle

  function InitGoogle() {
    window.gapi.load('auth2', () => {
      const auth2 = window.gapi.auth2.init({
        clientId: props.clientId
      })
      auth2.attachClickHandler(refGoogleSignin, {}, (googleUser) => {
        emit('success', googleUser.getAuthResponse().id_token)
      }, (error) => {
        emit('error', error)
        emit('failure', error)
      })
    })
  }
}
onMounted(() => {
  initLoadGoogle()
})

</script>
<script>
export default {
  name: 'GoogleSignin'
}
</script>