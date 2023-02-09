<template>
  <el-menu default-active="2" class="el-menu-vertical">
    <el-menu-item index="2">
      <el-icon><Menu /></el-icon>
      <template #title>All Files</template>
    </el-menu-item>
    <!-- <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item> -->
  </el-menu>
</template>

<script setup></script>

<style scoped lang="scss">
.el-menu-vertical {
  height: 100%;
  // border-top: solid 1px var(--el-menu-border-color);
}
</style>
