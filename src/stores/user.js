import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
  state: () => {
    return { info: {} }
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  actions: {
    // increment() {
    //   this.count++
    // }
  }
})
