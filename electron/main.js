const { app, BrowserWindow } = require('electron');
const path = require('path');
const dotenv = require('dotenv');
const { extractApp, installDependencies } = require('./utils');
const { setupIpcHandlers } = require('./ipcHandlers');

dotenv.config();
const url = process.env.REACT_APP_APP_URL;
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL(
    isDev
      ? url
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', async () => {
  try {
    const reactAppPath = await extractApp(app);
    await installDependencies(reactAppPath);
    createWindow();
    setupIpcHandlers(app);
  } catch (error) {
    console.error(`Error during app startup: ${error}`);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
