"use strict";

var app = require("app");
var BrowserWindow = require("browser-window");
var path = require("path");

require("crash-reporter").start();

var mainWindow = null;

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadUrl(path.join("file://", __dirname, "index.html"));

  mainWindow.openDevTools();

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
});
