
'use strict';
import path           from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';

let mainWindow = null;

app.on('ready', () => {
    if(mainWindow) return;

    let options = {
      width:         1000,
      height:        600,
      'min-width':   800,
      'min-height':   800,
    };
    if (process.platform === 'darwin') {
      Object.assign(options, { titleBarStyle: 'hidden' });
    } else if (process.platform === 'linux') {
      Object.assign(options, { icon: path.join(__dirname, '/../resources/Nocturn.png') });
    }

    mainWindow = new BrowserWindow(options);




    mainWindow.loadURL('file://'+__dirname+'/index.html');
});

