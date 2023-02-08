<template>
  <BreadCrumb></BreadCrumb>
  <Suspense>
    <FileTable style="margin-top: 10px"></FileTable>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from "vue"
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue"
import FileTable from "@/components/FileTable.vue"
import { getMicrosoftToken } from "@/network/api.js"
getMicrosoftToken()
</script>

<style scoped lang="scss"></style>
