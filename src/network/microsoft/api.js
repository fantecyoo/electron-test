import request from "@/network/index.js"
import instance from "@/network/microsoft.js"
import { ref } from "vue"

export function getMicrosoftTokenFromIMS() {
  return request({
    url: "/resource/sharepoint/client/token",
    method: "get"
  })
}

export function getMicrosoftSite() {
  return request({
    url: "/resource/sharepoint/client/main-site",
    method: "get"
  })
}

export function getSharePointListById(itemId) {
  return instance({
    url: `https://graph.microsoft.com/v1.0/sites/customsiteid/drive/items/${itemId}/children`,
    method: "get",
    headers: {
      isToken: false
    }
  })
}

export function getSharePointList() {
  return instance({
    url: `https://graph.microsoft.com/v1.0/sites/customsiteid/drive/items/root/children`,
    method: "get",
    headers: {
      isToken: false
    }
  })
}

export function downloadSharePointFile(itemId) {
  return instance({
    url: `https://graph.microsoft.com/v1.0/sites/customsiteid/drive/items/${itemId}/content`,
    method: "get",
    headers: {
      isToken: false
    }
  })
}
