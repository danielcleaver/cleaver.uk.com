function checkInvoices(){
    invoices.forEach((invoice) => {
        checkInvoice(invoice['guid']);
    });
}
////////////////////////////////////////////////////////////////////////////////

function checkInvoice(guid){
    // console.log('check invoice',guid);

    let invoiceContainsError=false;

    // ==== for each copy of this invoice
    [...document.querySelectorAll('.invoice[data-id="'+guid+'"]')].forEach((invoice) => {

        const invoiceIndex=getIndexFromGuid(guid);

        // ---- add/remove ready class to inline transaction displays
        invoices[invoiceIndex]['assignedTransactionsGuids'].forEach((assignedTransactionsGuid) => {
            const transactionIndex = getIndexFromGuid(assignedTransactionsGuid);

            [...document.querySelectorAll('.inline-transaction[data-id="' + assignedTransactionsGuid + '"]')].forEach((inlineTransaction) => {

                transactions[transactionIndex]['ready'] ? inlineTransaction.classList.add('ready') : inlineTransaction.classList.remove('ready');
            });
        });

        // ---- reset this invoice
        invoice.setAttribute('data-error','false');
        [...invoice.querySelectorAll('[data-error]')].forEach((item) =>{
            item.setAttribute('data-error','false');
        });

        // ---- calc and check all lineitems
        invoices[invoiceIndex]['guidsOfChildren'].forEach((lineitemGuid) =>{
            calcLineitem(lineitemGuid);
            const anyErrors=checkLineitem(lineitemGuid);
            if(anyErrors){
                invoiceContainsError=true;
            }
        });
        // ---- error if no children
        if(invoices[invoiceIndex]['guidsOfChildren'].length===0){
            invoiceContainsError=true;
        }

        // ---- check mandatory fields
        const mandatoryFields=[
            'description',
            'primary-date',
        ];
        mandatoryFields.forEach((fieldname) => {
            [...invoice.querySelectorAll('input.'+fieldname+',select.'+fieldname)].forEach((input) =>{
                if(input.value===''){
                    input.setAttribute('data-error','true');
                    // console.log('ERROR missing mandatory field',input);
                    invoiceContainsError=true;
                }else{
                    input.setAttribute('data-error','false');
                }
            });
        });

        // ==== END OF CHECKS


        // ==== PROCESS ITEMS WHICH DEPEND ON THE CHECKS

        // ---- set [data-error]
        if(invoiceContainsError){
            invoice.setAttribute('data-error','true');
        }

        // ready?
        invoices[invoiceIndex]['ready'] = invoices[invoiceIndex]['confirmed'] &&  !invoiceContainsError;
        invoices[invoiceIndex]['ready'] ? invoice.classList.add('ready') :  invoice.classList.remove('ready');

    });



}