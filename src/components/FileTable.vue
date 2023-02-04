<template>
  <div class="tableContainer">
    <el-table :data="tableData" style="width: 100%" @row-click="rowClick">
      <el-table-column type="selection" width="35" />
      <el-table-column prop="name" label="File Name">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <Folder v-if="scope.row.type === 'folder'" />
              <Document v-else />
            </el-icon>
            <span style="margin-left: 5px">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="Update Time" width="180" />
      <el-table-column prop="size" label="Size" width="180" />
      <!-- <el-table-column prop="type" label="Type" /> -->
    </el-table>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { shell } from "electron"
import path from "path"
const router = useRouter()
const route = useRoute()
const tableData = ref([
  {
    name: "foler 1",
    type: "folder",
    folder: true,
    size: "100kb",
    updateTime: "2023.01.08"
  },
  {
    name: "file 1",
    type: "eml",
    folder: false,
    size: "100kb",
    updateTime: "2023.01.08"
  },
  {
    name: "file 2",
    type: "eml",
    folder: false,
    size: "100kb",
    updateTime: "2023.01.08"
  }
])

const rowClick = function (row) {
  if (row.folder) {
    console.log(route)
    console.log(router)
    tableData.value = [
      {
        name: "IPCC Newsletter - Issue 26 [DAHUI-DHDM.FID101834]  [DHDM-I040001N02]",
        type: "eml",
        folder: false,
        size: "100kb",
        updateTime: "2023.01.09"
      }
    ]
    router.push({
      path: route.path,
      query: {
        category: route.query.category,
        path: route.query.path ? route.query.path + "/" + row.name : row.name
      }
    })
  } else {
    // import { shell, ipcRenderer } from "electron"
    // import path from "path"
    // console.log("----", shell, path)
    shell.openPath(
      path.resolve(
        "/Users/fanlyu/Desktop/IPCC Newsletter - Issue 26 [DAHUI-DHDM.FID101834]  [DHDM-I040001N02].eml"
      )
    )
    // ipcRenderer.invoke("ping")
  }
}
</script>

<style scoped lang="scss">
:deep(.el-table__header) {
  th {
    font-weight: normal;
  }
}
:deep(.el-table-column--selection) {
  border-bottom: none !important;
  .cell {
    padding-left: 0px;
  }
}
:deep(.el-table__inner-wrapper::before) {
  display: none;
}
.tableContainer {
  height: calc(100% - 30px);
  overflow: auto;
}
:deep(.el-table__header-wrapper) {
  position: fixed;
  top: 104px;
  z-index: 10000;
}
:deep(.el-table__body-wrapper) {
  margin-top: 40px;
}
.el-icon {
  position: relative;
  top: -1px;
  font-size: 16px;
}
</style>
