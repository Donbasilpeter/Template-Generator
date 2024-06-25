const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

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

    mainWindow.loadURL('http://localhost:3000'); // Adjust the URL to your React app's location
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Listen for save-file event
ipcMain.on('save-file', (event, data) => {
    const filePath = path.join(app.getAppPath(), '/src/Data/template.js'); // Save file in the root directory
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            event.reply('file-saved', 'error');
            return;
        }
        event.reply('file-saved', 'success');
    });
});
