import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readLastRecord from './scripts/readLastRecord.js'; // Import the readLastRecord function

// Get the current file path and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let win; // Declare a variable for the window

let lastRecord = await readLastRecord();

// Function to create the Electron window
async function createWindow() {
  try {
    // Read the last record from the data file
    lastRecord = await readLastRecord();

    // Create a new browser window
    win = new BrowserWindow({
      width: 1920,
      height: 1080,
      icon: join(__dirname, 'favicon.png'), // Set window icon
      fullscreen: true,
      webPreferences: {
        preload: join(__dirname, 'preload.js'), // Preload script path
        nodeIntegration: false, // Disable node integration
        contextIsolation: true, // Enable context isolation
      },
      menuBarVisible: false, // Hide menu bar
      backgroundColor: '#3e3e3e' // Set background color
    });

    // Load the HTML file into the window and pass lastRecord as a query parameter
    win.loadFile(join(__dirname, 'pages', 'machine.html'), { query: { lastRecord: JSON.stringify(lastRecord)} });

    // Hide the menu bar
    win.setMenuBarVisibility(false);

    // Prevent default action for Alt key press
    win.on('keydown', (event) => { if (event.altKey) { event.preventDefault() }}); } catch (error) { console.error('Error creating window:', error) }
}

// Create the window when Electron is ready
app.whenReady().then(createWindow);

// Handle activation event
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) { createWindow() }});

// Handle exit-app event
ipcMain.on('exit-app', () => { app.quit() });

// Handle window-all-closed event
app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit() }});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//>> PAGES
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ipcMain.on('loadMachine', () => win.loadFile(join(__dirname, 'pages', 'machine.html'), { query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));
ipcMain.on('loadParameters', () => win.loadFile(join(__dirname, 'pages', 'parameters.html'), { query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));
ipcMain.on('loadAlarms', () => win.loadFile(join(__dirname, 'pages', 'alarms.html'), { query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));
ipcMain.on('loadLimits', () => win.loadFile(join(__dirname, 'pages', 'limits.html'), { query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));
ipcMain.on('loadRecipes', () => win.loadFile(join(__dirname, 'pages', 'recipes.html'), { query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));
ipcMain.on('loadNetwork', () => win.loadFile(join(__dirname, 'pages', 'network.html'), { query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));
ipcMain.on('loadDevices', () => win.loadFile(join(__dirname, 'pages', 'devices.html'), { query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));
ipcMain.on('loadSettings', () => win.loadFile(join(__dirname, 'pages', 'settings.html'), { query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));
ipcMain.on('loadLicense', () => win.loadFile(join(__dirname, 'pages', 'license.html'), { query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));