// UI_* files contain JS code for GUI elements, isolated from any actual functions

/* autoprediction toggler */
document.getElementById('autopreditionToggler').onclick = () => {
    autopreditionToggler.checked ? Configs.useAutoprediction = 1 : Configs.useAutoprediction = 0;
    saveConfigs();
    updateUI();
};

/* autotrain toggler */
document.getElementById('autotrainToggler').onclick = () => {
    autotrainToggler.checked ? Configs.useAutotrain = 1 : Configs.useAutotrain = 0;
    saveConfigs();
    updateUI();
};