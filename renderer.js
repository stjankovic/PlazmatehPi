// Access ipcRenderer via the electron object exposed by the preload script
const { ipcRenderer } = window.electron;

// Adding event listener to the exit button
document.getElementById('exitButton').addEventListener('click', () => {
    // Send a message to the main process to request app exit
    ipcRenderer.send('exit-app');
});

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})
  
  document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
})

