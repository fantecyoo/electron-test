<template>
  <div ref="el">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        :to="{ path: '/index', query: { category: category } }"
        >{{ categoryLable }}</el-breadcrumb-item
      >
      <el-breadcrumb-item
        v-for="(path, index) in pathList"
        :key="path"
        :to="{
          path: '/index',
          query: getPath(path)
        }"
        >{{ path }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ArrowRight } from "@element-plus/icons-vue"
import { ref, reactive, computed, watch, unref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useElementSize } from "@vueuse/core"

const el = ref(null)
const { width, height } = useElementSize(el)
const route = useRoute()
const router = useRouter()
const category = computed(() => {
  return route.query.category
})

const routeHistory = new Map()

const categoryLable = computed(() => {
  switch (category.value) {
    case "all":
      return "All Files"
    default:
      return ""
  }
})

const getPath = function (path) {
  console.log(path, routeHistory.get(path), routeHistory)
  return routeHistory.get(path)
}

const pathList = computed(() => {
  if (!route.query.path) {
    return []
  }
  let path = route.query.path
  path = path.split("/")
  routeHistory.set(path[path.length - 1], unref(route).query)
  return path
})

function getStrLeng(str) {
  var realLength = 0
  var len = str.length
  var charCode = -1
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      // 如果是中文则长度加2
      realLength += 2
    }
  }
  return realLength
}
</script>

<style scoped lang="scss">
.el-breadcrumb {
  // display: flex;
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
  // direction: rtl;
  // text-align: left;
}
:deep(.el-breadcrumb__inner) {
  white-space: nowrap;
  // max-width: 250px;
  // overflow: hidden;
  // text-overflow: ellipsis;
}
:deep(.el-breadcrumb__item) {
  margin-bottom: 10px;
}
</style>
