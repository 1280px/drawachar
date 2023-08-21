// UI_* files contain JS code for GUI elements, isolated from any actual functions

/* autoprediction toggler */
document.getElementById('autopreditionToggler').onclick = () => {
    Configs.useAutoprediction = autopreditionToggler.checked;
    saveConfigs();
    configsUpdateUI();
};

/* autotrain toggler */
document.getElementById('autotrainToggler').onclick = () => {
    Configs.useAutotrain = autotrainToggler.checked;
    saveConfigs();
    configsUpdateUI();
};



/* copy to clipboard button */
document.getElementById('clipboardCopyBtn').onclick = () => resmanFieldCopyAll();



/* process class buttons */
document.getElementById('resman').addEventListener('click', (event) => {
    if (event.target.classList.contains('classBtn')) {
        resmanAddToField(event.target);
    }
});

document.getElementById('resman').addEventListener('contextmenu', (event) => {
    if (event.target.classList.contains('classBtn')) {
        event.preventDefault();
        resmanQuickCopy(event.target);
    }
});