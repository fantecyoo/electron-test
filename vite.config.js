import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { devPlugin, getReplacer } from "./plugins/devPlugin"
import optimizer from "vite-plugin-optimizer"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import path from "path"

const url = "http://oritech.dev:3389/"
// https://vitejs.dev/config/
export default defineConfig({
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
  },
  server: {
    host: "0.0.0.0",
    open: true,
    port: 8083,
    proxy: {
      "/auth": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/auth": "/auth"
        }
      },
      "/admin": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/admin": "/admin"
        }
      },
      "/resource": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/resource": "/resource"
        }
      },
      "/code": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/code": "/code"
        }
      },
      "/gen": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/gen": "/gen"
        }
      },
      "/biz": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/biz": "/biz"
        }
      },
      "/matter": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/matter": "/matter"
        }
      },
      "/flow": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/flow": "/flow"
        }
      },
      "/actuator": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/actuator": "/actuator"
        }
      },
      "/monitor": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/monitor": "/monitor"
        }
      },
      "/mp": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/mp": "/mp"
        }
      },
      "/daemon": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/daemon": "/daemon"
        }
      },
      "/job": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/job": "/job"
        }
      },
      "/tx": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/tx": "/tx"
        }
      },
      "/pay": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/pay": "/pay"
        }
      },
      "/document": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/document": "/document"
        }
      },
      "/statistics": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/statistics": "/statistics"
        }
      },
      "/workflow": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/workflow": "/workflow"
        }
      },
      "/act": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/act": "/act"
        }
      },
      "/system": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/system": "/system"
        }
      },
      "/migrate": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/migrate": "/migrate"
        }
      },
      "/etad": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/etad": "/etad"
        }
      },
      "/hr": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/hr": "/hr"
        }
      },
      "/gateway": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/gateway": "/gateway"
        }
      },
      "/services": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/services": "https://oritech.dev:5888/services/"
        }
      }
    }
  }
})
