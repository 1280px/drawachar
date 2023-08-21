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