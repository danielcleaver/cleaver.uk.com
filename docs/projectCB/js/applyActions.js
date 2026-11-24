function applyActions(){
    // console.log('Apply Actions');

    let entries=document.getElementsByClassName('transaction');

    [...document.getElementsByClassName('transaction')].forEach((transaction) => {
        const transactionGuid=getGuidFromElement(transaction);
        const transactionIndex=getIndexFromGuid(transactionGuid);
        let processThisEntry=false;

        [...transaction.getElementsByClassName('ignoreConfirmTickbox')].forEach((tickBox) => {
            if(tickBox.checked) {
                processThisEntry = true;
            }
        })

        if(processThisEntry){
            let transactionIgnoreConfirmSelectors=transaction.getElementsByClassName('transaction-ignoreConfirm-selector');

            if(transactionIgnoreConfirmSelectors[0].value==='confirm'){
                // confirm
                transactions[transactionIndex]['confirmed']=true;
                transactions[transactionIndex]['qe']=false;
                transactions[transactionIndex]['ready']=isTransactionReady(transactionIndex);
                // console.log('xxx isTransactionReady(transactionIndex)',isTransactionReady(transactionIndex));
            }else if(transactionIgnoreConfirmSelectors[0].value==='ignore') {
                // ignore
                transactions[transactionIndex]['ignored'] = true;
                transactions[transactionIndex]['confirmed']=true;
                transactions[transactionIndex]['qe'] = false;
                transactions[transactionIndex]['ready']=isTransactionReady(transactionIndex);
            }



        }

    });
    triggerSavingSpinner();

refreshPage();

}