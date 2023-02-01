import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { devPlugin, getReplacer } from "./plugins/devPlugin"
import optimizer from "vite-plugin-optimizer"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [vue()]
  base: "./",
  plugins: [
    vue(),
    devPlugin(),
    optimizer(getReplacer()),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      "@c": path.resolve(__dirname, "./src/components"),
      "@v": path.resolve(__dirname, "./src/views"),
      "@n": path.resolve(__dirname, "./src/network"),
      "@": path.resolve(__dirname, "./src")
    }
  }
})
