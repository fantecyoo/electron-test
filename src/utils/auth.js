const TokenKey = "ims-file-manager-access-token"
const RefreshTokenKey = "ims-file-manager-refresh_token"
const SHOWAGAIN = "showAgainFlag"

export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
}
export function getRefreshToken() {
  return window.sessionStorage.getItem(RefreshTokenKey)
}

export function setToken(token) {
  return window.sessionStorage.setItem(TokenKey, token)
}

export function setRefreshToken(token) {
  return window.sessionStorage.setItem(RefreshTokenKey, token)
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
