const TokenKey = "ims-file-manager-access-token"
const RefreshTokenKey = "ims-file-manager-refresh_token"
const MicrosoftTokenKey = "microsoft-access-token"
const MicrosoftSiteKey = "microsoft-site-id"
const UserInfoKey = "ims-user-info"

export function getToken() {
  return window.localStorage.getItem(TokenKey)
}
export function getRefreshToken() {
  return window.localStorage.getItem(RefreshTokenKey)
}

export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function setRefreshToken(token) {
  return window.localStorage.setItem(RefreshTokenKey, token)
}

export function getMicrosoftToken() {
  return window.localStorage.getItem(MicrosoftTokenKey)
}

export function setMicrosoftToken(token) {
  return window.localStorage.setItem(MicrosoftTokenKey, token)
}

export function getMicrosoftSiteId() {
  return window.localStorage.getItem(MicrosoftSiteKey)
}

export function setMicrosoftSiteId(token) {
  return window.localStorage.setItem(MicrosoftSiteKey, token)
}

export function getUserInfo() {
  return window.localStorage.getItem(UserInfoKey)
}

export function setUserInfo(token) {
  return window.localStorage.setItem(UserInfoKey, token)
}

export function deleteAuthToken() {
  const tokenList = [
    TokenKey,
    RefreshTokenKey,
    MicrosoftTokenKey,
    MicrosoftSiteKey,
    UserInfoKey
  ]
  tokenList.forEach(key => {
    window.localStorage.removeItem(key)
  })
}
// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

// export function getShowAgainFlag() {
//   return Cookies.get(SHOWAGAIN)
// }

// export function setShowAgainFlag(falg) {
//   return Cookies.set(SHOWAGAIN, falg)
// }

// export function setCookies(cookiesName, token) {
//   return Cookies.set(cookiesName, token)
// }

// export function getCookies(cookiesName) {
//   return Cookies.get(cookiesName)
// }

// export function removeCookies(cookiesName) {
//   return Cookies.remove(cookiesName)
// }
