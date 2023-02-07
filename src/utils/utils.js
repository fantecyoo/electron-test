import CryptoJS from "crypto-js"

/**
 *表单序列化
 */
export const serialize = data => {
  const list = []
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join("&")
}

/**
 *加密处理
 */
export const encryption = params => {
  let { data, type, param, key } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === "Base64") {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach(ele => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ""
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}

/**
 * 根据文件类型获取图标
 */
export const getFileLogo = fileName => {
  fileName = fileName.split(".")
  let fileType = fileName[fileName.length - 1]
  switch (fileType) {
    case "eml":
      fileType = "email"
      break
    default:
      break
  }
  return `https://res-1.cdn.office.net/files/fabric-cdn-prod_20220825.001/assets/item-types/16/${fileType}.svg`
}
