<template>
  <div class="tableContainer">
    <el-table :data="tableData" style="width: 100%" @row-click="rowClick">
      <el-table-column type="selection" width="35" />
      <el-table-column prop="name" label="File Name">
        <template #default="scope">
          <div class="filename">
            <el-icon>
              <!-- <Folder v-if="scope.row.folder" /> -->
              <img
                src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20220825.001/assets/item-types/16/folder.svg"
                alt=""
                v-if="scope.row.folder"
              />
              <img :src="getFileLogo(scope.row.name)" alt="" v-else />
              <!-- <Document v-else /> -->
            </el-icon>
            <div class="content">{{ scope.row.name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="lastModifiedDateTime" label="Modified" width="180">
        <template #default="scope">
          <span>{{
            proxy.$moment(scope.row.lastModifiedDateTime).format("YYYY-MM-DD")
          }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="size" label="Size" width="180" /> -->
      <!-- <el-table-column prop="type" label="Type" /> -->
    </el-table>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import {
  getMicrosoftSite,
  getSharePointList,
  getSharePointListById,
  downloadSharePointFile
} from "@/network/microsoft/api.js"
import { useSharePointStore } from "@/stores/index.js"
import { getFileLogo } from "@/utils/utils"
import { shell, ipcRenderer } from "electron"
// import path from "path"
let sharepointInfo = useSharePointStore()
const tableData = ref([])
const router = useRouter()
const route = useRoute()

const { proxy } = getCurrentInstance()

watch(
  () => route.query,
  val => {
    console.log("router change")
    console.log(val)
    getFileList()
  }
)

const getFileList = async () => {
  tableData.value = []
  if (route.query.itemId) {
    console.log(route.query)
    var { data: res } = await getSharePointListById(route.query.itemId)
  } else {
    var { data: res } = await getSharePointList()
  }
  console.log(res)
  tableData.value = res.value
}

function rowClick(row) {
  if (row.folder) {
    router.push({
      path: route.path,
      query: {
        category: route.query.category,
        path: route.query.path ? route.query.path + "/" + row.name : row.name,
        itemId: row.id
      }
    })
  } else {
    downloadSharePointFile(row.id)
    ipcRenderer.invoke("ping")
    ipcRenderer.invoke("downloadFile", row["@microsoft.graph.downloadUrl"])
    // import { shell, ipcRenderer } from "electron"
    // import path from "path"
    // console.log("----", shell, path)
    // shell.openPath(
    //   path.resolve(
    //     "/Users/fanlyu/Desktop/IPCC Newsletter - Issue 26 [DAHUI-DHDM.FID101834]  [DHDM-I040001N02].eml"
    //   )
    // )
    // ipcRenderer.invoke("ping")
  }
}

await getFileList()
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
  // position: fixed;
  // top: 34px;
  // z-index: 10000;
}
:deep(.el-table__body-wrapper) {
  // margin-top: 34px;
}
.el-icon {
  position: relative;
  top: -1px;
  font-size: 16px;
}
.filename {
  display: flex;
  align-items: center;
  .content {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-left: 20px;
    flex: 1;
  }
}
</style>
