<template>
  <div>
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
          query: { category: category, path: getPath(pathList, index) }
        }"
        >{{ path }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ArrowRight } from "@element-plus/icons-vue"
import { ref, reactive, computed } from "vue"
import { useRoute } from "vue-router"
const route = useRoute()

const category = computed(() => {
  return route.query.category
})

const categoryLable = computed(() => {
  switch (category.value) {
    case "all":
      return "All Files"
    default:
      return ""
  }
})

const getPath = function (pathList, pathIndex) {
  return pathList.reduce((pre, cur, index, ary) => {
    if (index > pathIndex) {
      return pre
    } else {
      return pre + "/" + cur
    }
  })
}

const pathList = computed(() => {
  let path = route.query.path || ""
  path = path.split("/")
  console.log(path)
  return path
})
</script>

<style scoped lang="scss"></style>
