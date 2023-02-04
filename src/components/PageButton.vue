<template>
  <div>
    <el-button-group class="button-group">
      <el-button
        type="primary"
        :disabled="!backwardAble"
        @click="router.back()"
        v-autoblur
      >
        <el-icon class="el-icon--right"><ArrowLeft /></el-icon>
      </el-button>
      <el-button
        type="primary"
        :disabled="!forwardAble"
        @click="router.forward()"
        v-autoblur
      >
        <el-icon class="el-icon--right"><ArrowRight /></el-icon>
      </el-button>
    </el-button-group>
  </div>
</template>

<script setup>
import { useRouter, onBeforeRouteUpdate } from "vue-router"
import { computed, ref, watchEffect } from "vue"
const router = useRouter()

let forwardAble = ref(router.options.history.state.forward)
let backwardAble = ref(router.options.history.state.back)

onBeforeRouteUpdate(guard => {
  console.log(router.options)
  console.log(
    router.options.history.state.forward,
    router.options.history.state.back
  )
  forwardAble.value = router.options.history.state.forward
  backwardAble.value = router.options.history.state.back
})
</script>

<style lang="scss" scoped>
// .el-button-group > .el-button:focus,
// .el-button:hover {
//   background-color: #62b3fb;
// }
// .el-button-group > .el-button:focus {
//   background-color: #1a94fa;
// }
</style>
