
'use strict';

var app = require('app');
var BrowerWindow = require('browser-window');
var mainWindow = null;

app.on('ready', function(){
    mainWindow = new BrowerWindow({
        height: 800,
        width:  600
    });
    mainWindow.loadUrl('file://'+__dirname+'/app/index.html');
});

