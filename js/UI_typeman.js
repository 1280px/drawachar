// UI_* files contain JS code for GUI elements, isolated from any actual functions

/* removal mode toggler */
document.getElementById('removalModeTogglerBtn').onclick = () => toggleClassRemover();



/* typeman input validation */
document.getElementById('addTypeInput').onchange = () => addTypeInputValidate();
document.getElementById('addTypeInput').onpaste = () => addTypeInputValidate();
document.getElementById('addTypeInput').oninput = () => addTypeInputValidate();

/* add example button */
document.getElementById('addTypeBtn').onclick = () => addExampleToNewClassBtn(
    document.getElementById('addTypeInput').value.trim().replace(/ /g, '-')
);



/* process class buttons */
document.getElementById('typeman').addEventListener('click', (event) => {
    if (event.target.classList.contains('classBtn')) {
        typemanAddExampleOrRemoveClass(event.target);
    }
});