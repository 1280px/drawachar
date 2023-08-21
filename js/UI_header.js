// UI_* files contain JS code for GUI elements, isolated from any actual functions

/* show/hide UI blocks ("AppMode") */
document.getElementById('appModeSwitcher').onclick = () => {
    appModeSwitcher.checked ? Configs.currentAppMode = 1 : Configs.currentAppMode = 0;
    saveConfigs();
    updateUI();
};
document.getElementById('appModeSwitcherHandler').oncontextmenu = () => {
    appModeSwitcher.indeterminate ? 
        (appModeSwitcher.checked ? Configs.currentAppMode = 1 : Configs.currentAppMode = 0)
        : Configs.currentAppMode = 2; 
    saveConfigs();
    updateUI();

    return false; // don't show context menu
};

/* show/hide menu popup button */
document.getElementById('filemanTogglerBtn').onclick = function() {
    document.getElementById('fileman').style.transform != 'translateY(-115%)'
        ? document.getElementById('fileman').style.transform = 'translateY(-115%)'
        : document.getElementById('fileman').style.transform = 'translateY(0%)';
}

/* view mode buttons */
document.getElementById('viewAsGridBtn').onclick = () => {
    Configs.resultsViewMode = 1;
    saveConfigs();
    updateUI();
};
document.getElementById('viewAsListBtn').onclick = () => {
    Configs.resultsViewMode = 0;
    saveConfigs();
    updateUI();
};