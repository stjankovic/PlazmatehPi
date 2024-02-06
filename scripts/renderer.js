const { ipcRenderer } = window.electron;

///////////////////////////////////////////////////////////////////////////////
//EXIT
document.getElementById('exitButton').addEventListener('click', () => {
    // Send a message to the main process to request app exit
    ipcRenderer.send('exit-app');
});
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// Add event listeners to each list item to handle click events

// STRANA 1: MACHINE
document.getElementById('changeMachine').addEventListener('click', () => ipcRenderer.send('loadMachine'));

// STRANA 2: PARAMETERS
document.getElementById('changeParameters').addEventListener('click', () => ipcRenderer.send('loadParameters'));

// STRANA 3: ALARMS
document.getElementById('changeAlarms').addEventListener('click', () => ipcRenderer.send('loadAlarms'));

// STRANA 4: LIMITS
document.getElementById('changeLimits').addEventListener('click', () => ipcRenderer.send('loadLimits'));

// STRANA 5: RECIPES
document.getElementById('changeRecipes').addEventListener('click', () => ipcRenderer.send('loadRecipes'));

// STRANA 6: NETWORK
document.getElementById('changeNetwork').addEventListener('click', () => ipcRenderer.send('loadNetwork'));

// STRANA 7: DEVICES
document.getElementById('changeDevices').addEventListener('click', () => ipcRenderer.send('loadDevices'));

// STRANA 8: SETTINGS
document.getElementById('changeSettings').addEventListener('click', () => ipcRenderer.send('loadSettings'));

// STRANA 9: LICENSE
document.getElementById('changeLicense').addEventListener('click', () => ipcRenderer.send('loadLicense'));


///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
//UPDATE PARAMETERS

