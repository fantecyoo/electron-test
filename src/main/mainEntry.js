// src\main\mainEntry.ts
const { app, BrowserWindow, ipcMain } = require("electron")
const { downloadFile } = require("./download.js")
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
    // titleBarStyle: "hidden"
  }
  ipcMain.handle("ping", () => {
    console.log("pong")
    console.log(__dirname)
  })
  console.log(process.env.NODE_ENV)
  mainWindow = new BrowserWindow(config)
  downloadFile(mainWindow)
  // mainWindow.webContents.openDevTools({ mode: "undocked" })
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(process.argv[2])
  } else {
    // mainWindow.webContents.openDevTools()
    console.log(
      __dirname,
      "--",
      path.resolve(__dirname, "../../dist/index.html")
    )
    mainWindow.loadFile(path.resolve(__dirname, "../../dist/index.html"))
  }
})
