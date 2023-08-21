// UI_* files contain JS code for GUI elements, isolated from any actual functions

/* clear canvas button */
document.getElementById('clearDrawingPadBtn').onclick = () => {
    resetCanvas();
}

/* predict button (only shown if autopredict is disabled) */
document.getElementById('predictBtn').onclick = async () => {
    predict();
    document.getElementById('predictBtn').disabled = true;
}