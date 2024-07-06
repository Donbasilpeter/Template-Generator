const { app, BrowserWindow } = require('electron');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs-extra');
const { extractApp, installDependencies, runBuild } = require('./utils');
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
      preload: path.join(__dirname, 'preload.js'),
      devTools: false, // Disable dev tools
    }
  });

  mainWindow.loadURL(
    isDev
      ? url
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.setMenu(null);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', async () => {
  try {
    const appUserDataPath = app.getPath('userData');
    const setupFlagPath = path.join(appUserDataPath, 'setup.flag');
    const reactAppPath = path.join(appUserDataPath, 'demo-app');
    const appPath = path.join(__dirname, '../demo-app');

    if (!fs.existsSync(setupFlagPath)) {
      await extractApp(reactAppPath,appPath);
      await installDependencies(reactAppPath);
      fs.writeFileSync(setupFlagPath, ''); // Create a flag file after setup
    }
    runBuild(reactAppPath); // Always run the build script
    createWindow();
    setupIpcHandlers(app);
  } catch (error) {
    console.error(`Error during app startup: ${error}`);
  }
});

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    const appUserDataPath = app.getPath('userData');
    const reactAppPath = path.join(appUserDataPath, 'demo-app', 'src','app');
    const appPath = path.join(__dirname, '../demo-app', 'src','app');
    await extractApp(reactAppPath,appPath);
    app.quit();
  }
});
