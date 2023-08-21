let canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
let isMousedown = false, isInteracted = false;
ctx.lineWidth = 5;



/* handle mouse events on canvas */
canvas.onmousedown = (event) => {
    let x = event.pageX - canvas.offsetLeft, y = event.pageY - canvas.offsetTop;
    isMousedown = true;
    ctx.beginPath();
    ctx.moveTo(x, y);

    document.getElementById("clearDrawingPadBtn").style.display = "none";
    document.getElementById("predictBtn").style.display = "none";

    return false;
};

canvas.onmousemove = (event) => {
    let x = event.pageX - canvas.offsetLeft, y = event.pageY - canvas.offsetTop;
    if (Configs.showDebug) document.getElementById("debugCoords").innerHTML = `(${x}; ${y})`;

    if (isMousedown) {
        ctx.lineTo(x, y);
        ctx.stroke();
        
        isInteracted = true;
        updateTypemanAvailability()
    }
};

canvas.onmouseup = () => {
    isMousedown = false;

    if (isInteracted) {
        Configs.useAutoprediction
            ? predict()
            : document.getElementById("predictBtn").style.display = "unset";
    }


    document.getElementById("predictBtn").disabled = false;
    document.getElementById("clearDrawingPadBtn").style.display = "unset";
};

canvas.oncontextmenu = (event) => {
    event.preventDefault();
    resetCanvas();
};



/* reset previous doodle and fill with bg */
function resetCanvas() {
    ctx.stroke();
    ctx.beginPath();
    isMousedown = false; // prevent random lines due to the mouse loss

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    randomizeStrokeColor();
    
    document.getElementById("predictBtn").disabled = true;
    isInteracted = false;
    updateTypemanAvailability();
}

/* random stroke color, just for fun */
function randomizeStrokeColor() {
    const val = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += val[parseInt(Math.random() * val.length)];
    }
    ctx.strokeStyle = color;
}