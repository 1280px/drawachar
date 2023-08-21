/* create buttons for all the result options */
function outputResult(data) {
    document.getElementById('resman').innerHTML = '';
    for (let i in data) {
        let newResultButton = document.createElement("button");
        newResultButton.classList.add("classBtn");
        newResultButton.id = 'class_' + data[i][0];
        newResultButton.title = data[i][0];
        newResultButton.innerHTML = (`<big>${data[i][0]}</big><small>${(data[i][1]*100) + '%'}</small>`);

        document.getElementById('resman').appendChild(newResultButton);
    }
}



/* result btn when left-clicked */
function resmanAddToField(btn) {
    const cls = (btn.id).replace('class_', '');

    if (document.getElementById('clipboardField').value.trim().length > 0) {
        document.getElementById('clipboardField').value += (' ' + cls);
    } else {
        document.getElementById('clipboardField').value += (cls);
    }

    if (Configs.useAutotrain && isInteracted) addExample(cls); // autotrain
}

/* result btn when right-clicked */
function resmanQuickCopy(btn) {
    const cls = (btn.id).replace('class_', '');

    navigator.clipboard.writeText(cls);
    document.getElementById('clipboardField').value = cls;

    btn.disabled = true;
    btn.innerHTML = (`<big><img src="icon/confirm.svg"></big>${btn.innerHTML.split('</big>')[1]}`);
    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = (`<big>${cls}</big>${btn.innerHTML.split('</big>')[1]}`);
    }, 500);

    if (Configs.useAutotrain && isInteracted) addExample(cls); // autotrain

    return false; // don't show context menu
}



/* clipboard field copy all button */
function resmanFieldCopyAll() {
    navigator.clipboard.writeText(document.getElementById('clipboardField').value);
    document.getElementById('clipboardField').value = '';

    document.getElementById('clipboardCopyBtn').disabled = true;
    document.getElementById('clipboardCopyBtn').innerHTML = '<img src="icon/confirm.svg">';
    setTimeout(() => {
        document.getElementById('clipboardCopyBtn').disabled = false;
        document.getElementById('clipboardCopyBtn').innerHTML = '<img src="icon/copy-all.svg">';
    }, 500);
}