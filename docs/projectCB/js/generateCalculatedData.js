function generateCalculatedEntryData(){
    // console.log('generateCalculatedEntryData');

    // generate calculated values
    settings['transactionsHaveErrors']=false;
    settings['invoicesHaveErrors']=false;
    settings['billsHaveErrors']=false;

    settings['hasTransactions']=false;
    settings['hasInvoices']=false;
    settings['hasBills']=false;

    settings['invoicesOutstanding']=false;
    settings['billsOutstanding']=false;

    // ==== Go through each transaction in the cashbookValues
    transactions.forEach((transaction) => {

        // ---- hasTransactions
        settings['hasTransactions'] = true;

        // ---- transactionsHaveErrors
        if (
            transaction['ignored'] === false &&
            transaction['ready'] === false
        ) {
            settings['transactionsHaveErrors'] = true;
        }

        // ---- populate deletable
        transaction['sourceType'] === 'bankFeed' ? transaction['deletable']=false : transaction['deletable']=true;

    });

    // ==== Go through each invoice in the cashbookValues
    invoices.forEach((invoice) => {

        // ---- hasInvoices
        settings['hasInvoices'] = true;

        // ---- invoicesHaveErrors
        if(invoice['ready'] === false) {
            settings['invoicesHaveErrors'] = true;
        }

        // ---- invoicesOutstanding
        if(invoice['outstandingAmount']!==0){
            settings['invoicesOutstanding']=true;
        }

    });

    // ==== Go through each bill in the cashbookValues
    bills.forEach((bill) => {

        // ---- hasBills
        settings['hasBills'] = true;

        // ---- billsHaveErrors
        if(bill['ready'] === false) {
            settings['billsHaveErrors'] = true;
        }

        // ---- billsOutstanding
        if(bill['outstandingAmount']!==0){
            settings['billsOutstanding']=true;
        }

    });

    // console.log(settings);

    // ==== Transactions page work

    // ---- enable/disable ApplyButton
    settings['qeApplyDisabled']=true;
    settings['qeApplyVisible']=false;

    if(settings['transactionsHaveErrors']){
        transactions.forEach((transaction) => {
            if(transaction['qe'] === true){
                settings['qeApplyVisible']=true;
            }
            if([...document.querySelectorAll('[data-id="'+transaction['guid']+'"]')][0]){
                [...[...document.querySelectorAll('[data-id="'+transaction['guid']+'"]')][0].getElementsByClassName('ignoreConfirmTickbox')].forEach((input) =>{
                    if(input.checked){
                        settings['qeApplyDisabled']=false;
                    }
                })
            }
        });
    }



}
