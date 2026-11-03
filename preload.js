const { contextBridge, ipcRenderer } = require("electron");
// Même nom que dans l'APK : l'application appelle window.Pont.enregistrer(nom, type, base64)
contextBridge.exposeInMainWorld("Pont", {
  enregistrer: (name, type, b64) => ipcRenderer.invoke("enregistrer", name, type, b64)
});
