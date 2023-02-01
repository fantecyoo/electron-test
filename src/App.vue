<script setup lang="ts">
import { shell, ipcRenderer } from "electron"
import path from "path"
console.log("----", shell, path)
// shell.openPath(
//   path.resolve("/Users/fanlyu/Desktop/zhang/ims-file-manager/src/file.eml")
// )
ipcRenderer.invoke("ping")
</script>

<template>
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
