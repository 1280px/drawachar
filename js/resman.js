/* create buttons for all the result options */
function outputResult(data) {
    document.getElementById('resman').innerHTML = '';
    for (let i in data) {
        let newResultButton = document.createElement("button");
        newResultButton.classList.add( data[i][0] );
        newResultButton.title = data[i][0];
        newResultButton.innerHTML = (`<big>${data[i][0]}</big><small>${(data[i][1]*100) + '%'}</small>`);

        newResultButton.setAttribute('onclick', 'resultBtnOnSelect(this);');
        newResultButton.setAttribute('oncontextmenu', 'quickCopy(this);');

        document.getElementById('resman').appendChild(newResultButton);
    }
}



/* result btn when left-clicked */
function resultBtnOnSelect(btn) {
    if (document.getElementById('clipboardField').value.trim().length > 0) {
        document.getElementById('clipboardField').value += (' ' + btn.className);
    } else {
        document.getElementById('clipboardField').value += (btn.className);
    }
}

/* result btn when right-clicked */
function quickCopy(btn) {
    navigator.clipboard.writeText(btn.className);
    document.getElementById('clipboardField').value = btn.className;

    btn.disabled = true;
    btn.innerHTML = (`<big><img src="icon/confirm.svg"></big>${btn.innerHTML.split('</big>')[1]}`);
    setTimeout( function() {
        btn.disabled = false;
        btn.innerHTML = (`<big>${btn.className}</big>${btn.innerHTML.split('</big>')[1]}`);
    }, 500);

    /* autotrain */
    if (Configs.useAutotrain && isInteracted) addExample(btn);

    return false; // don't show context menu
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