const { ipcMain, session } = require("electron")
const path = require("path")

module.exports = {
  downloadFile: function (win) {
    ipcMain.handle("downloadFile", (event, url) => {
      win.webContents.downloadURL(url)
    })
    session.defaultSession.on("will-download", (event, item, webContents) => {
      console.log("222", item)
      // event.preventDefault()
      // require("got")(item.getURL()).then(response => {
      //   require("fs").writeFileSync("/somewhere", response.body)
      // })
      let fileName = item.getFilename()
      item.setSavePath(path.resolve(`/Users/fanlyu/Desktop/${fileName}`))
      // console.log(item.getSavePath())
      item.on("done", (e, state) => {
        // downloadItem.state = state
        // downloadItem.receivedBytes = item.getReceivedBytes()
        // downloadItem.lastModifiedTime = item.getLastModifiedTime()
        // 通知渲染进程，更新下载状态
        webContents.send("downloadItemDone", item.getSavePath())
      })
    })
  }
}
