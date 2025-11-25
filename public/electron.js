const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const url = require('url');
const path = require('path');

const isDev = !app.isPackaged;

function createMainWindow() {
    // Definir o caminho correto do ícone baseado no ambiente
    const iconPath = isDev 
        ? path.join(__dirname, 'icons/icon.ico')
        : path.join(process.resourcesPath, 'build', 'icons/icon.ico');

    const mainWindow = new BrowserWindow({
        title: 'Pomodoro',
        width: 520,
        height: 520,
        frame: false,
        resizable: false,
        titleBarStyle: 'hidden',
        icon: iconPath,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    // Load URL based on environment
    const startUrl = isDev
        ? 'http://localhost:3000'
        : url.format({
            pathname: path.join(__dirname, '../build/index.html'),
            protocol: 'file:',
            slashes: true,
        });
    
    // Only call setWindowButtonVisibility on macOS
    if (process.platform === 'darwin') {
        mainWindow.setWindowButtonVisibility(false); // hide window buttons on macOS
    }
    
    mainWindow.setMenuBarVisibility(false); // hide menu bar
    mainWindow.loadURL(startUrl); // load app in electron window
    ipcMain.on('close-app', () => {
        app.quit();
    }); // listen for close-app event from renderer process
}

app.whenReady().then(createMainWindow);