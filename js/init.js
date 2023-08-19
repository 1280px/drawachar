async function init(initMode) {
    if (initMode == 'full') {
        loadClassifier();
    }
    else {
        document.getElementById('loadingLabel').innerHTML = 'Loading sets and configs...';
        loadConfigs();
        loadSets();

        document.getElementById("addTypeInput").value = '';
        updateUI();
        resetCanvas();

        console.log('*beep* JS initialized');
        document.getElementById('loadingScreen').style.display = 'none';
    }
}

window.addEventListener('load', init('full'));