let Configs = {};

const defaultConfigs = {
    currentDataset: 1,      // DrawAchaR allows to quickly switch from one dataset to another | [DEFAULT - 1]; values supported by GUI - 1 to 8
    currentAppMode: 1,      // Currently shown sections state | [DEFAULT - 1]; 0 - training mode; 1 - recognition mode; 2 - both (via right click)
    resultsViewMode: 0,     // Show results as... | [DEFAULT - 0]; 0 - 4x4 grid; 1 - list
    showDebug: 0,           // Show debugging info | [DEFAULT - 0]; 0 - hide; 1 - show
    useAutoprediction: 1,   // Get predictions on-the-go, no "Predict" button | [DEFAULT - 1]; 0 - no; 1 - yes
    useAutotrain: 1         // Add doodle as example after selecting the option | [DEFAULT - 1]; 0 - no; 1 - yes
}



/* update UI correspondingly to current Configs data */
function updateUI() {
    if (Configs.currentAppMode == 0) {
        appModeSwitcher.checked = false;
        appModeSwitcher.indeterminate = false;
        document.getElementById('trainingMode').style.display = 'unset';
        document.getElementById('recognitionMode').style.display = 'none';
    }
    if (Configs.currentAppMode == 1) {
        appModeSwitcher.checked = true;
        appModeSwitcher.indeterminate = false;
        document.getElementById('trainingMode').style.display = 'none';
        document.getElementById('recognitionMode').style.display = 'unset';
    }
    if (Configs.currentAppMode == 2) {
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
        document.getElementById('debugTogglerBtn').classList.add('selected');
    } else {
        document.getElementById('debug').style.display = 'none';
        document.getElementById('debugTogglerBtn').classList.remove('selected');
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

    if (Configs.showDebug) console.log('[UIUpdater] UI updated successfully.')
}