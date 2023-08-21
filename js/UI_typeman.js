// UI_* files contain JS code for GUI elements, isolated from any actual functions

/* typeman input validation */
document.getElementById('addTypeInput').onchange = () => addTypeInputValidate();
document.getElementById('addTypeInput').onpaste = () => addTypeInputValidate();
document.getElementById('addTypeInput').oninput = () => addTypeInputValidate();

/* add class button using input name */
document.getElementById('addTypeBtn').onclick = () => createClassBtn(
    document.getElementById('addTypeInput').value.trim().replace(/ /g, '-') );

/* class removal mode button */
document.getElementById('removalModeTogglerBtn').onclick = () => toggleClassRemover();