/* ---- DʀᴀᴡAᴄʜᴀR TFJS b1.20 ---- */



/* ### ###   TEH SHAPES CLASSIFIER   ### ### */
let classifier = [];
let net;
let KNNCoefficient = 3; // hand-picked value that works the best, LOL

/* wait for K-Nearest Neighboor and MobileNet pre-trained model
(which gets extended by KNN to use custom data) to load */
async function loadClassifier() {
    if (!Configs.skipModelLoad) {
        classifier = knnClassifier.create();
        net = await mobilenet.load();

        classifier.clearAllClasses(); // in case of cached data not being deleted
    }
    if (document.getElementById('loadingScreen') != null) {
        document.getElementById('loadingScreen').remove();
    }
}

/* add character example */
function addExample(btn) {
    let btnLabel = btn.className;

    const canvasImage = tf.browser.fromPixels(canvas);
    const feature = net.infer(canvasImage, 'conv_preds');

    classifier.addExample(feature, btnLabel);

    resetCanvas();

    canvasImage.dispose();

    console.log(`[D] added example to "${btnLabel}":`, classifier);
    updateTypemanStats();
    updateKNNCoefficient();
}

/* the classifier itself */
let result = 'a';
async function predict() {
    if (classifier.getNumClasses() > 0) {
        /* get the input data */
        let image = tf.browser.fromPixels(canvas);
        let feature = net.infer(image, 'conv_preds');

        /* format the result */
        resultRaw = await classifier.predictClass(feature, KNNCoefficient);
        let result = formatResultData(resultRaw);
    
        /* finally, output the formatted result data */
        outputResult(result);

        /* clean up WebGL memory */
        image.dispose();
    }
}

/* used by the "Predict" button (if autoprediction is disabled) */
document.getElementById('predictBtn').onclick = async function() {
    predict();
    resetCanvas();
    document.getElementById('predictBtn').disabled = true;
}

/* results data formatter (remove zero-probs and sort by most probable) */
function formatResultData(raw) {
    rawKeys = Object.keys(raw.confidences);
    rawProbs = Object.values(raw.confidences);
    outputArray = [];

    for (let i = 0; i < rawProbs.length; i++) {
        if (rawProbs[i] > 0) {
            outputArray.push( [rawKeys[i], rawProbs[i]] );
        }
    }
    outputArray.sort(function(a, b) {
        return b[1] - a[1];
    });
    console.log(`[R] raw data: `, raw.confidences, `\n    formatted data: `, outputArray);
    return outputArray;
}

/* create buttons for all the result options */
function outputResult(data) {
    document.getElementById('resman').innerHTML = '';
    for (let i in data) {
        let newResultButton = document.createElement("button");
        newResultButton.classList.add( data[i][0] );
        newResultButton.title = data[i][0];
        newResultButton.innerHTML = ( 
            `<big>${data[i][0]}</big><small>${(data[i][1]*100) + '%'}</small>`
        )
        newResultButton.addEventListener('click', function() {
            resultBtnOnSelect(this);
        });
        newResultButton.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            quickCopy(this);
        });
        document.getElementById('resman').appendChild(newResultButton);
    }
}



/* ### ### TYPEMAN & SETS OPERATIONS ### ### */
/* only allow to create a new set if it follows the rules */
function addTypeInputValidate() {
    if ( document.getElementById("addTypeInput").value.trim().length > 0 ) {
        document.getElementById('addTypeBtn').disabled = false;
    } else {
        document.getElementById('addTypeBtn').disabled = true;
    }
}
document.getElementById('addTypeInput').onchange = function() {
    addTypeInputValidate();
}
document.getElementById('addTypeInput').onkeypress = function() {
    addTypeInputValidate();
}
document.getElementById('addTypeInput').onpaste = function() {
    addTypeInputValidate();
}
document.getElementById('addTypeInput').oninput = function() {
    addTypeInputValidate();
}



function createSet() {
    let newSetName = document.getElementById("addTypeInput").value.trim();
    if (newSetName.length != 0) {
        
        /* remove warning and obsolete symbols after wipe */
        if (Object.keys(classifier.classExampleCount).length <= 0) {
            document.getElementById('typeman').innerHTML = '';
        }
        /* don't create a new button if this element already exists */
        if (document.getElementById('typeman').getElementsByClassName(newSetName).length <= 0) {
            let newSetBtn = document.createElement("button");

            newSetBtn.classList.add( document.getElementById("addTypeInput").value.trim() );
            newSetBtn.title = document.getElementById("addTypeInput").value.trim();
            newSetBtn.innerHTML = ( 
                `<big>${document.getElementById("addTypeInput").value.trim()}</big><small>x0</small>`
            );
            document.getElementById('typeman').appendChild(newSetBtn);

            newSetBtn.addEventListener('click', function() { addExample(this); });

            addExample(newSetBtn);
        } else {
            addExample(document.getElementsByClassName(newSetName)[0]);
        };

        document.getElementById("addTypeInput").value = '';
        addTypeInputValidate();
    } else {
        document.getElementById("addTypeInput").value = 'stop hackin u sussy baka';
        addTypeInputValidate();
    }
}
document.getElementById('addTypeBtn').onclick = function() {
    createSet();
}

