"use strict";
const { app, BrowserWindow, Menu } = require("electron");
// adds debug features like hotkeys for triggering dev tools and reload
require("electron-debug")();

// prevent window being garbage collected
let mainWindow;

console.log(process.versions);
function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		"min-width": 600,
		"min-height": 400,
		"accept-first-mouse": true,
		"title-bar-style": "hidden"
	});

	win.loadURL(`file://${__dirname}/renderer/index.html`);
	win.on("closed", onClosed);

	Menu.setApplicationMenu(Menu.buildFromTemplate([
		{
			 label: app.getName(),
			 submenu: [
				{role: 'minimize'},
				{role: 'close'}
			  ]
	}
	]));

	return win;
}

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on("ready", () => {
	mainWindow = createMainWindow();
});
