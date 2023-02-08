import axios from "axios"
import { setMicrosoftToken, getMicrosoftToken } from "@/utils/auth.js"
import { router, routes } from "@/router/index.js"
import { ElMessage, ElNotification } from "element-plus"
import { getMicrosoftTokenFromIMS } from "@/network/api.js"
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

const instance = axios.create({
  baseURL: "https://graph.microsoft.com/v1.0/",
  timeout: 60000,
  validateStatus: function (status) {
    return status >= 200 && status <= 500 // 默认的
  },
  withCredentials: true
})

// 跨域请求，允许保存cookie

let data = {}
instance.interceptors.request.use(
  config => {
    //让每个请求携带token
    let tokenInfo = getMicrosoftToken()
    if (tokenInfo) {
      config.headers["Authorization"] = "Bearer " + tokenInfo
    }

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
instance.interceptors.response.use(
  response => {
    const status = Number(response.status) || 200
    const message =
      response.data.msg || errorCode[status] || errorCode["default"]
    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true
        getMicrosoftToken()
          .then(res => {
            setMicrosoftToken(res.msg)
            request.forEach(cb => cb())
            request = []
            return instance.request(response.config)
          })
          .catch(err => {})
          .finally(() => {
            isRefreshing = false
          })
      } else {
        //正在刷新token
        return new Promise(resolve => {
          request.push(() => {
            resolve(instance.request(response.config))
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
export default instance
