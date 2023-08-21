/* ### ###   TEH SHAPES CLASSIFIER   ### ### */
let classifier = [];
let net;
let KNNCoefficient = 3; // hand-picked value that works the best, LOL



/* wait for K-Nearest Neighboor and MobileNet pre-trained model
(which gets extended by KNN to use custom data) to load */
async function loadClassifier() {
    document.getElementById('loadingLabel').innerHTML = 'Creating KNN Classifier...';
    classifier = knnClassifier.create();
    classifier.clearAllClasses(); // in case of cached data not being deleted

    document.getElementById('loadingLabel').innerHTML = 'Fetching MobileNet...';
    net = await mobilenet.load();

    init();
}



/* the classifier itself */
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
    if (Configs.showDebug) console.log(`[classifier] raw data: `, raw.confidences, `\n    formatted data: `, outputArray);
    return outputArray;
}



/* add character example using btn class name, or remove it if removal mode is ON */
function addExample(cls) {
    if (!document.getElementById('typeman').classList.contains('removalMode')) {
        const canvasImage = tf.browser.fromPixels(canvas);
        const feature = net.infer(canvasImage, 'conv_preds');

        classifier.addExample(feature, cls);

        resetCanvas();

        canvasImage.dispose();

        if (Configs.showDebug) console.log(`[classifier] added example to "${cls}":`, classifier);

        updateTypemanStats(cls);
        updateKNNCoefficient();

    } else {
        classifier.clearClass(cls);
        document.getElementById('typeman').getElementsByClassName(cls)[0].remove();
    }
}



/* update KNN neighboors quantity coefficient */
function updateKNNCoefficient() {
    let cValues = Object.values(classifier.getClassExampleCount());
    let cLen = cValues.length;
    let cSum = 0;

    for (let i = 0; i < cValues.length; i++) cSum += cValues[i];

    KNNCoefficient = parseInt(2 + Math.floor( cSum / cLen**Math.sqrt(2) ));
    document.getElementById('debugKNNC').innerHTML = `${KNNCoefficient} (${cSum}, ${cLen})`;
}