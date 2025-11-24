const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const url = require('url');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Pomodoro',
        width: 520,
        height: 520,
        frame: false,
        resizable: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // Path to preload script
            contextIsolation: true,   // Keeps context isolated for security
            nodeIntegration: false,   // Disables Node.js in the renderer (security best practice)
        }
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, '../build/index.html'), // connect to the react app
        protocol: 'file:',
        slashes: true,
    });
    mainWindow.setWindowButtonVisibility(false); // hide window buttons on macOS
    mainWindow.setMenuBarVisibility(false); // hide menu bar
    mainWindow.loadURL(startUrl); // load app in electron window
    ipcMain.on('close-app', () => {
        app.quit();
    }); // listen for close-app event from renderer process
}

app.whenReady().then(createMainWindow);