function loadSets() {
    if (localStorage.getItem('dataset') != null) {
        let datasetJSON = localStorage.getItem('dataset');
        let dataset = Object.fromEntries( JSON.parse(datasetJSON).map(([label, data, shape])=>[label, tf.tensor(data, shape)]) );
        console.log(dataset);
        /* get class names */
        console.log(Object.keys(dataset));
        /* get class' examples */
        console.log(dataset[Object.keys(dataset)[0]]);
        /* get class' examples count */
        console.log(dataset[Object.keys(dataset)[0]].shape[0]);

        classifier = knnClassifier.create();
        classifier.setClassifierDataset(dataset);

        /* ТУДУ: реализовать экспорт в файл JSON и импорт из загруженного JSONа
        (можно использовать ту же функцию импортёра, просто делаем быструю валидацию
        и закидываем данные полученного файла в localstorage, по идее изи)
        
        Если останется желание, можно реализовать поддержку 8 слотов сохранения
        (просто использовать 8 разных имён-номеров в localStorage и хранить текущий номер
        в Configs, по умолчнию 1) В fileman также ввести возможность быстрого переключения
        между слотами (при выборе текущий сохраняется и загружается выбранный). Уот так уот :) */

        setsImporter(dataset)
    } else {
        /* add warnings if the dataset in empty */
        resman.innerHTML = '<h3>No examples found!&#13;Switch to the "Training" mode to add some, perchance.</h3>';
        typeman.innerHTML = '<h3>Nothing to train!&#13;Please&nbsp;add one or more examples you want to begin with.</h3>';
    }
}
function setsImporter(dataset) {
    for (i in dataset) {
        createClassBtn(i);
    }
}

function saveSets() {
    let datasetJSON = JSON.stringify( Object.entries(classifier.getClassifierDataset()).map(([label, data])=>[label, Array.from(data.dataSync()), data.shape]) );
    localStorage.setItem('dataset', datasetJSON);
}
