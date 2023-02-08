<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <div class="login-container">
      <div style="margin-bottom: 20px; display: flex; align-items: center">
        <img src="/img/logo.png" alt="dahui" class="logo" />
        <!-- <span class="title">File Manager</span> -->
      </div>
      <el-input placeholder="Username" v-model="username"></el-input>
      <el-input
        placeholder="Password"
        v-model="password"
        type="password"
      ></el-input>
      <div class="sign-in" @click="handleLogin">Sign in</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { loginByUsername } from "@/network/login.js"
import { setToken, setRefreshToken, setMicrosoftToken } from "@/utils/auth.js"
import { getMicrosoftTokenFromIMS } from "@/network/api.js"
let username = ref("richard.ma")
let password = ref("123456")
let router = useRouter()

const handleLogin = async function () {
  await handleIMSToken()
  await handleMicrosoftToken()
  router.push({ path: "/index", query: { category: "all" } })
}

const handleIMSToken = async function () {
  let userInfo = {
    username: username.value,
    password: password.value
  }
  const { data: res } = await loginByUsername(userInfo)
  setToken(res.access_token)
  setRefreshToken(res.refresh_token)
}

const handleMicrosoftToken = async function () {
  const { data: res } = await getMicrosoftTokenFromIMS()
  setMicrosoftToken(res.msg)
}
</script>

<style lang="scss" scoped>
.sign-in {
  background-color: #005cac;
  color: white;
  padding: 5px;
  text-align: center;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  cursor: pointer;
}
.login-container {
  div {
    margin-bottom: 15px;
  }
  width: 400px;
}
.logo {
  max-width: 256px;
  height: 30px;
  vertical-align: middle;
  border: 0;
}
.title {
  font-size: 30px;
  margin-left: 10px;
}
</style>
