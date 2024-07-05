const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs-extra');
const { createStructure } = require('./utils');

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
}

module.exports = {
  setupIpcHandlers
};
