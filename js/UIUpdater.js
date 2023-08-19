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