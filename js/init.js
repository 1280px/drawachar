async function init() {
    await loadClassifier();

    document.getElementById('loadingLabel').innerHTML = 'Loading sets and configs...';
    await loadConfigs();
    await loadSet();

    configsUpdateUI();
    updateTypemanAvailability();

    document.getElementById('loadingLabel').innerHTML = 'Done!';
    document.getElementById('loadingScreen').style.display = 'none';
    console.info('*beep* JS initialized');
}

window.addEventListener('load', init());