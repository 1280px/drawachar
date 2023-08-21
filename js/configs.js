let Configs = {};

const defaultConfigs = {
    currentDataset: 1,      // DrawAchaR allows to quickly switch from one dataset to another   | values supported by GUI - 1 to 6
    currentAppMode: 1,      // Currently shown sections state   | 0 - training mode; 1 - recognition mode; 2 - both (via right click)
    resultsViewMode: 0,     // View results as...   | 0 - 4x4 grid; 1 - list
    showDebug: 0,           // Show debugging info  | 0 - hide; 1 - show
    useAutoprediction: 1,   // Get predictions on-the-go, no "Predict" button   | 0 - no; 1 - yes
    useAutotrain: 0         // Auto-add doodle as example after selecting class | 0 - no; 1 - yes
}



/* update UI correspondingly to current Configs data */
function configsUpdateUI() {
    if (Configs.currentAppMode == 0) {
        appModeSwitcher.checked = false;
        appModeSwitcher.indeterminate = false;
        document.getElementById('trainingMode').style.display = 'unset';
        document.getElementById('recognitionMode').style.display = 'none';
    }
    else if (Configs.currentAppMode == 1) {
        appModeSwitcher.checked = true;
        appModeSwitcher.indeterminate = false;
        document.getElementById('trainingMode').style.display = 'none';
        document.getElementById('recognitionMode').style.display = 'unset';
    }
    else {
        appModeSwitcher.indeterminate = true;
        document.getElementById('trainingMode').style.display = 'unset';
        document.getElementById('recognitionMode').style.display = 'unset';
    }

    if (Configs.resultsViewMode) {
        document.getElementById('viewAsGridBtn').style.display = 'none';
        document.getElementById('viewAsListBtn').style.display = 'block';
        document.getElementById('resman').classList.replace('viewAsGrid', 'viewAsList');
        document.getElementById('typeman').classList.replace('viewAsGrid', 'viewAsList');
    } else {
        document.getElementById('viewAsGridBtn').style.display = 'block';
        document.getElementById('viewAsListBtn').style.display = 'none';
        document.getElementById('resman').classList.replace('viewAsList', 'viewAsGrid');
        document.getElementById('typeman').classList.replace('viewAsList', 'viewAsGrid');
    }

    if (Configs.showDebug) {
        document.getElementById('debug').style.display = 'block';
        document.getElementById('filemanToggleDebug').classList.add('selected');
    } else {
        document.getElementById('debug').style.display = 'none';
        document.getElementById('filemanToggleDebug').classList.remove('selected');
    }

    if (Configs.useAutoprediction) {
        document.getElementById('autopreditionToggler').checked = true;
        document.getElementById('predictBtn').style.display = 'none';
        if (isInteracted) predict();
    } else {
        document.getElementById('autopreditionToggler').checked = false;
        document.getElementById('predictBtn').style.display = 'unset';
    }

    if (Configs.useAutotrain) {
        document.getElementById('autotrainToggler').checked = true;
    } else {
        document.getElementById('autotrainToggler').checked = false;
    }
}