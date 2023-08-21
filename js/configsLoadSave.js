function loadConfigs() {
    /* add default settings to LS 'configs' if it doesn't exist */
    if (!localStorage.getItem('configs') || localStorage.getItem('configs') === "[]") {
        localStorage.setItem('configs', JSON.stringify(defaultConfigs));

        console.warn('[loadConfigs] configs not found or corrupted! loading defaults...');
    }
        Configs = Object.assign({}, JSON.parse(localStorage.getItem('configs')));
}

function saveConfigs() {
    localStorage.setItem('configs', JSON.stringify(Configs));
}