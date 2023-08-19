let Configs = {};

const defaultConfigs = {
    currentDataset: 1,      // DrawAchaR allows to quickly switch from one dataset to another | [DEFAULT - 1]; values supported by GUI - 1 to 8
    currentAppMode: 1,      // Currently shown sections state | [DEFAULT - 1]; 0 - training mode; 1 - recognition mode; 2 - both (via right click)
    resultsViewMode: 0,     // Show results as... | [DEFAULT - 0]; 0 - 4x4 grid; 1 - list
    showDebug: 0,           // Show debugging info | [DEFAULT - 0]; 0 - hide; 1 - show
    useAutoprediction: 1,   // Get predictions on-the-go, no "Predict" button | [DEFAULT - 1]; 0 - no; 1 - yes
    useAutotrain: 1         // Add doodle as example after selecting the option | [DEFAULT - 1]; 0 - no; 1 - yes
}



/* configs LS loader */
function loadConfigs() {
    /* add default settings to LS 'configs' if it doesn't exist */
    if (localStorage.getItem('configs') == null) {
        localStorage.setItem('configs', JSON.stringify(defaultConfigs));
        console.log('[configs] Warning - configs not found or corrupted; loading from default configs...');
    }
        Configs = Object.assign({}, JSON.parse(localStorage.getItem('configs')));
}



/* configs LS saver */
function saveConfigs() {
    localStorage.setItem('configs', JSON.stringify(Configs));
    if (Configs.showDebug) console.log('[configs] Saved current configs:', JSON.parse(localStorage.getItem('configs')));
}