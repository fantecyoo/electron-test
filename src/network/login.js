import request from "./index.js"
import { encryption, randomLenNum } from "@/utils/utils"
import qs from "qs"

export const loginByUsername = userInfo => {
  userInfo.code = ""
  userInfo.randomStr = randomLenNum(4, true)
  const user = encryption({
    data: userInfo,
    key: "pigxpigxpigxpigx",
    param: ["password"]
  })
  console.log(user)
  const grant_type = "password"
  let dataObj = qs.stringify({
    username: user.username,
    password: user.password
  })
  return request({
    url: "/auth/oauth/token",
    headers: {
      isToken: false,
      "TENANT-ID": "1",
      Authorization: "Basic aW1zOmltcw=="
    },
    method: "post",
    params: { randomStr: user.randomStr, code: user.code, grant_type },
    data: dataObj
  })
}

export const getRefreshTokenApi = refresh_token => {
  const grant_type = "refresh_token"
  return request({
    url: "/auth/oauth/token",
    headers: {
      isToken: false,
      "TENANT-ID": "1",
      Authorization: "Basic aW1zOmltcw=="
    },
    method: "post",
    params: { refresh_token, grant_type, scope: "server" }
  })
}
