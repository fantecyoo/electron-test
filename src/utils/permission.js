/**
 * 全站权限配置
 *
 */
import { router } from "@/router/index"
import { getToken } from "@/utils/auth"

router.beforeEach((to, from, next) => {
  const meta = to.meta || {}
  if (getToken()) {
    next()
  } else {
    if (meta.isAuth === false) {
      next()
    } else {
      next("/login")
    }
  }
})
