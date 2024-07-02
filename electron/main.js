const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs-extra');
const { exec, execSync } = require('child_process');

/**
 * Recursively creates files and folders based on a JSON structure.
 * @param {string} basePath - The base path where the structure should be created.
 * @param {object} structure - The JSON structure defining files and folders.
 */
function createStructure(basePath, structure) {
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }

  for (const key in structure) {
    if (structure.hasOwnProperty(key) && key !== 'isFile' && key !== 'description' && key !== 'prompt') {
      const item = structure[key];
      const itemPath = path.join(basePath, key);

      if (item.isFile) {
        const content = `${item.code}`;
        fs.writeFileSync(itemPath, content, 'utf8');
      } else {
        createStructure(itemPath, item);
      }
    }
  }
}

const isDev = process.env.NODE_ENV === 'development';
let mainWindow;
let reactAppProcess;

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
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  // Start the React development server
  const reactAppPath = path.join(app.getAppPath(), './demo-app');
  exec('npm install', { cwd: reactAppPath }, (installError, installStdout, installStderr) => {
    if (installError) {
      console.error(`Error installing React app dependencies: ${installError}`);
      return;
    }
    if (installStderr) {
      console.error(`React app install stderr: ${installStderr}`);
      return;
    }
    console.log(`React app install stdout: ${installStdout}`);

    // Start the React app after installation
    reactAppProcess = exec('npm run start', { cwd: reactAppPath }, (startError, startStdout, startStderr) => {
      if (startError) {
        console.error(`Error starting React app: ${startError}`);
        return;
      }
      if (startStderr) {
        console.error(`React app start stderr: ${startStderr}`);
        return;
      }
      console.log(`React app start stdout: ${startStdout}`);
    });
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  if (reactAppProcess) {
    reactAppProcess.kill();
  }
});

ipcMain.on('save-file', async (event, data) => {
  const filePath = path.join(app.getAppPath(), './demo-app/src'); // Save file in the root directory

  try {
    // Remove the folder if it already exists
    await fs.remove(path.join(filePath,'/app'));
    console.log(`Deleted existing folder: ${filePath}`);

    // Call createStructure with the base path and the structure data
    createStructure(filePath, data);

    event.reply('save-file-reply', 'success');
  } catch (err) {
    console.error(`Error deleting folder: ${err}`);
    event.reply('save-file-reply', 'failure');
  }
});
