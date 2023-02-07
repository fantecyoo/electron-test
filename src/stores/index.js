import { defineStore } from "pinia"

export const useSharePointStore = defineStore("sharepoint", {
  state: () => {
    return { siteId: "" }
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  actions: {
    // increment() {
    //   this.count++
    // }
  }
})
