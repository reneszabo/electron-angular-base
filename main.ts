// ./main.js
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});
require('dotenv').config();

let mainWindow = null;
let count = 10;
app.on('ready', function () {
    createWindow();
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


ipcMain.on('ping', function (event, arg) {
    // do child process or other data manipulation and name it manData
    count++;
    event.sender.send('pong', count);
});


function createWindow() {
    // Initialize the window to our specified dimensions
    mainWindow = new BrowserWindow({width: 1000, height: 600});
    // Specify entry point
    if (process.env.PACKAGE === 'true') {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    } else {
        mainWindow.loadURL(process.env.HOST);
        mainWindow.webContents.openDevTools();
    }
    // Remove window once app is closed
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
