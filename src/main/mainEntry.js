// src\main\mainEntry.ts
const { app, BrowserWindow, ipcMain } = require("electron")
const { downloadFile } = require("./download.js")
const path = require("path")
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true"
let mainWindow
console.log(path.resolve(__dirname, "logo.png"))
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
    icon: path.resolve(__dirname, "logo.png"),
    width: 800, //指定窗口的宽度，单位: 像素值. 默认是 800
    height: 600, //指定窗口的高度，单位: 像素值,. 默认是 600
    minWidth: 800, //窗口的最小宽度，单位: 像素值,
    minHeight: 600, //窗口的最小高度，单位: 像素值,
    title: "IMS File Manager" //窗口的默认标题
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
