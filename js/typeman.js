/* only allow to create a new class if it follows the rules */
function addTypeInputValidate() {
    (document.getElementById("addTypeInput").value.trim().length > 0) 
        ? document.getElementById('addTypeBtn').disabled = false
        : document.getElementById('addTypeBtn').disabled = true;

    (document.getElementById('typeman').classList.contains('removalMode'))
        ? document.getElementById('addTypeInput').disabled = true
        : document.getElementById('addTypeInput').disabled = false;
}



/* format and create a new class button */
function createClassBtn(newClassName) {
    if (newClassName.length != 0) {
        /* remove warning and obsolete symbols after wipe */
        if (document.getElementById('typeman').querySelectorAll('button').length <= 0) {
            document.getElementById('typeman').innerHTML = '';
        }

        /* don't create a new button if this element already exists */
        if (document.getElementById('typeman').getElementsByClassName(newClassName).length <= 0) {
            let newClassBtn = document.createElement("button");

            newClassBtn.classList.add(newClassName);
            newClassBtn.title = newClassName;
            newClassBtn.innerHTML = (`<big>${newClassName}</big><small>x0</small>`);
            newClassBtn.setAttribute('onclick', 'addExample(this.className);');
            document.getElementById('typeman').appendChild(newClassBtn);

        }

        addExample(newClassName);

        document.getElementById("addTypeInput").value = '';
        addTypeInputValidate();
    } else {
        document.getElementById("addTypeInput").value = 'stop hackin u sussy baka';
        addTypeInputValidate();
    }
}



/* class remover */
function toggleClassRemover() {
    if (!document.getElementById('typeman').classList.contains('removalMode')) {
        document.getElementById('removalModeTogglerBtn').classList.add('selected');
        document.getElementById('typeman').classList.add('removalMode');
        document.getElementById('typemanTooltip').innerHTML = "&nbsp;Pick an example to REMOVE";
        addTypeInputValidate();
        document.getElementById("addTypeInput").value = 'Quit the Removal Mode to add';

        for (let i in document.getElementById('typeman').getElementsByTagName('button')) {
            document.getElementById('typeman').getElementsByTagName('button')[i].disabled = false;
        }
    } else {
        document.getElementById('removalModeTogglerBtn').classList.remove('selected');
        document.getElementById('typeman').classList.remove('removalMode');
        if (!isInteracted) {
            for (let i in document.getElementById('typeman').getElementsByTagName('button')) {
                document.getElementById('typeman').getElementsByTagName('button')[i].disabled = true;
            }
        }

        document.getElementById('typemanTooltip').innerHTML = "&nbsp;Pick an example to train...";
        document.getElementById("addTypeInput").value = '';
        addTypeInputValidate();
    }
    
}



/* lazy typeman statistics updater */
function updateTypemanStats(setName) {
    let setNameValue = (classifier.getClassExampleCount())[setName];

    if (setNameValue <= 999) {
        document.getElementById('typeman').getElementsByClassName(setName)[0]
        .innerHTML = (`<big>${setName}</big><small>x${setNameValue}</small>`);
    } else {
        document.getElementById('typeman').getElementsByClassName(setName[i])[0]
        .innerHTML = (`<big>${setName}</big><small>1K+</small>`);
    }
    if (Configs.showDebug) console.log(`[setsTypeman] Updated typeman stats for ${setName} (${setNameValue})`);
}