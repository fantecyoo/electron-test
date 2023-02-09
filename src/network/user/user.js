import request from "@/network/index.js"

export const getUserInfoApi = userInfo => {
  return request({
    url: "/admin/user/info",
    method: "get"
  })
}
