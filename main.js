import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readLastRecord from './readLastRecord.js'; // Import the readLastRecord function

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
    win.loadFile(join(__dirname, 'Strana1.html'), {
      query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }
    });

    // Hide the menu bar
    win.setMenuBarVisibility(false);

    // Prevent default action for Alt key press
    win.on('keydown', (event) => {
      if (event.altKey) {
        event.preventDefault();
      }
    });
  } catch (error) {
    console.error('Error creating window:', error);
    // Handle error
  }
}

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
  app.quit();
});

// Handle window-all-closed event
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle loadStranaX events
ipcMain.on('loadStrana1', () => win.loadFile(join(__dirname, 'Strana1.html'), {query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));
ipcMain.on('loadStrana2', () => win.loadFile(join(__dirname, 'Strana2.html'), {query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));
ipcMain.on('loadStrana3', () => win.loadFile(join(__dirname, 'Strana3.html'), {query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));
ipcMain.on('loadStrana4', () => win.loadFile(join(__dirname, 'Strana4.html'), {query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));
ipcMain.on('loadStrana5', () => win.loadFile(join(__dirname, 'Strana5.html'), {query: { lastRecord: JSON.stringify(lastRecord), Stefan: 'Stefan' }}));

