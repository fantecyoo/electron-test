// src\main\mainEntry.ts
import { app, BrowserWindow, ipcMain } from "electron"
import { downloadFile } from "./download.js"

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
    },
    titleBarStyle: "hidden"
  }
  ipcMain.handle("ping", () => {
    console.log("pong")
    console.log(__dirname)
  })
  mainWindow = new BrowserWindow(config)
  downloadFile(mainWindow)
  // mainWindow.webContents.openDevTools({ mode: "undocked" })
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(process.argv[2])
})
