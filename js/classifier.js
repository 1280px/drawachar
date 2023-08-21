let classifier = [];
let net;
let KNNCoefficient = 3; // hand-picked value that works the best

/* wait for K-Nearest Neighboor and MobileNet pre-trained model
(which gets extended by KNN to use custom data) to load */
async function loadClassifier() {
    document.getElementById("loadingLabel").innerHTML = "Creating KNN Classifier...";
    classifier = knnClassifier.create();
    classifier.clearAllClasses(); // in case of cached data not being deleted

    document.getElementById("loadingLabel").innerHTML = "Fetching MobileNet...";
    net = await mobilenet.load();
}



/* the classifier itself */
async function predict() {
    if (Configs.showDebug) var debugBenchmarkStart = new Date();

    if (classifier.getNumClasses() > 0) {
        let image = tf.browser.fromPixels(canvas); // get input data (~15ms)
        let feature = net.infer(image, "conv_preds");

        const result = await classifier.predictClass(feature, KNNCoefficient); // predict class (~200ms)

        outputResult(formatResultData(result)); // format and output the result data (~5ms)
        image.dispose(); // clean up WebGL memory (~0ms)
    }

    if (Configs.showDebug) {
        var debugBenchmarkEnd = new Date();
        document.getElementById("debugBenchmark").innerHTML =
            +debugBenchmarkEnd - +debugBenchmarkStart;
    }
}

/* results data formatter (remove zero-probs and sort by most probable) */
function formatResultData(raw) {
    if (Configs.showDebug) console.log("[formatResultData] full prediction data:", raw);
    let rawKeys = Object.keys(raw.confidences), rawProbs = Object.values(raw.confidences);
    let outputArray = [];

    for (let i = 0; i < rawProbs.length; i++) {
        if (rawProbs[i] > 0) {
            outputArray.push([rawKeys[i], rawProbs[i]]);
        }
    }

    outputArray.sort((a,b) => { return b[1] - a[1]; });
    return outputArray;
}



/* example/class operations */
function addExample(cls) {
    const canvasImage = tf.browser.fromPixels(canvas);
    const feature = net.infer(canvasImage, "conv_preds");

    classifier.addExample(feature, cls);

    resetCanvas();
    canvasImage.dispose();

    if (Configs.showDebug) {
        console.log(`[addExample] added example to "${cls}":`, classifier);
    }

    updateTypemanStats(cls);
    updateKNNCoefficient();
    saveSet(); // autosave to LocalStorage
}

function removeClass(cls) {
    classifier.clearClass(cls);
    document.getElementById("typeman").querySelector('#class_' + cls).remove();

    /* re-add warnings if all classes were deleted */
    if (classifier.getNumClasses() <= 0) {
        resman.innerHTML = '<h3>No examples found! &#13;Switch to the "Training" mode to add some, perchance.</h3>';
        typeman.innerHTML = '<h3>Nothing to train! &#13;Please add one or more examples you want to begin with.</h3>';
    }

    updateKNNCoefficient();
    saveSet(); // autosave to LocalStorage
}



/* update KNN neighboors quantity coefficient */
function updateKNNCoefficient() {
    const cValues = Object.values(classifier.getClassExampleCount());
    let cLen = cValues.length, cSum = 0;

    cValues.forEach((num) => { cSum += num; });
    KNNCoefficient = parseInt(2 + Math.floor(cSum / cLen ** Math.sqrt(2)));

    if (Configs.showDebug) document.getElementById("debugKNNC").innerHTML = `${KNNCoefficient} (cSum: ${cSum}, cLen: ${cLen})`;
}