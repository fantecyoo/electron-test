import axios from "axios"
import { getToken, setToken, getRefreshToken } from "utils/auth.js"
import { router, routes } from "router/index.js"

axios.defaults.timeout = 3000
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500 // 默认的
}
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true

const instance = axios.create()

instance.interceptors.request.use(
  function (config) {
    const token = getToken()
    if (token) {
      config.headers["Authorization"] = "Token: " + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

let isRefreshing = false
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx-4xx 范围内的状态码都会触发该函数。
    const status = Number(response.status)
    if (status >= 401 && status !== 401) {
      Message({
        type: "info",
        duration: 5000,
        dangerouslyUseHTMLString: true,
        message:
          "An error has occurred. A report has been generated and sent automatically to IT support team."
      })
    }
    if (status == 400) {
      Notification({
        title: "Info",
        message: response.data ? response.data.msg : "An error has occurred",
        type: "info"
      })
    }
    if (status === 401) {
      router.push({ path: "/login" })
      return Promise.reject(error)
    }
    return response
  },
  function (error) {
    // 超出 5xx 范围的状态码都会触发该函数。
    // handle401(error)
    console.log("123")
    Message({
      type: "info",
      duration: 5000,
      dangerouslyUseHTMLString: true,
      message:
        "An error has occurred. A report has been generated and sent automatically to IT support team."
    })
    return Promise.reject(error)
  }
)

function handle401(err) {
  const status = Number(err.status)
  if (status === 401) {
    if (!isRefreshing) {
      isRefreshing = true
      let refreshToken = getRefreshToken()
      if (refreshToken) {
        return refreshToken(refreshToken)
          .then(res => {
            setRefreshToken(res.data.refresh_token)
            setToken(res.data.access_token)
            request.forEach(cb => cb())
            request = []
            return axios.request(response.config)
          })
          .catch(err => {})
          .finally(() => {
            isRefreshing = false
          })
      } else {
        store.dispatch("FedLogOut").then(() => {
          router.push({ path: "/login" })
        })
        return
      }
    } else {
      //正在刷新token
      return new Promise(resolve => {
        request.push(() => {
          resolve(axios.request(response.config))
        })
      })
    }
  }
}

export default instance
