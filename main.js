// Importing functions
import { app, BrowserWindow, ipcMain }                            from 'electron';
import { fileURLToPath }                                          from 'url';
import { dirname, join }                                          from 'path';
import readLastRecord                                             from './scripts/readLastRecord.js'; 
import { listUSBDrives }                                          from './usbUtils.js';
import { getCurrentActiveLicense, setCurrentActiveLicense }       from './scripts/license_resolver.js';
import moment                                                     from 'moment'


// Get the current file path and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let win; // Declare a variable for the window

let lastRecord; //Last Record for Parameters

let drives; //List of Drives

let license_activity; //Current loaded License


// Function to create the Electron window
async function createWindow() {
  try {
    //Reads current license
    license_activity = await getCurrentActiveLicense();

    // Read the last record from the data file
    lastRecord = await readLastRecord();

    // Call the listUSBDrives function
    drives = await listUSBDrives();

    

    // Create a new browser window
    win = new BrowserWindow({
      width: 1920,
      height: 1080,
      icon: join(__dirname, 'img', 'favicon.png'), // Set window icon
      fullscreen: true,
      webPreferences: {
        preload: join(__dirname, 'preload.js'), // Preload script path
        nodeIntegration: false, // Disable node integration
        contextIsolation: true, // Enable context isolation
      },
      menuBarVisible: false, // Hide menu bar
      backgroundColor: '#3e3e3e' // Set background color
    });

    if(license_activity.license_status == 'active') {
      
      // Load the HTML file into the window and pass lastRecord and drives as query parameters
      win.loadFile(join(__dirname, 'pages', 'machine.html'), { 
        
        query: { 
          lastRecord: JSON.stringify(lastRecord)
        } 
      });
    } else {
       
      // Load the HTML file into the window and pass lastRecord and drives as query parameters
      win.loadFile(join(__dirname, 'pages', 'license.html'), { 
        
        query: { 
          license_activity: JSON.stringify(license_activity)
        } 
      });
    }
    

    // Hide the menu bar
    win.setMenuBarVisibility(false);

    // // Prevent default action for Alt+F4
    // win.on('close', (event) => {
    //   event.preventDefault();
    // });

  } catch (error) {
    console.error('Error creating window:', error);
  }
}

ipcMain.handle('set-active-license', async (event, licenseData) => {
  try {
      await setCurrentActiveLicense(licenseData);
      app.relaunch(); // Relaunch the application
      app.quit(); // Quit the current instance of the application
      return true;


  } catch (error) {
      throw new Error('Failed to set active license: ' + error.message);
  }
});

// Create the window when Electron is ready
app.whenReady().then(createWindow);

// Handle activation event
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});



// Handle exit-app event
ipcMain.on('exit-app', () => {
  // console.log("Received exit-app message from renderer process. Quitting the application.");
  app.quit();
});

// Handle window-all-closed event
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});



// STRANICE
license_activity = await getCurrentActiveLicense();

if(license_activity.license_status == 'active') {
  
  ipcMain.on('loadMachine', () =>     win.loadFile(join(__dirname, 'pages', 'machine.html'),     { query: { lastRecord: JSON.stringify(lastRecord) }}));
  ipcMain.on('loadParameters', () =>  win.loadFile(join(__dirname, 'pages', 'parameters.html'),  { query: { lastRecord: JSON.stringify(lastRecord) }}));
  ipcMain.on('loadAlarms', () =>      win.loadFile(join(__dirname, 'pages', 'alarms.html'),      { query: { lastRecord: JSON.stringify(lastRecord) }}));
  ipcMain.on('loadLimits', () =>      win.loadFile(join(__dirname, 'pages', 'limits.html'),      { query: { lastRecord: JSON.stringify(lastRecord) }}));
  ipcMain.on('loadRecipes', () =>     win.loadFile(join(__dirname, 'pages', 'recipes.html'),     { query: { lastRecord: JSON.stringify(lastRecord) }}));
  ipcMain.on('loadNetwork', () =>     win.loadFile(join(__dirname, 'pages', 'network.html'),     { query: { lastRecord: JSON.stringify(lastRecord) }}));
  ipcMain.on('loadDevices', () =>     win.loadFile(join(__dirname, 'pages', 'devices.html'),     { query: { drives: JSON.stringify(drives) }}));
  ipcMain.on('loadSettings', () =>    win.loadFile(join(__dirname, 'pages', 'settings.html'),    { query: { lastRecord: JSON.stringify(lastRecord) }}));
  ipcMain.on('loadLicense', () =>     win.loadFile(join(__dirname, 'pages', 'license.html'),     { query: { license_activity: JSON.stringify(license_activity) }}));
  license_activity = {}; 
  
}
else {
  ipcMain.on('loadLicense', () =>     win.loadFile(join(__dirname, 'pages', 'license.html'),     { query: { license_activity: JSON.stringify(license_activity) }}));
  license_activity = {}; 
}
