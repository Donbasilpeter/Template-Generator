const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs-extra');

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
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
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
