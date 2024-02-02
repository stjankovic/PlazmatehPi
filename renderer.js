const { ipcRenderer } = window.electron;

///////////////////////////////////////////////////////////////////////////////
//EXIT
document.getElementById('exitButton').addEventListener('click', () => {
    // Send a message to the main process to request app exit
    ipcRenderer.send('exit-app');
});
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
//STRANA 1
document.getElementById('changeStrana1').addEventListener('click', () => {
    ipcRenderer.send('loadStrana1');
});
//STRANA 2
document.getElementById('changeStrana2').addEventListener('click', () => {
    ipcRenderer.send('loadStrana2');
});
//STRANA 3
document.getElementById('changeStrana3').addEventListener('click', () => {
    ipcRenderer.send('loadStrana3');
});
//STRANA 41
document.getElementById('changeStrana4').addEventListener('click', () => {
    ipcRenderer.send('loadStrana4');
});
//STRANA 5
document.getElementById('changeStrana5').addEventListener('click', () => {
    ipcRenderer.send('loadStrana5');
});
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
//UPDATE PARAMETERS

