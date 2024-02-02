////////////////////////////////////////////////////////////////////////////////////////////
//SYSTEM 
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main')
const path = require('node:path')

////////////////////////////////////////////////////////////////////////////////////////////
//RASPBERRY - uraditi na raspberry direktno

////////////////////////////////////////////////////////////////////////////////////////////
//PARAMETRI 

////////////////////////////////////////////////////////////////////////////////////////////
//RECEPTI 

////////////////////////////////////////////////////////////////////////////////////////////
//SETTINGS



////////////////////////////////////////////////////////////////////////////////////////////
//APPLICATION
let win;
function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'favicon.png'), 
    fullscreen: true, // Start in fullscreen mode
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false, // Disable Node.js integration
        contextIsolation: true, // Enable context isolation
    },
    menuBarVisible: false, // Hide the menu bar
    backgroundColor: '#3e3e3e'
  })

  win.loadFile('Strana1.html');

  win.setMenuBarVisibility(false);

  // Prevent menu from showing on Alt key press
  win.on('keydown', (event) => {
    if (event.altKey) {
      event.preventDefault();
    }
  });
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}) 

ipcMain.on('exit-app', () => {
    // Quit the app
    app.quit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.on('loadStrana1', (event) => {
  win.loadFile('Strana1.html');
});
ipcMain.on('loadStrana2', (event) => {
  win.loadFile('Strana2.html');
});
ipcMain.on('loadStrana3', (event) => {
  win.loadFile('Strana3.html');
});
ipcMain.on('loadStrana4', (event) => {
  win.loadFile('Strana4.html');
});
ipcMain.on('loadStrana5', (event) => {
  win.loadFile('Strana5.html');
});

