// UI_* files contain JS code for GUI elements, isolated from any actual functions

document.getElementById('clearDrawingPadBtn').onclick = function() {
    resetCanvas();
}

/* presiction used by the "Predict" button (if autoprediction is disabled) */
document.getElementById('predictBtn').onclick = async function() {
    predict();
    resetCanvas();
    document.getElementById('predictBtn').disabled = true;
}