// LoCoREB - application de bureau (Windows) : enveloppe Electron autour de app/LoCoREB.html
const { app, BrowserWindow, Menu, dialog, ipcMain, shell } = require("electron");
const path = require("path");
const fs = require("fs");

app.setName("LoCoREB");
if (!app.requestSingleInstanceLock()) { app.quit(); }

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    title: "LoCoREB",
    icon: path.join(__dirname, "build", "icon.ico"),
    backgroundColor: "#f5f6f2",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false
    }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, "app", "LoCoREB.html"));
  win.setTitle("LoCoREB");
  win.on("page-title-updated", (e) => e.preventDefault());

  // Les liens externes (WhatsApp...) s'ouvrent dans le navigateur ; l'application reste sur sa page.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https:\/\//i.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith("file://")) { e.preventDefault(); if (/^https:\/\//i.test(url)) shell.openExternal(url); }
  });
  win.on("closed", () => { win = null; });
}

// Enregistrement d'un fichier (PDF, sauvegarde .json) : boîte « Enregistrer sous », puis ouverture du PDF
ipcMain.handle("enregistrer", async (_e, name, type, b64) => {
  try {
    const nom = path.basename(String(name || "LoCoREB.pdf"));
    const ext = path.extname(nom).slice(1).toLowerCase();
    const filtres = ext === "pdf" ? [{ name: "Document PDF", extensions: ["pdf"] }]
                  : ext === "json" ? [{ name: "Sauvegarde LoCoREB", extensions: ["json"] }]
                  : [{ name: "Tous les fichiers", extensions: ["*"] }];
    const r = await dialog.showSaveDialog(win, {
      title: "Enregistrer le fichier",
      defaultPath: path.join(app.getPath("documents"), nom),
      filters: filtres
    });
    if (r.canceled || !r.filePath) return { annule: true };
    fs.writeFileSync(r.filePath, Buffer.from(String(b64), "base64"));
    if (ext === "pdf") shell.openPath(r.filePath);
    return { chemin: r.filePath };
  } catch (err) {
    dialog.showErrorBox("LoCoREB", "Le fichier n'a pas pu être enregistré : " + (err && err.message ? err.message : err));
    return { annule: true };
  }
});

app.on("second-instance", () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
