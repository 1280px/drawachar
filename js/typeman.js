/* add character example using btn class name, or remove it if removal mode is ON */
function typemanAddExampleOrRemoveClass(btn) {
    const cls = (btn.id).replace('class_', '');

    !document.getElementById("typeman").classList.contains("removalMode")
        ? addExample(cls)
        : removeClass(cls);
}



/* format and create a new class button */
function addExampleToNewClassBtn(cls) {
    if (cls.length != 0) {
        /* remove warning and obsolete symbols after wipe */
        if (document.getElementById('typeman').querySelectorAll('.classBtn').length <= 0) {
            document.getElementById('typeman').innerHTML = '';
        }

        /* don't create a new button if this element already exists */
        if (!document.getElementById('typeman').querySelector('#class_' + cls)) {
            createClassBtn(cls)
        }
        addExample(cls);

        document.getElementById("addTypeInput").value = '';
    } else {
        document.getElementById("addTypeInput").value = 'stop hackin u sussy baka'; // remember when jokes like this were funny? me neither.
    }

    updateTypemanAvailability();
}

function createClassBtn(cls) {
    let newClassBtn = document.createElement("button");
    newClassBtn.classList.add("classBtn");
    newClassBtn.id = 'class_' + cls;
    newClassBtn.title = cls;
    newClassBtn.innerHTML = (`<big>${cls}</big><small>x0</small>`);

    document.getElementById('typeman').appendChild(newClassBtn);
}



/* toggle class remover */
function toggleClassRemover() {
    if (!document.getElementById('typeman').classList.contains('removalMode')) {
        document.getElementById('removalModeTogglerBtn').classList.add('selected');
        document.getElementById('typeman').classList.add('removalMode');

        document.getElementById('typemanTooltip').innerHTML = '&nbsp;Pick a class to be REMOVED';
        document.getElementById("addTypeInput").placeholder = 'Exit removal mode to add new';
    } else {
        document.getElementById('removalModeTogglerBtn').classList.remove('selected');
        document.getElementById('typeman').classList.remove('removalMode');

        document.getElementById('typemanTooltip').innerHTML = '&nbsp;Pick an class to add example...';
        document.getElementById("addTypeInput").placeholder = '...or create a new one!';
    }

    updateTypemanAvailability();
}



/* bulk button availability updater (for BOTH buttons and addType input) */
function updateTypemanAvailability() {
    if ((!document.getElementById('typeman').classList.contains('removalMode') && isInteracted)
        || document.getElementById('typeman').classList.contains('removalMode')) {
        (document.getElementById('typeman').querySelectorAll('.classBtn')).forEach(
            (btn) => btn.disabled = false
        );
    } else {
        (document.getElementById('typeman').querySelectorAll('.classBtn')).forEach(
            (btn) => btn.disabled = true
        );
    }

    addTypeInputValidate();
}

/* only allow to create a new class if it follows the rules */
function addTypeInputValidate() {
    if ((!document.getElementById('typeman').classList.contains('removalMode') && isInteracted)) {
        document.getElementById("addTypeInput").disabled = false;
    } else {
        document.getElementById("addTypeInput").disabled = true;
    }

    if (!document.getElementById('addTypeInput').disabled
        && document.getElementById("addTypeInput").value.trim().length > 0) {
        document.getElementById("addTypeBtn").disabled = false;
    } else {
        document.getElementById("addTypeBtn").disabled = true;
    }
}

/* lazy typeman statistics updater */
function updateTypemanStats(cls) {
    let clsExampleCount = (classifier.getClassExampleCount())[cls];

    if (clsExampleCount <= 999) {
        document.getElementById('typeman').querySelector('#class_' + cls).innerHTML = (`<big>${cls}</big><small>x${clsExampleCount}</small>`);
    } else {
        document.getElementById('typeman').querySelector('#class_' + cls).innerHTML = (`<big>${cls}</big><small>1K+</small>`);
    }
    if (Configs.showDebug) console.log(`[updateTypemanStats] updated stats for class "${cls}" (${clsExampleCount})`);
}