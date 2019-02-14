const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

// init win
let win;

//create broswer window
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + "/img/sysinfoapp.png"
  });

  win.webPreferences({
    nodeIntegration: false,
    preload: "./preload.js"
  });
  mainWindow.loadURL("index.html");
  // load index.html
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  //open dev tools

  win.webContents.openDevTools({ mode: "right" });

  win.on("closed", () => {
    win = null;
  });
}
// Run create window function
app.on("ready", createWindow);

//Quite when all windows are closed
app.on("window-all-closed", () => {
  if (process.platfprm !== "darwin") {
    app.quit();
  }
});
