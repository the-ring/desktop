'use strict';

// eslint-disable-next-line import/no-unresolved
const { app, BrowserWindow } = require('electron');
const server = require('./server');
const config = require('./config');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    center: true,
    resizable: false,
    frame: false,
    webPreferences: {
      blinkFeatures: 'OverlayScrollbars',
      overlayScrollbars: true
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    mainWindow.webContents.openDevTools();
  } else {
    server.listen(config.react.frontend.port);
  }
  mainWindow.loadURL(`http://localhost:${config.react.frontend.port}`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
