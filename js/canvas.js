/* random stroke color, just for fun */
function randomizeStrokeColor() {
    const val = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += val[parseInt(Math.random() * val.length)];
    }
    ctx.strokeStyle = color;
}

let canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d');



/* handle mouse events on canvas */
let isMousedown = false, isInteracted = false;
ctx.lineWidth = 5;

canvas.onmousedown = function(e) {
    let x = e.pageX - canvas.offsetLeft, y = e.pageY - canvas.offsetTop;
    isMousedown = true;
    ctx.beginPath();
    ctx.moveTo(x, y);

    document.getElementById('clearDrawingPadBtn').style.display = 'none';
    document.getElementById('predictBtn').style.display = 'none';

    return false;
};

canvas.onmousemove = function(e) {
    let x = e.pageX - canvas.offsetLeft, y = e.pageY - canvas.offsetTop;
    document.getElementById('debugCoords').innerHTML = `(${x}; ${y})`;
    if (isMousedown) {
        ctx.lineTo(x, y);
        ctx.stroke();

        if (!isInteracted && !document.getElementById('typeman').classList.contains('removalMode')) {
            for (let i in document.getElementById('typeman').getElementsByTagName('button')) {
                document.getElementById('typeman').getElementsByTagName('button')[i].disabled = false;
              }
              addTypeInput.disabled = false;
              isInteracted = true;
        }
    }
};

canvas.onmouseup = function() {
    isMousedown = false;
    if (Configs.useAutoprediction && isInteracted) {
        predict();
    }
    if (!Configs.useAutoprediction && isInteracted) {
        document.getElementById('predictBtn').style.display = 'unset';
    }
    document.getElementById('predictBtn').disabled = false;
    document.getElementById('clearDrawingPadBtn').style.display = 'unset';
};

canvas.oncontextmenu = function(event) {
    event.preventDefault();
    resetCanvas();
}



/* reset previous doodle and fill with bg */
function resetCanvas() {
    ctx.stroke();
    ctx.beginPath();
    isMousedown = false; // prevent random lines due to the mouse loss

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    randomizeStrokeColor();

    if (isInteracted) {
        for (let i in document.getElementById('typeman').getElementsByTagName('button')) {
            document.getElementById('typeman').getElementsByTagName('button')[i].disabled = true;
          }
          addTypeInput.disabled = true;
          isInteracted = false;
          document.getElementById('predictBtn').disabled = true;
    }
}

document.getElementById('clearDrawingPadBtn').onclick = function() {
    resetCanvas();
}