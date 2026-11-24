function checkTransactions(){
    transactions.forEach((transaction) => {
        checkTransaction(transaction['guid']);
    });
}
////////////////////////////////////////////////////////////////////////////////

function checkTransaction(guid){
    // console.log('=============================check transaction',guid);

    const transactionIndex=getIndexFromGuid(guid);

    // ==== for each copy of this transaction
    [...document.querySelectorAll('.transaction[data-id="'+guid+'"]')].forEach((transaction) => {

        let transactionContainsError=false;

        // ---- reset this transaction
        transaction.setAttribute('data-error','false');
        [...transaction.querySelectorAll('[data-error]')].forEach((item) =>{
            item.setAttribute('data-error','false');
        });

        // ---- calc and check all lineitems
        transactions[transactionIndex]['guidsOfChildren'].forEach((lineitemGuid) =>{
            calcLineitem(lineitemGuid);
            const anyErrors=checkLineitem(lineitemGuid);
            if(anyErrors){
                transactionContainsError=true;
                // console.log('transaction check failed'+guid+': line items contain errors');
            }
        });
        // ---- error if no children
        if(transactions[transactionIndex]['guidsOfChildren'].length===0){
            transactionContainsError=true;
            // console.log('transaction check failed'+guid+': no children');
        }

        // ---- check mandatory fields
        const mandatoryFields=[
            'description',
            'primary-date'
        ];
        mandatoryFields.forEach((fieldname) => {
            [...transaction.querySelectorAll('input.'+fieldname+',select.'+fieldname)].forEach((input) =>{
                if(input.value===''){
                    input.setAttribute('data-error','true');
                    // console.log('ERROR missing mandatory field',input);
                    transactionContainsError=true;
                    // console.log('transaction check failed'+guid+': missing mandatory field',input);
                }else{
                    input.setAttribute('data-error','false');
                }
            });
        });

        // ---- check lineitem amountInclVat total to transaction amountInclVat
        let lineItemTotal=0;
        transactions[transactionIndex]['guidsOfChildren'].forEach((lineitemGuid) =>{
            const lineitemIndex=getIndexFromGuid(lineitemGuid);
            lineItemTotal+=lineitems[lineitemIndex]['amountInclVat'];
        });
        if(lineItemTotal!==transactions[transactionIndex]['amountInclVat']){
            // totals do not match
            transactionContainsError=true;
            // console.log('transaction check failed'+guid+': totals do not match');
            // also highlight transaction amountInclVat
            [...transaction.getElementsByClassName('amount-incl-vat')].forEach((field)=>{
                field.setAttribute('data-error','true');
            });
            // also highlight all lineitem amountInclVat
            [...transaction.getElementsByClassName('lineitem-amount-incl-vat')].forEach((field)=>{
                field.setAttribute('data-error','true');
            });
        }

        let errorBecauseUnassigned=false;
        // ---- if this transaction is within an accrual period, then it must be assigned to an invoice or bill
        if(accountingMethodForDate(transactions[transactionIndex]['primaryDate'])==='accrual'){
            if(
                transactions[transactionIndex]['assignedToInvoiceGuid']==='' &&
                transactions[transactionIndex]['assignedToBillGuid']===''
            ){
                // console.log('errorBecauseUnassigned check failed'+guid+', no assigned bill or invoice.');
                errorBecauseUnassigned=true;
            }
        }

        // ---- set readonly-ness of fields
        if(transactions[transactionIndex]['sourceType'] === 'bankFeed'){
            // ---- bankfeed items must have date and description disabled
            [...transaction.getElementsByClassName('primary-date')].forEach((field)=>{
                field.disabled=true;
            });
            [...transaction.getElementsByClassName('description')].forEach((field)=>{
                // field.disabled=true;
            });
        }



        // ==== END OF CHECKS

        // console.log('END OF CHECKS',guid, transactionContainsError,errorBecauseUnassigned);
        // ==== PROCESS ITEMS WHICH DEPEND ON THE CHECKS

        // ---- set [data-error]
        if(transactionContainsError || errorBecauseUnassigned){
            transaction.setAttribute('data-error','true');
        }

        // ---- enable/disable ignoreConfirmTickbox if there are no errors or if it's set to IGNORE
        let disableTickbox = transactionContainsError && [...transaction.getElementsByClassName('form-control transaction-ignoreConfirm-selector')][0].value==='confirm';

        if([...transaction.getElementsByClassName('form-control transaction-ignoreConfirm-selector')][0].classList.contains('qe-disabled')){
            disableTickbox=true;
        }

        [...transaction.getElementsByClassName('ignoreConfirmTickbox')].forEach((checkbox)=>{
            checkbox.disabled=disableTickbox;
        });

        // ---- enable/disable ASSIGN link if there are errors
        // if(transactionContainsError || !transactions[transactionIndex]['confirmed']){
        //     [...transaction.getElementsByClassName('assign-transaction-link')].forEach((anchor)=>{
        //         anchor.classList.add('disabledAnchor');
        //     });
        // }else{
        //     [...transaction.getElementsByClassName('assign-transaction-link')].forEach((anchor)=>{
        //         anchor.classList.remove('disabledAnchor');
        //     });
        // }

        // ---- add error class to link if errorBecauseUnassigned
        if(errorBecauseUnassigned || !transactions[transactionIndex]['confirmed']){
            [...transaction.getElementsByClassName('assign-transaction-link')].forEach((anchor)=>{
                anchor.classList.add('errorAnchor');
            });
        }else{
            [...transaction.getElementsByClassName('assign-transaction-link')].forEach((anchor)=>{
                anchor.classList.remove('errorAnchor');
            });
        }


        // ---- ready?
        transactions[transactionIndex]['ready'] = transactions[transactionIndex]['confirmed'] &&  !transactionContainsError && !errorBecauseUnassigned;
        transactions[transactionIndex]['ready'] ? transaction.classList.add('ready') :  transaction.classList.remove('ready');


    });



}

///////////////////////////////////////////////////////
function accountingMethodForDate(date){
    // ---- this function returns 'cashbasis' or 'accrual' depending on the accounting method on the passed date.

   return(settings['accountingMethod']);
}