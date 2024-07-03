const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs-extra');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.REACT_APP_APP_URL 

function getAppPath() {
  return app.isPackaged ? path.join(process.resourcesPath, 'demo-app') : path.join(__dirname, '../demo-app');
}

function getWritablePath() {
  return path.join(app.getPath('userData'), 'demo-app');
}

async function extractApp() {
  const appPath = getAppPath();
  const writablePath = getWritablePath();

  if (fs.existsSync(writablePath)) {
    await fs.remove(writablePath);
  }

  await fs.copy(appPath, writablePath);
}

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

async function installDependencies(reactAppPath) {
  try {
    const installResult = await execPromise('npm install', { cwd: reactAppPath });
    console.log(`React app install stdout: ${installResult.stdout}`);
    // Start the React app after installation
    exec('npm run start', { cwd: reactAppPath }, (startError, startStdout, startStderr) => {
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
    if (installResult.stderr) {
      console.error(`React app install stderr: ${installResult.stderr}`);
    }
  } catch (error) {
    console.error(`Error installing React app dependencies: ${error}`);
    throw error;
  }
}

app.on('ready', async () => {
  const reactAppPath = getWritablePath();
  try {
    await extractApp();
    await installDependencies(reactAppPath);
    createWindow();
  } catch (error) {
    console.error(`Error during app startup: ${error}`);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('save-file', async (event, data) => {
  const filePath = path.join(getWritablePath(), 'src'); // Save file in the writable directory

  try {
    // Remove the folder if it already exists
    await fs.remove(path.join(filePath, 'app'));
    console.log(`Deleted existing folder: ${filePath}`);

    // Call createStructure with the base path and the structure data
    createStructure(filePath, data);

    event.reply('save-file-reply', 'success');
  } catch (err) {
    console.error(`Error deleting folder: ${err}`);
    event.reply('save-file-reply', `Error deleting folder: ${err}`);
  }
});
