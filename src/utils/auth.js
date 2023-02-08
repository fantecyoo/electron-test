const TokenKey = "ims-file-manager-access-token"
const RefreshTokenKey = "ims-file-manager-refresh_token"
const MicrosoftTokenKey = "microsoft-access-token"
const SHOWAGAIN = "showAgainFlag"

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