/* update typeman statistics */
function updateTypemanStats() {
    let cKeys = Object.keys(classifier.getClassExampleCount());
    let cValues = Object.values(classifier.getClassExampleCount());

    for (let i = 0; i < cKeys.length; i++) {
        if (!isNaN(cValues[i]) && isNaN(cValues[i]) != undefined) {
            if (cValues[i] <= 999) {
                document.getElementById('typeman').getElementsByClassName(cKeys[i])[0]
                .innerHTML = ( 
                    `<big>${cKeys[i]}</big><small>x${cValues[i]}</small>`
                );
            } else {
                document.getElementById('typeman').getElementsByClassName(cKeys[i])[0]
                .innerHTML = ( 
                    `<big>${cKeys[i]}</big><small>9999+</small>`
                );
            }
        }
    }
}

/* update KNN neighboors quantity coefficient */
function updateKNNCoefficient() {
    let cValues = Object.values(classifier.getClassExampleCount());
    let cLen = cValues.length;
    let cSum = 0;

    for (let i = 0; i < cValues.length; i++) {
        cSum += cValues[i];
    }

    KNNCoefficient = parseInt(2 + Math.floor( cSum / cLen**Math.sqrt(2) ));
    document.getElementById('debugKNNC').innerHTML = KNNCoefficient;
}

/* wipe button, just in case */
document.getElementById('wipeExamplesBtn').onclick = function() {
    classifier = knnClassifier.create();
    init();
}



