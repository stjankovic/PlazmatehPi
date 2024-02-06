const { contextBridge, ipcRenderer } = require('electron/renderer')

// Expose ipcRenderer to the renderer process
contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: ipcRenderer
});

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

document.addEventListener('DOMContentLoaded', () => {
  const reloadButton = document.getElementById('reloadButton');
  if (reloadButton) {
    reloadButton.addEventListener('click', () => {
      window.api.reloadApp();
    });
  }
});