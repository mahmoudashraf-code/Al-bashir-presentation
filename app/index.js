const { app } = require('electron');
const { mainApp } = require("./main/app");

app.on('ready', () => {
    new mainApp();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    new mainApp();
    console.log("activate")
});