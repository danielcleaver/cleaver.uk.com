function checkBills(){
    bills.forEach((bill) => {
        checkBill(bill['guid']);
    });
}
////////////////////////////////////////////////////////////////////////////////

function checkBill(guid){
    // console.log('check bill',guid);
    
    let billContainsError=false;

    // ==== for each copy of this bill
    [...document.querySelectorAll('.bill[data-id="'+guid+'"]')].forEach((bill) => {

        const billIndex=getIndexFromGuid(guid);

        // ---- add/remove ready class to inline transaction displays
        bills[billIndex]['assignedTransactionsGuids'].forEach((assignedTransactionsGuid) => {
            const transactionIndex = getIndexFromGuid(assignedTransactionsGuid);

            [...document.querySelectorAll('.inline-transaction[data-id="' + assignedTransactionsGuid + '"]')].forEach((inlineTransaction) => {

                transactions[transactionIndex]['ready'] ? inlineTransaction.classList.add('ready') : inlineTransaction.classList.remove('ready');
            });
        });

        // ---- reset this bill
        bill.setAttribute('data-error','false');
        [...bill.querySelectorAll('[data-error]')].forEach((item) =>{
            item.setAttribute('data-error','false');
        });

        // ---- calc and check all lineitems
        bills[billIndex]['guidsOfChildren'].forEach((lineitemGuid) =>{
            calcLineitem(lineitemGuid);
            const anyErrors=checkLineitem(lineitemGuid);
            if(anyErrors){
                billContainsError=true;
            }
        });
        // ---- error if no children
        if(bills[billIndex]['guidsOfChildren'].length===0){
            billContainsError=true;
        }

        // ---- check mandatory fields
        const mandatoryFields=[
            'description',
            'primary-date',
        ];
        mandatoryFields.forEach((fieldname) => {
            [...bill.querySelectorAll('input.'+fieldname+',select.'+fieldname)].forEach((input) =>{
                if(input.value===''){
                    input.setAttribute('data-error','true');
                    // console.log('ERROR missing mandatory field',input);
                    billContainsError=true;
                }else{
                    input.setAttribute('data-error','false');
                }
            });
        });

        // ==== END OF CHECKS


        // ==== PROCESS ITEMS WHICH DEPEND ON THE CHECKS

        // ---- set [data-error]
        if(billContainsError){
            bill.setAttribute('data-error','true');
        }

        // ready?
        bills[billIndex]['ready'] = bills[billIndex]['confirmed'] &&  !billContainsError;
        bills[billIndex]['ready'] ? bill.classList.add('ready') :  bill.classList.remove('ready');

    });



}