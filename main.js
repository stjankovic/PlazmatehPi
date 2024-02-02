////////////////////////////////////////////////////////////////////////////////////////////
//SYSTEM 
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main')
const path = require('node:path')

////////////////////////////////////////////////////////////////////////////////////////////
//RASPBERRY - uraditi na raspberry direktno

////////////////////////////////////////////////////////////////////////////////////////////
//PARAMETRI 
let parameterName_01; let parameterVal_01; 
let parameterName_02; let parameterVal_02;
let parameterName_03; let parameterVal_03;
let parameterName_04; let parameterVal_04;
let parameterName_05; let parameterVal_05;
let parameterName_06; let parameterVal_06;
let parameterName_07; let parameterVal_07;
let parameterName_08; let parameterVal_08;
let parameterName_09; let parameterVal_09;
let parameterName_10; let parameterVal_10;
let parameterName_11; let parameterVal_11;
let parameterName_12; let parameterVal_12;
let parameterName_13; let parameterVal_13;
let parameterName_14; let parameterVal_14;
let parameterName_15; let parameterVal_15;
let parameterName_16; let parameterVal_16;
let parameterName_17; let parameterVal_17;
let parameterName_18; let parameterVal_18;
let parameterName_19; let parameterVal_19;
let parameterName_20; let parameterVal_20;

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

  win.loadFile('Strana1.html', { query: { 
    parameterName_01: 'parameterName_01',
    parameterName_02: 'parameterName_01',
    parameterName_03: 'parameterName_01',
    parameterName_04: 'parameterName_01',
    parameterName_05: 'parameterName_01',
    parameterName_06: 'parameterName_01',
    parameterName_07: 'parameterName_01',
    parameterName_08: 'parameterName_01',
    parameterName_09: 'parameterName_01',
    parameterName_10: 'parameterName_01',
    parameterName_11: 'parameterName_01',
    parameterName_12: 'parameterName_01',
    parameterName_13: 'parameterName_01',
    parameterName_14: 'parameterName_01',
    parameterName_15: 'parameterName_01',
    parameterName_16: 'parameterName_01',
    parameterName_17: 'parameterName_01',
    parameterName_18: 'parameterName_01',
    parameterName_19: 'parameterName_01',
    parameterName_20: 'parameterName_01'

  }});

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

