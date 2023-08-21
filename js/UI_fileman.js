// UI_* files contain JS code for GUI elements, isolated from any actual functions

/* wipe all data button */
document.getElementById('filemanWipe').onclick = () => {
    localStorage.removeItem('dataset');
    init();
}

/* show/hide debug */
document.getElementById('debugTogglerBtn').onclick = () => {
    document.getElementById('debug').style.display == "none" ? Configs.showDebug = 1 : Configs.showDebug = 0;
    saveConfigs();
    updateUI();
};