/* ### ###     CANVAS DRAWINGPAD     ### ### */
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

        if (!isInteracted) {
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



/* ### ###  OTHER GUI FUNCTIONALITY  ### ### */
/* add warning if no examples found */
function CheckForNoExamples() {
    if (!Configs.skipModelLoad) {
        if (Object.keys(classifier.classExampleCount).length <= 0) {
            resman.innerHTML = '<h3>No examples found!&#13;Switch to the "Training" mode to add some, perchance.</h3>';
            typeman.innerHTML = '<h3>Nothing to train!&#13;Please&nbsp;add one or more examples you want to begin with.</h3>';
        }
    }
}

/* clipboard field copy all button */
document.getElementById('clipboardCopyBtn').onclick = function() {
    navigator.clipboard.writeText(document.getElementById('clipboardField').value);
    document.getElementById('clipboardField').value = '';

    document.getElementById('clipboardCopyBtn').disabled = true;
    document.getElementById('clipboardCopyBtn').innerHTML = '<img src="icon/confirm.svg">';
    setTimeout( function() {
        document.getElementById('clipboardCopyBtn').disabled = false;
        document.getElementById('clipboardCopyBtn').innerHTML = '<img src="icon/copy-all.svg">';
    }, 500);
}

/* result btn when left-clicked */
function resultBtnOnSelect(btn) {
    if (document.getElementById('clipboardField').value.trim().length > 0) {
        document.getElementById('clipboardField').value += (' ' + btn.className);
    } else {
        document.getElementById('clipboardField').value += (btn.className);
    }

    /* autotrain example checker */
    if (Configs.useAutotrain && isInteracted) {
        addExample(btn);
    }
}

/* result btn when right-clicked */
function quickCopy(btn) {
    navigator.clipboard.writeText(btn.className);
    document.getElementById('clipboardField').value = '';

    btn.disabled = true;
    btn.innerHTML = (`<big><img src="icon/confirm.svg"></big>${btn.innerHTML.split('</big>')[1]}`);
    setTimeout( function() {
        btn.disabled = false;
        btn.innerHTML = (`<big>${btn.className}</big>${btn.innerHTML.split('</big>')[1]}`);
    }, 500);

    /* autotrain example checker */
    if (Configs.useAutotrain && isInteracted) {
        addExample(btn);
    }

    return false;
}



/* ### ###   CONFIG LOAD & STORAGE   ### ### */
/* default configs loading */
const defaultConfigs = {
    skipModelLoad: 0,       // Disables shapes classifier loading, useful for UI testing | [DEFAULT - 1]; 0 - no; 1 - yes
    currentAppMode: 1,      // Currently shown sections state | [DEFAULT - 1]; 0 - training mode; 1 - recognition mode; 2 - both (via right click)
    showDebug: 0,           // Show debugging info | [DEFAULT - 0]; 0 - hide; 1 - show
    useAutoprediction: 1,   // Get predictions on-the-go, no "Predict" button | [DEFAULT - 1]; 0 - no; 1 - yes
    useAutotrain: 1         // Add doodle as example after selecting the option | [DEFAULT - 1]; 0 - no; 1 - yes
}
function DefaultifyConfigs() {
    Configs = Object.assign({}, defaultConfigs);
    updateShownAppMode();
    updateOtherConfigs();
}

let Configs = {};

/* clone default configs object unless they loaded from somewhere else (WIP) */
if (true != true) {
    alert('wait what :O'); // one day I'll replace this with an actual code, I swear!
} else {
    DefaultifyConfigs();
}
document.getElementById('wipeConfigsBtn').onclick = function() {
    DefaultifyConfigs();
}


/* ### ###    UI SECTIONS CONFIGS    ### ### */
/* shows/hide UI elements ("AppMode") */
document.getElementById('appModeSwitcher').addEventListener('change', function() {
    appModeSwitcher.checked ? Configs.currentAppMode = 1 : Configs.currentAppMode = 0;
    updateShownAppMode();
});
document.getElementById('appModeSwitcherHandler').addEventListener('contextmenu', function(event) {
    event.preventDefault();
    if (appModeSwitcher.indeterminate) {
        appModeSwitcher.checked ? Configs.currentAppMode = 1 : Configs.currentAppMode = 0; 
    } else {
        Configs.currentAppMode = 2; 
    }
    updateShownAppMode();
});

/* show/hide current mode sections */
function updateShownAppMode() {
    if (Configs.currentAppMode == 0) {
        appModeSwitcher.checked = false;
        appModeSwitcher.indeterminate = false;
        document.getElementById('trainingMode').style.display = 'unset';
        document.getElementById('recognitionMode').style.display = 'none';
    }
    if (Configs.currentAppMode == 1) {
        appModeSwitcher.checked = true;
        appModeSwitcher.indeterminate = false;
        document.getElementById('trainingMode').style.display = 'none';
        document.getElementById('recognitionMode').style.display = 'unset';
    }
    if (Configs.currentAppMode == 2) {
        appModeSwitcher.indeterminate = true;
        document.getElementById('trainingMode').style.display = 'unset';
        document.getElementById('recognitionMode').style.display = 'unset';
    }
}; 



/* ### ###  OTHER SAVE-ABLE CONFIGS  ### ### */
/* show/hide debug */
document.getElementById('debugToggler').addEventListener('change', function() {
    debugToggler.checked ? Configs.showDebug = 1 : Configs.showDebug = 0;
    updateOtherConfigs();
});

/* autoprediction toggler */
document.getElementById('autopreditionToggler').addEventListener('change', function() {
    autopreditionToggler.checked ? Configs.useAutoprediction = 1: Configs.useAutoprediction = 0;
    updateOtherConfigs();
});

/* autotrain toggler */
document.getElementById('autotrainToggler').addEventListener('change', function() {
    autotrainToggler.checked ? Configs.useAutotrain = 1: Configs.useAutotrain = 0;
    updateOtherConfigs();
});


/* other configs updater */
function updateOtherConfigs() {
    if (Configs.showDebug) {
        document.getElementById('debugToggler').checked = true;
        document.getElementById('debug').style.display = 'block';
    } else {
        document.getElementById('debugToggler').checked = false;
        document.getElementById('debug').style.display = 'none';
    }

    if (Configs.useAutoprediction) {
        document.getElementById('autopreditionToggler').checked = true;
        document.getElementById('predictBtn').style.display = 'none';
        if (isInteracted) {
            predict();
        }
    } else {
        document.getElementById('autopreditionToggler').checked = false;
        document.getElementById('predictBtn').style.display = 'unset';
    }

    if (Configs.useAutotrain) {
        document.getElementById('autotrainToggler').checked = true;
    } else {
        document.getElementById('autotrainToggler').checked = false;
    }
}



/* ### ### ### INITIALIZE & LOAD ### ### ### */
function init() {
    loadClassifier();
    resetCanvas();
    updateShownAppMode();
    updateOtherConfigs();
    CheckForNoExamples();
    if (Configs.skipModelLoad) {
        alert('[WARNING!] Model loading was skipped, KNN Classifier will NOT work!')
    }
    console.log('*beep* index.js initialized');
}

init();