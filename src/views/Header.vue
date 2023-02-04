<template>
  <div class="header-container">
    <div style="width: 220px"></div>
    <PageButton></PageButton>
  </div>
</template>

<script setup>
import PageButton from "@/components/PageButton.vue"
</script>

<style scoped lang="scss">
.header-container {
  // padding-left: 100px;
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  border-bottom: solid 1px var(--el-menu-border-color);
  display: flex;
  align-items: center;
}
.button-group {
}
</style>
