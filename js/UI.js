/* ### ###  RECOGNITION MODE UI ELM  ### ### */
/* result btn when left-clicked */
function resultBtnOnSelect(btn) {
    if (document.getElementById('clipboardField').value.trim().length > 0) {
        document.getElementById('clipboardField').value += (' ' + btn.className);
    } else {
        document.getElementById('clipboardField').value += (btn.className);
    }
}

/* result btn when right-clicked */
function quickCopy(btn) {
    navigator.clipboard.writeText(btn.className);
    document.getElementById('clipboardField').value = btn.className;

    btn.disabled = true;
    btn.innerHTML = (`<big><img src="icon/confirm.svg"></big>${btn.innerHTML.split('</big>')[1]}`);
    setTimeout( function() {
        btn.disabled = false;
        btn.innerHTML = (`<big>${btn.className}</big>${btn.innerHTML.split('</big>')[1]}`);
    }, 500);

    /* autotrain */
    if (Configs.useAutotrain && isInteracted) addExample(btn);

    return false; // don't show context menu
}

/* presiction used by the "Predict" button (if autoprediction is disabled) */
document.getElementById('predictBtn').onclick = async function() {
    predict();
    resetCanvas();
    document.getElementById('predictBtn').disabled = true;
}

/* clipboard field copy all button */
document.getElementById('clipboardCopyBtn').onclick = function() {
    navigator.clipboard.writeText(document.getElementById('clipboardField').value);
    document.getElementById('clipboardField').value = '';

    document.getElementById('clipboardCopyBtn').disabled = true;
    document.getElementById('clipboardCopyBtn').innerHTML = '<img src="icon/confirm.svg">';
    setTimeout( function() {
        document.getElementById('clipboardCopyBtn').disabled = false;
        document.getElementById('clipboardCopyBtn').innerHTML = '<img src="icon/copy-all.svg">';
    }, 500);
}

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



/* ### ###   TRAINING MODE UI ELMS   ### ### */
/* typeman input validation */
document.getElementById('addTypeInput').onchange = () => addTypeInputValidate();
document.getElementById('addTypeInput').onpaste = () => addTypeInputValidate();
document.getElementById('addTypeInput').oninput = () => addTypeInputValidate();

/* add class button using input name */
document.getElementById('addTypeBtn').onclick = () => createClassBtn(
    document.getElementById('addTypeInput').value.trim().replace(/ /g, '-') );

/* class removal mode button */
document.getElementById('removalModeTogglerBtn').onclick = () => toggleClassRemover();



/* ### ### ###  HEADER ELEMENTS  ### ### ### */
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



/* ### ###   MAIN MENU POP-UP ELMS   ### ### */
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