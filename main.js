// src\main\mainEntry.ts
const { app, BrowserWindow, ipcMain, shell } = require("electron")
// 需在当前文件内开头引入 Node.js 的 'path' 模块
const path = require("path")
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true"
let mainWindow

app.whenReady().then(() => {
  let config = {
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true
    }
  }
  ipcMain.handle("ping", () => {
    console.log("pong")
    console.log(__dirname)
  })
  mainWindow = new BrowserWindow(config)
  // mainWindow.webContents.openDevTools({ mode: "undocked" })
  // mainWindow.webContents.openDevTools()
  mainWindow.loadFile("dist/index.html")
})
