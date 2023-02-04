import { createApp } from "vue"
import "./styles/style.css"
import App from "./App.vue"
import { router } from "./router/index"
import directive from "./utils/directive.js"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
console.log(window.localStorage.getItem("electron-key"))
// window.localStorage.setItem("electron-key", "123")

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.use(directive)
app.mount("#app")
