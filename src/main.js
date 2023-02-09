import { createApp } from "vue"
import "./styles/style.scss"
import App from "./App.vue"
import { router } from "./router/index"
import directive from "./utils/directive.js"
import "./utils/permission"
import { createPinia } from "pinia"
import moment from "moment"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import { shell, ipcRenderer } from "electron"

ipcRenderer.on("downloadItemDone", (event, value) => {
  shell.openPath(value)
})

const app = createApp(App)
app.config.globalProperties.$moment = moment

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.use(directive)
app.use(createPinia())
console.log("+++")
app.mount("#app")
