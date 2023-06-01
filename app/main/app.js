const { join } = require('path');
const { app, BrowserWindow, ipcMain, dialog, Tray, Menu, shell } = require('electron');
const { writeFileSync } = require('fs');

module.exports.mainApp = class mainApp {
    windowVal;
    constructor() {
        this.windowVal = new BrowserWindow({
            width: 700,
            height: 500,
            title: "Al-Bashir Studio",
            center: true,
            show: false,
            frame: false,
            maximizable: false,
            icon: join(__dirname, "..", "dist", "app", "assets", "run.png"),
            webPreferences: {
                devTools: true,
                webviewTag: true,
                nodeIntegration: true,
                worldSafeExecuteJavaScript: true
            }
        });
        this.windowVal.loadURL(join(__dirname, "..", 'dist', "app", 'index.html'));
        this.windowVal.webContents.on('did-finish-load', () => {
            this.windowVal.show();
            this.windowVal.webContents.component = 0;
        });
        ipcMain.on('openMainApp', (event) => {
            this.windowVal.maximizable = true;
            this.windowVal.setSize(1200, 700);
            this.windowVal.center();
        })
        ipcMain.handle('openDialogGetStatic', async (event) => {
            let result;
            await dialog.showOpenDialog(this.windowVal, {
                title: "Select folder",
                properties: ['openDirectory']
            }).then(res => {
                if (!res.canceled)
                    result = res.filePaths[0];
            }).catch(err => {
                console.log(err);
            })
            return result
        })
    }
    loadEvent() {
        mainWindow.webContents.on("will-navigate", (e, url) => {
            if (url == "file:///F:/bashirStudioNew/app/dist/app/index.html") return;
            e.preventDefault();
            shell.openExternal(url);
        });
        mainWindow.on('closed', () => {
            mainWindow = null;
            app.quit();
        });
        mainWindow.loadURL(join(__dirname, "..", 'dist', "app", 'index.html'));
        mainWindow.on('unresponsive', () => {
            dialog.showMessageBox({
                type: 'info',
                message: 'Reload window?',
                buttons: ['Cancel', 'Reload']
            }).then(x => {
                if (x.response == 1) mainWindow.loadURL(join(__dirname, "..", 'dist', "app", 'index.html'));
            }).catch(err => {
                console.log(err);
            });
        });
        mainWindow.on("close", (e) => {
            e.preventDefault()
            dialog.showMessageBox({
                type: 'question',
                message: 'Do you want to work app in background?',
                buttons: ['Cancel', 'Yes', 'No'],
                title: "Al-Bashir Studio | Close options",
            }).then((res) => {
                if (res.response == 1) {
                    mainWindow.hide()
                } else if (res.response == 2) {
                    mainWindow.removeAllListeners("close");
                    mainWindow.webContents.send("closeSaveSetting");
                }
            });
        });
        let tray = new Tray(join(__dirname, "..", 'dist', "app", 'assets', 'run.png'));
        tray.on('click', () => {
            let menuBar = Menu.buildFromTemplate([
                {
                    label: "Open App",
                    click() {
                        mainWindow.show();
                    }
                },
                {
                    label: 'Quit',
                    click() {
                        app.quit();
                    }
                }
            ]);
            tray.popUpContextMenu(menuBar);
        });
    }
    loadIPC() {
        ipcMain.on('openSave', (e, res) => {
            dialog.showSaveDialog(
                {
                    title: 'save File',
                    filters: [{ name: 'Web Page', extensions: 'html' }]
                }
            ).then(res2 => {
                if (res2.canceled == true) return;
                writeFileSync(res2.filePath, res);
                shell.openExternal(res2.filePath);
            }).catch(err => {
                console.log(err);
            })
        })
        ipcMain.handle('openDialogGetTable', async (event) => {
            let result;
            await openDialog({
                title: "Select Database File",
                properties: ['openFile'],
                filters: [
                    {
                        name: 'Database File',
                        extensions: ['json']
                    }
                ]
            }).then(res => {
                result = res;
            }).catch(err => {
                console.log(err);
            });
            return result;
        })
        ipcMain.handle('openDialogGetBackupServer', async (event) => {
            let result;
            await openDialog({
                title: "Select backup server file",
                properties: ['openFile'],
                filters: [
                    {
                        name: 'Backup File',
                        extensions: ['backup']
                    }
                ]
            }).then(res => {
                result = res;
            }).catch(err => {
                console.log(err);
            });
            return result;
        })
        ipcMain.handle('openDialogGetWebpage', async (event) => {
            let result;
            await openDialog({
                title: "Select Web Page",
                properties: ['openFile'],
                filters: [
                    {
                        name: 'Web Page',
                        extensions: ['html', 'htm', 'js', 'css', 'php']
                    },
                    {
                        name: 'Text File',
                        extensions: ['json', 'txt']
                    },
                    {
                        name: 'Images',
                        extensions: ['jpg', 'png', 'gif']
                    },
                    {
                        name: 'Movies',
                        extensions: ['mkv', 'avi', 'mp4']
                    },
                    {
                        name: "all",
                        extensions: ["*"]
                    }
                ]
            }).then(res => {
                result = res;
            }).catch(err => { });
            return result;
        });

        ipcMain.handle('openDialogGetprogrammingFile', async (event) => {
            let result;
            await openDialog({
                title: "Select programming file",
                properties: ['openFile'],
                filters: [
                    {
                        name: 'programming languages',
                        extensions: ['c', 'cpp', 'js', 'py', 'java', 'cs', 'vb', 'php']
                    }
                ]
            }).then(res => {
                result = res;
            }).catch(err => { });
            return result;
        });
        ipcMain.handle('getFilePlugin', async (event) => {
            let result;
            await openDialog({
                title: "Select plugin file",
                properties: ['openFile'],
                filters: [
                    {
                        name: 'plugin file',
                        extensions: ['js']
                    }
                ]
            }).then(res => {
                result = res;
            }).catch(err => { });
            return result;
        });
        ipcMain.handle('open Dialog', async (event, o) => {
            let result;
            await dialog.showOpenDialog(o).then(res => {
                result = res;
            }).catch(err => {
                return undefined
            });
            return result;
        });
    }
    openDialog(o) {
        return new Promise((resolve, reject) => {
            dialog.showOpenDialog(mainWindow, o).then(result => {
                if (result.canceled == true) reject(true);
                resolve(result.filePaths[0]);
            }).catch(err => {
                reject(err)
            });
        })
    }
}