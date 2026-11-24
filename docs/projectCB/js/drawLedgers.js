function drawLedgers(){

    drawTransactions();
    drawInvoices();
    drawBills();
}

/////////////////////////////////////////////
function drawTransactions(){

    let farFutureDateString = '';
    if(!!settings['reverseSortOrder']){
        farFutureDateString = '1000-03-04';
    }else{
        farFutureDateString = '3000-03-04';
    }


    const farFutureDateNumber = Number(farFutureDateString.replaceAll('-',''));

    // sort the transactions
    if(!!settings['reverseSortOrder']){
        transactions.sort((a,b) => {
            a['primaryDate']==='' ? ams = new Date(farFutureDateString).getTime() : ams = new Date(a['primaryDate']).getTime();
            b['primaryDate']==='' ? bms = new Date(farFutureDateString).getTime() : bms = new Date(b['primaryDate']).getTime();
            return ams-bms;
        });
    }else{
        transactions.sort((a,b) => {
            a['primaryDate']==='' ? ams = new Date(farFutureDateString).getTime() : ams = new Date(a['primaryDate']).getTime();
            b['primaryDate']==='' ? bms = new Date(farFutureDateString).getTime() : bms = new Date(b['primaryDate']).getTime();
            return bms-ams;
        });
    }


    let content='';

    let lastDate=999999999;
    let dateNumber=0;
    let dateString='';

    for(let i=0;i<transactions.length;i++){
        // deal with ignored
        if(settings['showIgnored']===false){
            if(transactions[i]['ignored']===true){
                continue;
            }
        }


        // deal with inOnly
        if(settings['inOnly']===true){
            if(transactions[i]['amountInclVat']<0){
                continue;
            }
        }

        // deal with outOnly
        if(settings['outOnly']===true){
            if(transactions[i]['amountInclVat']>0){
                continue;
            }
        }




        // add date dividers
        transactions[i]['primaryDate'] === '' ? dateString=farFutureDateString : dateString=transactions[i]['primaryDate'];
        dateNumber = dateString.replaceAll('-','');
        if(Number(dateNumber)!==Number(lastDate)){
            // --- new date required
            let label = '';
            Number(dateNumber)===Number(farFutureDateNumber) ? label = 'Date?' :label = formatDividerDate(dateString);

            //close date well(unless the first) and start another
            if(lastDate!==999999999){
                content+='</div></div>';
            }
            const classToAdd = creditCheck(dateNumber) ? 'credited' : 'uncredited';
            content+='<div data-date="'+dateNumber+'" class="row date-well '+classToAdd+'"><div class="col">';

            content+=addDateDivider(label);
            // content+=addDateDivider(formatDividerDate(transactions[i]['primaryDate']));
            lastDate=dateNumber;
        }

        // add the transaction
        content+='<div data-id="'+transactions[i]['guid']+'" class="transaction mb-2">'+transactionXmlDoc+'</div>';

    }

    // close last date well
    content+='</div></div>';


    document.getElementById("transactions-list").innerHTML=content;


    calcTransactions();
    checkTransactions();
}
/////////////////////////////////////////////
function drawInvoices(){

    let farFutureDateString = '';
    if(!!settings['reverseSortOrder']){
        farFutureDateString = '1000-03-04';
    }else{
        farFutureDateString = '3000-03-04';
    }


    const farFutureDateNumber = Number(farFutureDateString.replaceAll('-',''));

    // sort the transactions
    if(!!settings['reverseSortOrder']){
        invoices.sort((a,b) => {
            a['primaryDate']==='' ? ams = new Date(farFutureDateString).getTime() : ams = new Date(a['primaryDate']).getTime();
            b['primaryDate']==='' ? bms = new Date(farFutureDateString).getTime() : bms = new Date(b['primaryDate']).getTime();
            return ams-bms;
        });
    }else{
        invoices.sort((a,b) => {
            a['primaryDate']==='' ? ams = new Date(farFutureDateString).getTime() : ams = new Date(a['primaryDate']).getTime();
            b['primaryDate']==='' ? bms = new Date(farFutureDateString).getTime() : bms = new Date(b['primaryDate']).getTime();
            return bms-ams;
        });
    }


    let content='';

    let lastDate=999999999;
    let dateNumber=0;
    let dateString='';
    for(let i=0;i<invoices.length;i++){

        // deal with ignored
        if(settings['showIgnored']===false){
            if(invoices[i]['ignored']==='true'){
                continue;
            }
        }

        // deal with inOnly
        if(settings['inOnly']===true){
            if(invoices[i]['amountInclVat']<0){
                continue;
            }
        }

        // deal with outOnly
        if(settings['outOnly']===true){
            if(invoices[i]['amountInclVat']>0){
                continue;
            }
        }

        // add date dividers
        invoices[i]['primaryDate'] === '' ? dateString=farFutureDateString : dateString=invoices[i]['primaryDate'];
        dateNumber = dateString.replaceAll('-','');
        if(Number(dateNumber)!==Number(lastDate)){
            let label = '';
            Number(dateNumber)===Number(farFutureDateNumber) ? label = 'Date?' :label = formatDividerDate(dateString);

            content+=addDateDivider(label);
            // content+=addDateDivider(formatDividerDate(invoices[i]['primaryDate']));
            lastDate=dateNumber;
        }

        // add the invoice
        content+='<div data-id="'+invoices[i]['guid']+'" class="invoice mb-2">'+invoiceXmlDoc+'</div>';

    }

    document.getElementById("invoices-list").innerHTML=content;


    calcInvoices();
    checkInvoices();
}
/////////////////////////////////////////////
function drawBills(){

    let farFutureDateString = '';
    if(!!settings['reverseSortOrder']){
        farFutureDateString = '1000-03-04';
    }else{
        farFutureDateString = '3000-03-04';
    }


    const farFutureDateNumber = Number(farFutureDateString.replaceAll('-',''));

    // sort the transactions
    if(!!settings['reverseSortOrder']){
        bills.sort((a,b) => {
            a['primaryDate']==='' ? ams = new Date(farFutureDateString).getTime() : ams = new Date(a['primaryDate']).getTime();
            b['primaryDate']==='' ? bms = new Date(farFutureDateString).getTime() : bms = new Date(b['primaryDate']).getTime();
            return ams-bms;
        });
    }else{
        bills.sort((a,b) => {
            a['primaryDate']==='' ? ams = new Date(farFutureDateString).getTime() : ams = new Date(a['primaryDate']).getTime();
            b['primaryDate']==='' ? bms = new Date(farFutureDateString).getTime() : bms = new Date(b['primaryDate']).getTime();
            return bms-ams;
        });
    }


    let content='';

    let lastDate=999999999;
    let dateNumber=0;
    let dateString='';
    for(let i=0;i<bills.length;i++){

        // deal with ignored
        if(settings['showIgnored']===false){
            if(bills[i]['ignored']==='true'){
                continue;
            }
        }

        // deal with inOnly
        if(settings['inOnly']===true){
            if(bills[i]['amountInclVat']<0){
                continue;
            }
        }

        // deal with outOnly
        if(settings['outOnly']===true){
            if(bills[i]['amountInclVat']>0){
                continue;
            }
        }

        // add date dividers
        bills[i]['primaryDate'] === '' ? dateString=farFutureDateString : dateString=bills[i]['primaryDate'];
        dateNumber = dateString.replaceAll('-','');
        if(Number(dateNumber)!==Number(lastDate)){
            let label = '';
            Number(dateNumber)===Number(farFutureDateNumber) ? label = 'Date?' :label = formatDividerDate(dateString);

            content+=addDateDivider(label);
            // content+=addDateDivider(formatDividerDate(bills[i]['primaryDate']));
            lastDate=dateNumber;
        }

        // add the bill
        content+='<div data-id="'+bills[i]['guid']+'" class="bill mb-2">'+billXmlDoc+'</div>';

    }

    document.getElementById("bills-list").innerHTML=content;


    calcBills();
    checkBills();
}
/////////////////////////////////////////////
function formatDividerDate(stringDate){
    date=new Date(stringDate);

    return date.toDateString();

}
/////////////////////////////////////////////
function addDateDivider(label){
    content=''
    content+='<div class="dateDivider ps-2 ps-sm-0 pe-2 pe-sm-0">';
    content+=label;
    content+='</div>';

    return content;
}
/////////////////////////////////////////////
function addDateDividerUndatedItems(){
    content=''
    content+='<div class="dateDivider ps-2 ps-sm-0 pe-2 pe-sm-0">';
    content+='dog';
    content+='</div>';

    return content;
}