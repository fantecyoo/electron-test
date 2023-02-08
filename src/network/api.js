import request from "./index.js"
import { useSharePointStore } from "@/stores/index.js"
import { ref } from "vue"

export function getMicrosoftToken() {
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

let token =
  "eyJ0eXAiOiJKV1QiLCJub25jZSI6InkxNGN6QnFJUDFZcTBJV0lPcFVFTW44aHBkSzhYaGtZYTBkaXkyemp4VE0iLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC85NjQ4YzdkZC0yNWU4LTRjMzMtOWQzZC02NWUzYWFiZDVmZmYvIiwiaWF0IjoxNjc1ODM4MTU4LCJuYmYiOjE2NzU4MzgxNTgsImV4cCI6MTY3NTg0MzcyMywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQVlmVk5NeUY0K3l3bmtFS0hITi9JRmNKK2NGOXkyb2FpOTlCZUQ0dnJ3UkltZ29aYjdkV3h3VlFGZ2V4L1BaWnM5TzBXL3NCdnI5TTJ6VGt0aFNBZWZnNVpwenJWcnhQUUdobmJOVjJVWkVnPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggRXhwbG9yZXIiLCJhcHBpZCI6ImRlOGJjOGI1LWQ5ZjktNDhiMS1hOGFkLWI3NDhkYTcyNTA2NCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoieWFvIiwiZ2l2ZW5fbmFtZSI6Inh1ZG9uZyIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjEyMy4xMTguMTE5LjY1IiwibmFtZSI6Inh1ZG9uZyB5YW8iLCJvaWQiOiI2YjRlYTQwMC1lMDI5LTQ0OGMtOTZhZi1iMjE2ZDAzNjgzMTciLCJwbGF0ZiI6IjUiLCJwdWlkIjoiMTAwMzIwMDI0RjZGOTU5RiIsInJoIjoiMC5BWHdBM2NkSWx1Z2xNMHlkUFdYanFyMWZfd01BQUFBQUFBQUF3QUFBQUFBQUFBQzdBRnMuIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWRXcml0ZSBDaGF0LlJlYWQgQ2hhdC5SZWFkQmFzaWMgQ29udGFjdHMuUmVhZFdyaXRlIERldmljZU1hbmFnZW1lbnRSQkFDLlJlYWQuQWxsIERldmljZU1hbmFnZW1lbnRTZXJ2aWNlQ29uZmlnLlJlYWQuQWxsIEZpbGVzLlJlYWQgRmlsZXMuUmVhZC5BbGwgRmlsZXMuUmVhZFdyaXRlIEZpbGVzLlJlYWRXcml0ZS5BbGwgR3JvdXAuUmVhZFdyaXRlLkFsbCBJZGVudGl0eVJpc2tFdmVudC5SZWFkLkFsbCBNYWlsLlJlYWQgTWFpbC5SZWFkV3JpdGUgTWFpbGJveFNldHRpbmdzLlJlYWRXcml0ZSBOb3Rlcy5SZWFkV3JpdGUuQWxsIG9wZW5pZCBQZW9wbGUuUmVhZCBQbGFjZS5SZWFkIFByZXNlbmNlLlJlYWQgUHJlc2VuY2UuUmVhZC5BbGwgUHJpbnRlclNoYXJlLlJlYWRCYXNpYy5BbGwgUHJpbnRKb2IuQ3JlYXRlIFByaW50Sm9iLlJlYWRCYXNpYyBwcm9maWxlIFJlcG9ydHMuUmVhZC5BbGwgU2l0ZXMuRnVsbENvbnRyb2wuQWxsIFNpdGVzLk1hbmFnZS5BbGwgU2l0ZXMuUmVhZC5BbGwgU2l0ZXMuUmVhZFdyaXRlLkFsbCBUYXNrcy5SZWFkV3JpdGUgVXNlci5SZWFkIFVzZXIuUmVhZEJhc2ljLkFsbCBVc2VyLlJlYWRXcml0ZSBVc2VyLlJlYWRXcml0ZS5BbGwgZW1haWwiLCJzdWIiOiJxOW5wbzNCbUZITUhucTk3Y3haaFlob2puVXZ4YWhlQ1hUZWhrbDVGRkpvIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik5BIiwidGlkIjoiOTY0OGM3ZGQtMjVlOC00YzMzLTlkM2QtNjVlM2FhYmQ1ZmZmIiwidW5pcXVlX25hbWUiOiJ4dWRvbmdAbXNvbmxpbmVkb21haW4ub25taWNyb3NvZnQuY29tIiwidXBuIjoieHVkb25nQG1zb25saW5lZG9tYWluLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6ImExajRua3dWelU2SS1Nci1mTmpHQVEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfc3QiOnsic3ViIjoiUVQwQVFSQkN2Q3FCcFVPY3NQUnhnc2dxZjkzSWt2R3FTRS1PSkVrSjVOSSJ9LCJ4bXNfdGNkdCI6MTY2OTA5NzUwN30.mA13zXtjDaffV_PdMXNV7CMtUZ-b4Vx-n0jkl3uR7MqMuYN1rkWzLbrQp0_XyWzhm6te47OzYEsDG1Hw7ngMa_oCleEJIKpQF_JVsEQw3tnvDdoByBqr4G9bY97ICHJ2sOvNv9XVxjQfztguVDZrMUn1TrmAGgj4sVCCOdn_9Nni_rn0Iz7qC9nXU3OP9_Fi3cAtiqzmau2pr_X0jaqFx-y_03B-hLrkE91qDaP0BvyQFk9b3BT9EL8BrmWO_2C8bSNpO0Fe0pQ34DhmhVPq_uQDg36JHJ6F9TBYqh0zwH8Lpk-VXqZ932fCrNVmhASPzbS8jr3pNH3nkVcZYVOsxg"
export function getSharePointListById(itemId) {
  let sharepointInfo = useSharePointStore()
  let siteId = ref(sharepointInfo.siteId)
  return request({
    url: `https://graph.microsoft.com/v1.0/sites/${siteId.value}/drive/items/${itemId}/children`,
    method: "get",
    headers: {
      isToken: false,
      Authorization: `Bearer ${token}`
    }
  })
}

export function getSharePointList() {
  let sharepointInfo = useSharePointStore()
  let siteId = ref(sharepointInfo.siteId)
  return request({
    url: `https://graph.microsoft.com/v1.0/sites/${siteId.value}/drive/items/root/children`,
    method: "get",
    headers: {
      isToken: false,
      Authorization: `Bearer ${token}`
    }
  })
}

export function downloadSharePointFile(itemId) {
  let sharepointInfo = useSharePointStore()
  let siteId = ref(sharepointInfo.siteId)
  return request({
    url: `https://graph.microsoft.com/v1.0/sites/${siteId.value}/drive/items/${itemId}/content`,
    method: "get",
    headers: {
      isToken: false,
      Authorization: `Bearer ${token}`
    }
  })
}
