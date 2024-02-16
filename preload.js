const { contextBridge, ipcRenderer } = require('electron/renderer')

// Expose ipcRenderer to the renderer process
contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: ipcRenderer
});
