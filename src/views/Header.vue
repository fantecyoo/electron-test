<template>
  <div class="header-container">
    <el-dropdown class="dropdown">
      <span class="el-dropdown-link">
        {{ `${userInfo.firstNameEn} ${userInfo.lastNameEn}` }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">Sign out</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- <div style="width: 220px"></div> -->
    <!-- <PageButton></PageButton> -->
  </div>
</template>

<script setup>
import PageButton from "@/components/PageButton.vue"
import { useUserStore } from "@/stores/user.js"
import { deleteAuthToken } from "@/utils/auth.js"
import { useRouter } from "vue-router"

const userStore = useUserStore()
const userInfo = userStore.info

const router = useRouter()

const logout = function () {
  ElMessageBox.confirm(
    "You are about to sign out of your account. Confirm to proceed?",
    "Notice",
    {
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonClass: "el-button--info",
      type: "info"
    }
  )
    .then(() => {
      handleLogout()
    })
    .catch(err => {})
}

const handleLogout = function () {
  deleteAuthToken()
  router.push({ path: "/login" })
}
</script>

<style scoped lang="scss">
.header-container {
  // padding-left: 100px;
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  // border-bottom: solid 1px var(--el-menu-border-color);
  display: flex;
  align-items: center;
}
.button-group {
}
.dropdown {
  margin-left: auto;
  margin-right: 10px;
}
:deep(.el-dropdown-item) {
  font-size: 12px;
}
</style>
