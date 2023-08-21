// UI_* files contain JS code for GUI elements, isolated from any actual functions

/* import data menu item */
document.getElementById("filemanImportBtn").onchange = (event) => importSet(event);

/* export data menu item */
document.getElementById('filemanExport').onclick = () => exportSet();

/* show/hide debug menu item */
document.getElementById('filemanToggleDebug').onclick = () => {
    Configs.showDebug = document.getElementById('debug').style.display === "none";
    saveConfigs();
    configsUpdateUI();
};

/* wipe all data menu item */
document.getElementById('filemanWipe').onclick = () => {
    localStorage.removeItem('dataset');
    init();
}