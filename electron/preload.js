const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (data) => ipcRenderer.send('save-file', data),
  onSaveFileReply: (callback) => ipcRenderer.on('save-file-reply', callback)
});
