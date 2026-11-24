function refreshPageHeaderMenu(){
    generateCalculatedEntryData();

    // console.log('settings['transactionsHaveErrors']',settings['transactionsHaveErrors']);
    // console.log('settings['billsHaveErrors']',settings['billsHaveErrors']);
    // console.log('settings['invoicesHaveErrors']',settings['invoicesHaveErrors']);

    let content='';

    // ---- set title
    document.getElementById("ledger-title").innerHTML=capitalize(settings['displayMode']);
    document.getElementById("ledger-subtitle").innerHTML=getFilterText();


    // ---- sticky header: format transactions button
    let element=document.getElementById('change-ledger-transactions');
    if(settings['transactionsHaveErrors']){
        element.classList.add("red");
        [...element.getElementsByClassName('fa-triangle-exclamation')].forEach((icon) => icon.style.display='inline-block');
    }else{
        element.classList.remove("red");
        [...element.getElementsByClassName('fa-triangle-exclamation')].forEach((icon) => icon.style.display='none');
    }

    // ---- sticky header: format bills button
    element=document.getElementById('change-ledger-bills');
    if(settings['billsHaveErrors']){
        element.classList.add("red");
        [...element.getElementsByClassName('fa-triangle-exclamation')].forEach((icon) => icon.style.display='inline-block');
    }else{
        element.classList.remove("red");
        [...element.getElementsByClassName('fa-triangle-exclamation')].forEach((icon) => icon.style.display='none');
    }

    // ---- sticky header: format invoices button
    element=document.getElementById('change-ledger-invoices');
    if(settings['invoicesHaveErrors']){
        element.classList.add("red");
        [...element.getElementsByClassName('fa-triangle-exclamation')].forEach((icon) => icon.style.display='inline-block');
    }else{
        element.classList.remove("red");
        [...element.getElementsByClassName('fa-triangle-exclamation')].forEach((icon) => icon.style.display='none');
    }


    // ---- sidebar: format transactions button
    element=document.getElementById('sidebar-change-ledger-transactions');
    if(settings['transactionsHaveErrors']){
        [...element.getElementsByClassName('fa-triangle-exclamation')].forEach((icon) => icon.style.display='inline-block');
    }else{
        [...element.getElementsByClassName('fa-triangle-exclamation')].forEach((icon) => icon.style.display='none');
    }

    // ---- sidebar: format invoices button
    element=document.getElementById('sidebar-change-ledger-invoices');
    if(settings['invoicesHaveErrors']){
        [...element.getElementsByClassName('fa-triangle-exclamation')].forEach((icon) => icon.style.display='inline-block');
    }else{
        [...element.getElementsByClassName('fa-triangle-exclamation')].forEach((icon) => icon.style.display='none');
    }

    // ---- sidebar: format bills button
    element=document.getElementById('sidebar-change-ledger-bills');
    if(settings['billsHaveErrors']){
        [...element.getElementsByClassName('fa-triangle-exclamation')].forEach((icon) => icon.style.display='inline-block');
    }else{
        [...element.getElementsByClassName('fa-triangle-exclamation')].forEach((icon) => icon.style.display='none');
    }





    // ---- change ledger list
    let transactionsDisplay='none';
    let billsDisplay='none';
    let invoicesDisplay='none';
    let transactionsButtonDisplay='inline-block';
    let billsButtonDisplay='inline-block';
    let invoicesButtonDisplay='inline-block';

    if(settings['displayMode']==='transactions'){
        transactionsDisplay='block';
        transactionsButtonDisplay='none';
    }
    if(settings['displayMode']==='bills'){
        billsDisplay='block';
        billsButtonDisplay='none';
    }
    if(settings['displayMode']==='invoices'){
        invoicesDisplay='block';
        invoicesButtonDisplay='none';
    }

    document.getElementById('transactions').style.display=transactionsDisplay;
    document.getElementById('bills').style.display=billsDisplay;
    document.getElementById('invoices').style.display=invoicesDisplay;

    document.getElementById('change-ledger-transactions').style.display=transactionsButtonDisplay;
    document.getElementById('change-ledger-bills').style.display=billsButtonDisplay;
    document.getElementById('change-ledger-invoices').style.display=invoicesButtonDisplay;

}

/////////////////////////////////////////////////////

function getFilterText(){
    let output='';
    output+='6th Apr 2024 to 5th Apr 2025';
    if(settings['showIgnored']){
        output+=' • ';
        output+='show ignored'
    }else{
        output+=' • ';
        output+='hide ignored'
    }

    if(settings['inOnly']){
        output+=' • ';
        output+='incoming'
    }

    if(settings['outOnly']){
        output+=' • ';
        output+='outgoing'
    }

    return output;
}