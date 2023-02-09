import { getUserInfoApi } from "@/network/user/user.js"
import { useUserStore } from "@/stores/user.js"

export async function getUserInformation() {
  const { data: res } = await getUserInfoApi()
  const userStore = useUserStore()
  userStore.$patch({
    info: res.data
  })
}
