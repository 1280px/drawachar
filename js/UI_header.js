// UI_* files contain JS code for GUI elements, isolated from any actual functions

/* show/hide UI blocks ("AppMode") */
document.getElementById('appModeSwitcherHandler').onclick = () => {
    Configs.currentAppMode = appModeSwitcher.checked;
    saveConfigs();
    configsUpdateUI();
};
document.getElementById('appModeSwitcherHandler').oncontextmenu = () => {
    appModeSwitcher.indeterminate 
        ? (Configs.currentAppMode = appModeSwitcher.checked)
        : Configs.currentAppMode = 2; 
    saveConfigs();
    configsUpdateUI();

    return false; // don't show context menu
};

/* show/hide menu popup button */
document.getElementById('filemanTogglerBtn').onclick = () => {
    document.getElementById('fileman').style.transform === 'translateY(0%)'
        ? document.getElementById('fileman').style.transform = 'translateY(-115%)'
        : document.getElementById('fileman').style.transform = 'translateY(0%)';
}

/* view mode buttons */
document.getElementById('viewAsGridBtn').onclick = () => {
    Configs.resultsViewMode = 1;
    saveConfigs();
    configsUpdateUI();
};
document.getElementById('viewAsListBtn').onclick = () => {
    Configs.resultsViewMode = 0;
    saveConfigs();
    configsUpdateUI();
};