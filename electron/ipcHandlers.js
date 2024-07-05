const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs-extra');
const { createStructure,compressFolderToBuffer } = require('./utils');


function setupIpcHandlers(app) {

  ipcMain.handle('save-file', async (event, data) => {
    const filePath = path.join(app.getPath('userData'), 'demo-app', 'src'); // Save file in the writable directory

    try {
      // Remove the folder if it already exists
      await fs.remove(path.join(filePath, 'app'));
      console.log(`Deleted existing folder: ${filePath}`);

      // Call createStructure with the base path and the structure data
      await createStructure(filePath, data);

      return 'sucess'
    } catch (err) {
      console.error(`Error deleting folder: ${err}`);
      return  `Error deleting folder: ${err}`;
    }
  });


  ipcMain.handle('check-api-key', async () => {
    const apiKeyFilePath = path.join(app.getPath('userData'), 'apiKey.txt');

    try {
      if (await fs.pathExists(apiKeyFilePath)) {
        const apiKey = await fs.readFile(apiKeyFilePath, 'utf8');
        if (apiKey =='') return false
        return apiKey;
      } else {
        return false;
      }
    } catch (error) {
      console.error(`Error checking API key: ${error}`);
      return null;
    }
  });

  ipcMain.handle('save-api-key', async (event, apiKey) => {
    const apiKeyFilePath = path.join(app.getPath('userData'), 'apiKey.txt');
  
    try {
      await fs.outputFile(apiKeyFilePath, apiKey, 'utf8');
      return true;
    } catch (error) {
      console.error(`Error saving API key: ${error}`);
      return false;
    }
  });
  ipcMain.handle('zip-folder', async () => {
    try {
      const folderPath = path.join(app.getPath('userData'), 'demo-app'); // Save file in the writable directory
      const buffer = await compressFolderToBuffer(folderPath);
      return buffer
    } catch (err) {
      throw new Error('Failed to zip folder: ' + err.message);
    }
  });
}

module.exports = {
  setupIpcHandlers
};
