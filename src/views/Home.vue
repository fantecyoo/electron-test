<template>
  <div class="common-layout">
    <el-container class="container">
      <el-header><Header></Header></el-header>
      <el-container class="content">
        <el-aside width="200px"><Aside></Aside></el-aside>
        <el-main><Main></Main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from "./Aside.vue"
import Header from "./Header.vue"
import Main from "./Main.vue"
</script>

<style scoped lang="scss">
.common-layout {
  width: 100%;
  height: 100%;
}
.el-header {
  padding: 0px;
  height: 40px;
}
.container {
  height: 100%;
}
.content {
  // height: 100%;
  height: 1px;
}
.el-main {
  padding-right: 0px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
}
</style>
