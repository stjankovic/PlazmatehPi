const PlazmatehIpcUID = '2f97b8e1-94d9-4e54-a1af-6b0e33b1d9c2'

// Importing functions
import { app, BrowserWindow, ipcMain }                            from 'electron';
import { fileURLToPath }                                          from 'url';
import { dirname, join }                                          from 'path';
import readParameters                                             from './scripts/readParameters.js'; 
import { listUSBDrives }                                          from './usbUtils.js';
import { getCurrentActiveLicense, setCurrentActiveLicense }       from './scripts/license_resolver.js';
import moment                                                     from 'moment'


// Get the current file path and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let win; // Declare a variable for the window

let readCurrentParameters; //Last Record for Parameters

let drives; //List of Drives

let license_activity; //Current loaded License



console.log(`--------------------------------------------------------------- `)
console.log(`---       Plazmateh Industrial Personal Computer            --- `)
console.log(`    -------------------------------------------------------     `)
console.log(`---  UID:             ${PlazmatehIpcUID}  ---`)
console.log(`---  App Started:     ${moment()}     --- `)
console.log(`--------------------------------------------------------------- `)

// Function to create the Electron window
async function createWindow() {
  try {
    //Reads current license
    license_activity = await getCurrentActiveLicense();

    // Read the last record from the data file
    readCurrentParameters = await readParameters();

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
      
      // Load the HTML file into the window and pass readCurrentParameters and drives as query parameters
      win.loadFile(join(__dirname, 'pages', 'machine.html'), { 
        
        query: { 
          readCurrentParameters: JSON.stringify(readCurrentParameters)
        } 
      });
    } else {
       
      // Load the HTML file into the window and pass readCurrentParameters and drives as query parameters
      win.loadFile(join(__dirname, 'pages', 'license.html'), { 
        
        query: { 
          license_activity: JSON.stringify(license_activity)
        } 
      });
    }
    

    // Hide the menu bar
    win.setMenuBarVisibility(false);

  } catch (error) {
    console.error('Error creating window:', error);
  }
}

ipcMain.handle('set-active-license', async (event, licenseData) => {
  try {
      await setCurrentActiveLicense(licenseData);

      license_activity = await getCurrentActiveLicense();
      ipcMain.on('loadMachine', () =>     win.loadFile(join(__dirname, 'pages', 'machine.html'),     { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
      ipcMain.on('loadParameters', () =>  win.loadFile(join(__dirname, 'pages', 'parameters.html'),  { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
      ipcMain.on('loadAlarms', () =>      win.loadFile(join(__dirname, 'pages', 'alarms.html'),      { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
      ipcMain.on('loadLimits', () =>      win.loadFile(join(__dirname, 'pages', 'limits.html'),      { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
      ipcMain.on('loadRecipes', () =>     win.loadFile(join(__dirname, 'pages', 'recipes.html'),     { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
      ipcMain.on('loadNetwork', () =>     win.loadFile(join(__dirname, 'pages', 'network.html'),     { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
      ipcMain.on('loadDevices', () =>     win.loadFile(join(__dirname, 'pages', 'devices.html'),     { query: { drives: JSON.stringify(drives) }}));
      ipcMain.on('loadSettings', () =>    win.loadFile(join(__dirname, 'pages', 'settings.html'),    { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
      ipcMain.on('loadLicense', () =>     win.loadFile(join(__dirname, 'pages', 'license.html'),     { query: { license_activity: JSON.stringify(license_activity) }}));

  } catch (error) {
      throw new Error('Failed to set active license: ' + error.message);
  }
});

// Create the window when Electron is ready
app.whenReady().then(createWindow);


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
  license_activity = await getCurrentActiveLicense();
  ipcMain.on('loadMachine', () =>     win.loadFile(join(__dirname, 'pages', 'machine.html'),     { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
  ipcMain.on('loadParameters', () =>  win.loadFile(join(__dirname, 'pages', 'parameters.html'),  { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
  ipcMain.on('loadAlarms', () =>      win.loadFile(join(__dirname, 'pages', 'alarms.html'),      { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
  ipcMain.on('loadLimits', () =>      win.loadFile(join(__dirname, 'pages', 'limits.html'),      { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
  ipcMain.on('loadRecipes', () =>     win.loadFile(join(__dirname, 'pages', 'recipes.html'),     { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
  ipcMain.on('loadNetwork', () =>     win.loadFile(join(__dirname, 'pages', 'network.html'),     { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
  ipcMain.on('loadDevices', () =>     win.loadFile(join(__dirname, 'pages', 'devices.html'),     { query: { drives: JSON.stringify(drives) }}));
  ipcMain.on('loadSettings', () =>    win.loadFile(join(__dirname, 'pages', 'settings.html'),    { query: { readCurrentParameters: JSON.stringify(readCurrentParameters) }}));
  ipcMain.on('loadLicense', () =>     win.loadFile(join(__dirname, 'pages', 'license.html'),     { query: { license_activity: JSON.stringify(license_activity) }}));
  license_activity = {}; 
  
}
else {
  license_activity = await getCurrentActiveLicense();
  ipcMain.on('loadLicense', () =>     win.loadFile(join(__dirname, 'pages', 'license.html'),     { query: { license_activity: JSON.stringify(license_activity) }}));
  license_activity = {}; 
}
