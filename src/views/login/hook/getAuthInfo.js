import { loginByUsername } from "@/network/login/login.js"
import {
  setToken,
  setRefreshToken,
  setMicrosoftToken,
  setMicrosoftSiteId,
  setUserInfo,
  getUserInfo
} from "@/utils/auth.js"
import {
  getMicrosoftTokenFromIMS,
  getMicrosoftSite
} from "@/network/microsoft/api.js"

const handleIMSToken = async function (username, password, localUserInfo) {
  let userInfo = {
    username: username.value || localUserInfo.username,
    password: password.value || localUserInfo.password
  }
  const { data: res } = await loginByUsername(userInfo)
  setUserInfo(JSON.stringify(userInfo))
  setToken(res.access_token)
  setRefreshToken(res.refresh_token)
}

const handleMicrosoftToken = async function () {
  const { data: res } = await getMicrosoftTokenFromIMS()
  setMicrosoftToken(res.msg)
}

const hanleSiteId = async function () {
  const { data: res } = await getMicrosoftSite()
  setMicrosoftSiteId(res.msg)
}

export async function getInfo(username, password, localUserInfo) {
  await handleIMSToken(username, password, localUserInfo)
  await handleMicrosoftToken()
  await hanleSiteId()
}
