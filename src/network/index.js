import axios from "axios"
import { getToken, setToken, getRefreshToken } from "@/utils/auth.js"
import { router, routes } from "@/router/index.js"
import { ElMessage, ElNotification } from "element-plus"
import { getRefreshTokenApi } from "@/network/login/login.js"
import { serialize } from "@/utils/utils"
const errorCode = {
  "000": "Network error: Connection failed",
  401: "Unauthorized: Access to this resource is denied.",
  403: "Forbidden: You don’t have permission to access this server.",
  404: "Page not found.",
  417: "Expectation Failed",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  default: "System error. Your system administrator has been notified."
}

axios.defaults.timeout = 60000
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500 // 默认的
}
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "https://oritech.dev:5888/"
} else {
  axios.defaults.baseURL = "https://oritech.dev:5888/"
}

let data = {}
// HTTPrequest拦截
axios.interceptors.request.use(
  config => {
    if (!data[config.url]) {
      data[config.url] = config
    } else {
      if (
        data[config.url].url == config.url &&
        config.method != "get" &&
        config.method != "delete"
      ) {
        if (!data[config.url].data && !config.data) {
          return false
        } else {
          let dataData =
            typeof data[config.url].data == "object"
              ? JSON.stringify(data[config.url].data)
              : data[config.url].data
          let configData =
            typeof config.data == "object"
              ? JSON.stringify(config.data)
              : config.data
          if (dataData == configData) {
            return false
          }
        }
      } else {
        data[config.url] = config
      }
    }
    setTimeout(() => {
      data[config.url] = null
      delete data[config.url]
    }, 1000)

    // const TENANT_ID = getStore({name: 'tenantId'})
    const isToken = (config.headers || {}).isToken === false
    //让每个请求携带token
    let tokenInfo = getToken()
    if (tokenInfo && !isToken) {
      config.headers["Authorization"] = "bearer " + tokenInfo
    }
    // if (TENANT_ID) {
    //   config.headers['TENANT-ID'] = TENANT_ID // 租户ID
    // }

    // headers中配置serialize为true开启序列化
    if (config.method === "post" && config.headers.serialize) {
      config.data = serialize(config.data)
      delete config.data.serialize
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// HTTPresponse拦截
let isRefreshing = false
let request = []
let errorMessageHideList = [
  "The specified object was not found in the store., The process failed to get the correct properties."
]
axios.interceptors.response.use(
  response => {
    const status = Number(response.status) || 200
    const message =
      response.data.msg || errorCode[status] || errorCode["default"]
    if (status == 426 && response.data.code === 1) {
      ElNotification({
        title: "Warning",
        message: message,
        type: "warning"
      })
      // store.dispatch("FedLogOut").then(() => {
      router.push({ path: "/login" })
      // })
      return
    }
    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true
        if (getRefreshToken() && getRefreshToken() != "undefined") {
          return getRefreshTokenApi(getRefreshToken())
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
          // store.dispatch("FedLogOut").then(() => {
          router.push({ path: "/login" })
          // })
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

    if (status !== 200 || response.data.code === 1) {
      if (status != 400 && status != 401) {
        if (errorMessageHideList.indexOf(message) == -1) {
          ElMessage({
            type: "info",
            duration: 5000,
            dangerouslyUseHTMLString: true,
            message:
              "An error has occurred. A report has been generated and sent automatically to IT support team."
            // message: `System error, please click <span class="showBug" onclick="window.onclickSetBugs('${response.data.errorId}')" style="border-bottom:1px solid #07a0ff;color:#07a0ff;cursor:pointer;"> here</span> to report bug.
            //           <div>Error Id: ${response.data.errorId}</div>`,
          })
        }
      } else {
        if (errorMessageHideList.indexOf(message) == -1) {
          ElNotification({
            title: "Warning",
            message: message,
            type: "warning"
          })
        }
      }
      return Promise.reject(new Error(message))
    }
    if (status === 200 && response.data.code === 450) {
      ElNotification({
        title: "Warning",
        message: message,
        type: "warning"
      })
    }
    return response
  },
  error => {
    if (error.toString().indexOf("timeout") != -1) {
      ElMessage({
        type: "error",
        message: `Looks like the server is taking too long to respond. Please try again in a while.`
      })
    }
    return Promise.reject(new Error(error))
  }
)
export default axios
