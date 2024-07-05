const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (data) => ipcRenderer.invoke('save-file', data),
  saveApiKey: (data) => ipcRenderer.invoke('save-api-key', data),
  checkApiKey: () => ipcRenderer.invoke('check-api-key'),
  downloadDemoApp :() => ipcRenderer.invoke('zip-folder'),
});
