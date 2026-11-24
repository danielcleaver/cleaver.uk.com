function refreshPage(){
    setDoNotUsePaperwork();

    drawLedgers();

    generateCalculatedEntryData();
    refreshPageHeaderMenu();
    refreshPageHeaderSummaryBar();

    calcLineitems();
    calcTransactions();
    calcInvoices();
    calcBills();

    refreshLedgers();

    refreshTransactions();
    refreshInvoices();
    refreshBills();
    refreshLineitems();

    checkLineitems();

    checkTransactions();
    checkInvoices();
    checkBills();

    generateCalculatedEntryData();
    refreshPageHeaderMenu();
    refreshPageHeaderSummaryBar();


    validateFields();

    refreshDemoControls();

    reformatInputs();
}
/////////////////////////////////////////////////////////////////
function reformatInputs(){
    [...document.getElementsByClassName('amount-input')].forEach(element => {
        // ==== add class
        if(element.value>0){
            element.classList.add('amount-positive');
            element.classList.remove('amount-zero');
            element.classList.remove('amount-negative');
        }
        if(element.value==0){
            element.classList.remove('amount-positive');
            element.classList.add('amount-zero');
            element.classList.remove('amount-negative');
        }
        if(element.value<0){
            element.classList.remove('amount-positive');
            element.classList.remove('amount-zero');
            element.classList.add('amount-negative');
        }


        // ==== add events
        element.addEventListener('focus', function(element){amountInputFocus(this)});
        element.addEventListener('blur', function(element){amountInputBlur(this)});
        element.addEventListener('keydown', function(event) {amountInputKeydown(event)}, false);

        // ==== add pound sign
        element.value=makePretty(element.value);

    });
}

/////////////////////////////////////////////////////////////////
function amountInputKeydown(event){
    const digitPeriodRegExp = new RegExp('\\d|\\.|-');

    // * Line A: Don't do anything if the Control or Alt keys are pressed down,
    // * as we don't want to prevent the user from using keyboard shortcuts.
    // *
    // * Line B: Make sure we're only handling strings, as those are the only
    // * type of value that we are expecting.
    // *
    // * Line C: We only need to filter out single characters. This is important
    // * because it allows us to continue using keys such as Home, End, and
    // * Enter, all of which are useful for maneuvering the form, and all of which
    // * are longer than 1 character.

    if(event.ctrlKey // (A)
        || event.altKey // (A)
        || typeof event.key !== 'string' // (B)
        || event.key.length !== 1) { // (C)
        return;
    }

    if(!digitPeriodRegExp.test(event.key)) {
        event.preventDefault();
    }

    // console.log(event);

}




/////////////////////////////////////////////////////////////////
function amountInputFocus(element){
    element.value=unmakePretty(element.value);
}

/////////////////////////////////////////////////////////////////
function amountInputBlur(element){
    element.value=makePretty(element.value);
}
/////////////////////////////////////////////////////////////////

function makePretty(value){
    if(value===''){
        return '';
    }
    if(value==='Amount?'){
        return 'Amount?';
    }

    if(Number(value)===0) {
        return '£0.00';
    }

    if(Number(value)>0){
        return '+ £'+Number(value).toFixed(2);
    }

    if(Number(value)<0){
        return '- £'+Math.abs(Number(value)).toFixed(2);
    }


}
/////////////////////////////////////////////////////////////////
function unmakePretty(value){
    return value.replaceAll('+ £','').replaceAll('- £','-');
}