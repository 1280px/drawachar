function loadSet() {
    if (Configs.showDebug) console.time("loadSetBenchmark");

    if (!localStorage.getItem("dataset") || localStorage.getItem("dataset") === "[]") {
        /* add warnings if the dataset is empty */
        resman.innerHTML = '<h3>No examples found! &#13;Switch to the "Training" mode to add some, perchance.</h3>';
        typeman.innerHTML = '<h3>Nothing to train! &#13;Please add one or more examples you want to begin with.</h3>';
    } else {
        document.getElementById("typeman").innerHTML = ''; // remove warning if present

        const dataset = Object.fromEntries(
            JSON.parse(localStorage.getItem("dataset"))
                .map(([label, data, shape]) => [label, tf.tensor(data, shape)])
        );

        classifier = knnClassifier.create();
        classifier.setClassifierDataset(dataset);

        /* import every class from set and add them to UI */
        for (setClass in dataset) {
            createClassBtn(setClass); // create class buttons just for existing examples
            updateTypemanStats(setClass); // update class counters
            updateTypemanAvailability(); // update typeman validation
        }
    }

    if (Configs.showDebug) console.timeEnd("loadSetBenchmark");
}

function saveSet() {
    if (Configs.showDebug) console.time("saveSetBenchmark");

    const datasetJSON = JSON.stringify(
        Object.entries(classifier.getClassifierDataset())
              .map(([label, data]) => [label, Array.from(data.dataSync()), data.shape])
    );
    localStorage.setItem("dataset", datasetJSON);

    if (Configs.showDebug) console.timeEnd("saveSetBenchmark");
}

function importSet(event) {
    const file = event.target.files[0];

    if (file.type === "application/json") {
        if (Configs.showDebug) console.log("[importSets] loaded JSON file" + file);
        let reader = new FileReader();

        reader.onload = (event) => {
            const datasetJSON = event.target.result;
            localStorage.setItem("dataset", event.target.result);

            loadSet();
        }
        reader.readAsText(file);
    }
}

function exportSet() {
    saveSet();

    const blob = new Blob([localStorage.getItem("dataset")], { type: 'application/json' });
    const blobURL = URL.createObjectURL(blob);
    if (Configs.showDebug) console.log("[exportSets] created new blob" + blob);

    const blobDownload = document.createElement('a');
    blobDownload.href = blobURL;
    blobDownload.download = "DAC_dataset.json";
    blobDownload.click();

    URL.revokeObjectURL(blobURL);
}