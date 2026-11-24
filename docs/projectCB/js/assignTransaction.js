function assignTransaction(element){
    // console.log('Assign transaction',element);

    that=element;

    const assignedTransactionGuid=getGuidFromElement(element);
    const assignedTransactionIndex=getIndexFromGuid(assignedTransactionGuid);
    const assignedTransactionType=getEntityTypeFromGuid(assignedTransactionGuid);
    const assignedTransactionList=getList(assignedTransactionType);

    // console.log('assignedTransactionGuid',assignedTransactionGuid);

    // ---- set the modal-title
    document.getElementById('modal-title').innerHTML='Assign Transaction to...';

    const positive = transactions[assignedTransactionIndex]['amountInclVat']>=0;

    // ---- set the modal-body
    let content='';
    content+=assignTransactionChooserXmlDoc;

    const body=document.getElementById('modal-body');
    body.innerHTML=content;

    // ---- populate selects
    setTransactionSelector(element);

    // ---- rules
    // 1. if new is selected:
    //      a. create new invoice/bill with items that match this transaction,
    //      b. assign this transaction to that invoice/bill.
    //
    // 2. if existing is selected:
    //      a. if lineitems all match:
    //          i.   assign this transaction to that invoice/bill.
    //          ii.  pro-rata the lineitem amounts down by the ration of transaction amount/invoive/bill amount.
    //          iii. mark transaction as confirmed.

    // ---- populate modal-summary
    setAssignTransactionChooserSummary();


   // ---- set the modal-controls
    content='';

    content+='<div class="row gx-2 justify-content-end">';
    content+='  <div class="col-auto">';
    content+='      <button class="btn btn-outline-primary" type="button" onclick="closeModal();">Cancel</button>';
    content+='  </div>';
    content+='  <div class="col-auto">';
    content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="assignTransaction_silent(); closeModal(); refreshPage();" disabled>Assign</button>';
    content+='  </div>';
    content+='</div>';


    document.getElementById('modal-controls').innerHTML=content;

    // ---- open the modal
    openModal();



}

////////////////////////////////////////////////////////////////
function setTransactionSelector(element){

    const assignedTransactionGuid=getGuidFromElement(that);
    const assignedTransactionIndex=getIndexFromGuid(assignedTransactionGuid);
    const assignedTransactionType=getEntityTypeFromGuid(assignedTransactionGuid);
    const assignedTransactionList=getList(assignedTransactionType);
    const assignedTransaction=assignedTransactionList[assignedTransactionIndex];
    const adjustedAmount=assignedTransaction['amountInclVat'];
    const isRefund=document.getElementById('refund-selector').checked;
    // console.log('isRefund',isRefund);

    let listType;
    let label;
    let content='';

    if(adjustedAmount>=0){
        if(isRefund){
            listType='bill';
            label='bill to refund';
        }else{
            listType='invoice';
            label='invoice';
        }
    }else{
        if(isRefund){
            listType='invoice';
            label='invoice to refund';
        }else{
            listType='bill';
            label='bill';
        }
    }

    const list=getList(listType);

    content='<option value="" disabled selected>Select '+label+'...</option>';

    if(!isRefund){
        content+='<option value="new'+capitalize(listType)+'">New '+label+'</option>';
    }

    list.forEach((invoiceBill)=>{
        if(!invoiceBill['entityType'].endsWith('_refund')){
            content+='<option value="'+invoiceBill['guid']+'">'+invoiceBill['description']+'</option>';
        }
    });
    document.getElementById('invoiceBill-selector').innerHTML=content;



}
////////////////////////////////////////////////////////////////
function setRefundSelector(element){

    const assignedTransactionGuid=getGuidFromElement(that);
    const assignedTransactionIndex=getIndexFromGuid(assignedTransactionGuid);
    const assignedTransactionType=getEntityTypeFromGuid(assignedTransactionGuid);
    const assignedTransactionList=getList(assignedTransactionType);
    const assignedTransaction=assignedTransactionList[assignedTransactionIndex];
    const adjustedAmount=assignedTransaction['amountInclVat'];
    const isRefund=document.getElementById('refund-selector').checked;
    // console.log('isRefund',isRefund);

    let listType;
    let label;
    let content='';

    if(adjustedAmount>=0){
        if(isRefund){
            listType='bill';
            label='refund for bill';
        }else{
            listType='invoice';
            label='invoice';
        }
    }else{
        if(isRefund){
            listType='invoice';
            label='refund for invoice';
        }else{
            listType='bill';
            label='bill';
        }
    }

    const list=getList(listType);

    let refund_parent_guid=document.getElementById('invoiceBill-selector').value;
    // count refunds for this parent
    let numberOfRefundsForParent=0;
    list.forEach((invoiceBill)=>{
        if(invoiceBill['entityType'].endsWith('_refund') && invoiceBill['refundGuids'][0]===refund_parent_guid){
            numberOfRefundsForParent++;
        }
    });

    let refundChooserInfo='';
    refundChooserInfo+='<p>There is already at least one refund for this '+listType+'.</p>';
    refundChooserInfo+='<p>Select \'New refund for '+listType+'\' from the dropdown below to add another refund - this transaction will be assigned to it; or</p>';
    refundChooserInfo+='<p>Select an existing refund from the dropdown to which to assign this transaction.</p>';
    document.getElementById('refund-chooser-info').innerHTML=refundChooserInfo;

    if(isRefund && document.getElementById('invoiceBill-selector').value!=='' && numberOfRefundsForParent>0){
        document.getElementById('refund-chooser-holder').style.display='flex';

    }else{
        document.getElementById('refund-chooser-holder').style.display='none';

    }



    content+='<option value="new'+capitalize(listType)+'Refund">New '+label+'</option>';

    list.forEach((invoiceBill)=>{
        if(invoiceBill['entityType'].endsWith('_refund') && invoiceBill['refundGuids'][0]===refund_parent_guid){
            content+='<option value="'+invoiceBill['guid']+'">'+invoiceBill['description']+'</option>';
        }
    });
    document.getElementById('refund-chooser').innerHTML=content;


}
////////////////////////////////////////////////////////////////
function assignTransactionSelectorChanged(element){
    if(element.id==='refund-selector'){
        // ---- populate selects
        setTransactionSelector(element);
        setRefundSelector(element);
    }
    if(element.id==='invoiceBill-selector'){
        // ---- populate select
        setRefundSelector(element);
    }
    setAssignTransactionChooserSummary();

}
////////////////////////////////////////////////////////////////
function setAssignTransactionChooserSummary(){
    const choice=document.getElementById('invoiceBill-selector').value;
    const isRefund=document.getElementById('refund-selector').checked;
    // console.log('isRefund',isRefund);
    if(!isRefund){
        // ==== IS NOT A REFUND
        switch (choice){
                case '':
                    break;
                case 'newInvoice':
                    document.getElementById('modal-action-button').disabled=false;
                    document.getElementById('modal-summary').innerHTML='<p>The new invoice will appear on the invoices page and will have items and amounts which match this transaction.</p>';
                    break;
                case 'newBill':
                    document.getElementById('modal-action-button').disabled=false;
                    document.getElementById('modal-summary').innerHTML='<p>The new bill will appear on the bills page and will have items and amounts which match this transaction.</p>';
                    break;
                default:
                    document.getElementById('modal-action-button').disabled=false;
                    const targetType=getEntityTypeFromGuid(choice);
                    const targetIndex=getIndexFromGuid(choice);
                    const targetList=getList(targetType);

                    // see if transaction lineitems match chosen invoiceBill lineitem
                    const transaction=transactions[getIndexFromGuid(getGuidFromElement(that))];
                    // console.log('transaction',transaction);

                    const invoiceBill=targetList[targetIndex];
                    // console.log('invoice',invoiceBill);

                    let match=true;

                    if(transaction['guidsOfChildren'].length !== invoiceBill['guidsOfChildren'].length){
                        match=false;
                    }else{
                        for(let i=0;i<transaction['guidsOfChildren'].length;i++){
                            const transactionLineitemGuid=transaction['guidsOfChildren'][i];
                            const invoiceBillLineitemGuid=invoiceBill['guidsOfChildren'][i];
                            if(fingerprint(transactionLineitemGuid)!==fingerprint(invoiceBillLineitemGuid)){
                                match=false;
                            }
                        }
                    }

                    if(match){
                        document.getElementById('modal-summary').innerHTML='<p>The items on the transaction match the '+targetType+'.</p>';
                    }else{
                        document.getElementById('modal-summary').innerHTML='<p>The items on the transaction do not match the '+targetType+'.</p><p>Assigning this will change the transaction items to match the '+targetType+'.</p>';
                    }
            }
    }else{
        // console.log('choice',choice);
        if(choice===''){
            return;
        }
        // ==== IS A REFUND
        const choice2=document.getElementById('refund-chooser').value;
        // console.log('choice2',choice2);
        let modalSummaryHtml;
        let targetType;
        let targetIndex;
        let targetList;

        let match=true;
        let transaction;
        let invoiceBill;

        switch (choice2){
            case '':
                break;
            case 'newInvoiceRefund':
                document.getElementById('modal-action-button').disabled=false;
                targetType=getEntityTypeFromGuid(choice);
                targetIndex=getIndexFromGuid(choice);
                targetList=getList(targetType);
                modalSummaryHtml='<p>The new invoice refund will appear on the invoices page, will be assigned to your selected invoice, and will have items and amounts which match that invoice.</p>';

                // see if transaction lineitems match chosen invoiceBill lineitem
                transaction=transactions[getIndexFromGuid(getGuidFromElement(that))];
                // console.log('transaction',transaction);

                invoiceBill=targetList[targetIndex];
                // console.log('invoice',invoiceBill);
                match=true;
                if(transaction['guidsOfChildren'].length !== invoiceBill['guidsOfChildren'].length){
                    match=false;
                }else{
                    for(let i=0;i<transaction['guidsOfChildren'].length;i++){
                        const transactionLineitemGuid=transaction['guidsOfChildren'][i];
                        const invoiceBillLineitemGuid=invoiceBill['guidsOfChildren'][i];
                        if(fingerprint(transactionLineitemGuid,true)!==fingerprint(invoiceBillLineitemGuid,true)){
                            match=false;
                        }
                    }
                }
                if(match){
                    modalSummaryHtml+='<p>The items on the transaction match the '+targetType.replace('_',' ')+'.</p>';
                }else{
                    modalSummaryHtml+='<p>The items on the transaction do not match the '+targetType.replace('_',' ')+'.</p><p>Assigning this will change the transaction items to match the '+targetType.replace('_',' ')+'.</p>';
                }

                document.getElementById('modal-summary').innerHTML=modalSummaryHtml;
                break;
            case 'newBillRefund':
                document.getElementById('modal-action-button').disabled=false;
                targetType=getEntityTypeFromGuid(choice);
                targetIndex=getIndexFromGuid(choice);
                targetList=getList(targetType);
                modalSummaryHtml='<p>The new bill refund will appear on the bills page, will be assigned to your selected bill, and will have items and amounts which match that bill.</p>';

                // see if transaction lineitems match chosen invoiceBill lineitem
                transaction=transactions[getIndexFromGuid(getGuidFromElement(that))];
                // console.log('transaction',transaction);

                invoiceBill=targetList[targetIndex];
                // console.log('bill',invoiceBill);
                match=true;
                if(transaction['guidsOfChildren'].length !== invoiceBill['guidsOfChildren'].length){
                    match=false;
                }else{
                    for(let i=0;i<transaction['guidsOfChildren'].length;i++){
                        const transactionLineitemGuid=transaction['guidsOfChildren'][i];
                        const invoiceBillLineitemGuid=invoiceBill['guidsOfChildren'][i];
                        if(fingerprint(transactionLineitemGuid,true)!==fingerprint(invoiceBillLineitemGuid,true)){
                            match=false;
                        }
                    }
                }
                if(match){
                    modalSummaryHtml+='<p>The items on the transaction match the '+targetType.replace('_',' ')+'.</p>';
                }else{
                    modalSummaryHtml+='<p>The items on the transaction do not match the '+targetType.replace('_',' ')+'.</p><p>Assigning this will change the transaction items to match the '+targetType.replace('_',' ')+'.</p>';
                }

                document.getElementById('modal-summary').innerHTML=modalSummaryHtml;
                break;
            default:
                document.getElementById('modal-action-button').disabled=false;
                targetType=getEntityTypeFromGuid(choice2);
                targetIndex=getIndexFromGuid(choice2);
                targetList=getList(targetType);

                // see if transaction lineitems match chosen invoiceBill lineitem
                transaction=transactions[getIndexFromGuid(getGuidFromElement(that))];
                // console.log('transaction',transaction);

                invoiceBill=targetList[targetIndex];
                // console.log('invoice',invoiceBill);

                match=true;

                if(transaction['guidsOfChildren'].length !== invoiceBill['guidsOfChildren'].length){
                    match=false;
                }else{
                    for(let i=0;i<transaction['guidsOfChildren'].length;i++){
                        const transactionLineitemGuid=transaction['guidsOfChildren'][i];
                        const invoiceBillLineitemGuid=invoiceBill['guidsOfChildren'][i];
                        if(fingerprint(transactionLineitemGuid)!==fingerprint(invoiceBillLineitemGuid)){
                            match=false;
                        }
                    }
                }

                if(match){
                    document.getElementById('modal-summary').innerHTML='<p>The items on the transaction match the '+targetType.replace('_',' ')+'.</p>';
                }else{
                    document.getElementById('modal-summary').innerHTML='<p>The items on the transaction do not match the '+targetType.replace('_',' ')+'.</p><p>Assigning this will change the transaction items to match the '+targetType.replace('_',' ')+'.</p>';
                }
        }
    }



}
////////////////////////////////////////////////////////////////
function assignTransaction_silent(){
    const element=that;
    const transactionGuid=getGuidFromElement(element);
    const transactionIndex=getIndexFromGuid(transactionGuid);
    const isRefund=document.getElementById('refund-selector').checked;

    let targetGuid=document.getElementById('invoiceBill-selector').value;
    let refundParentGuid;
    let refundParentType;
    let refundParentList;
    let refundParentIndex;
    let refundParent;

    if(isRefund){
        targetGuid=document.getElementById('refund-chooser').value;
        refundParentGuid=document.getElementById('invoiceBill-selector').value;
        refundParentType=getEntityTypeFromGuid(refundParentGuid);
        refundParentList=getList(refundParentType);
        refundParentIndex=getIndexFromGuid(refundParentGuid);
        refundParent=refundParentList[refundParentIndex];
    }

    if(
        targetGuid==='newInvoice' || targetGuid==='newBill'    ||
        targetGuid==='newInvoiceRefund' || targetGuid==='newBillRefund'
    ){
        // ---- create new tempEntry as invoice or bill or invoice_refund or bill_refund, and new lineitem

        let targetType;
        if(targetGuid==='newInvoice'){targetType='invoice'}
        if(targetGuid==='newBill'){targetType='bill'}
        if(targetGuid==='newInvoiceRefund'){targetType='invoice_refund'}
        if(targetGuid==='newBillRefund'){targetType='bill_refund'}

        getNewTempEntry(targetType);
        getNewTempLineitem();

        // ---- populate new invoice/bill (in tempEntry)
        tempEntry['primaryDate']=transactions[transactionIndex]['primaryDate'];
        tempEntry['description']=transactions[transactionIndex]['description'];

        // ---- populate the refundGuids for refunds only
        if(refundParentGuid){
            tempEntry['refundGuids']=[refundParentGuid];
        }

        // ---- populate the new lineitems (in tempLineitems)

        // reset tempLineitems
        tempLineitems=[];

        // populate tempLineitems
        if(!isRefund){
            // if creating a new invoiceBill from a transaction, the invoiceBill's lineitems must match the transaction's.
            transactions[transactionIndex]['guidsOfChildren'].forEach((guidOfChild) => {
                const indexOfTransactionLineitem=getIndexFromGuid(guidOfChild);
                const transactionLineitem=lineitems[indexOfTransactionLineitem];

                // create blank lineitem in tempLineitem
                getNewTempLineitem();

                // populate the new lineitem
                tempLineitem['guidOfParent']=tempEntry['guid'];
                tempLineitem['description']=transactionLineitem['description'];
                tempLineitem['vatRate']=transactionLineitem['vatRate'];
                tempLineitem['amountInclVat']=transactionLineitem['amountInclVat'];
                if(tempLineitem['amountInclVat']!==''){
                    tempLineitem['amountExclVat']=Math.round(transactionLineitem['amountInclVat']/(1+(transactionLineitem['vatRate']/100))*100)/100;
                    tempLineitem['amountOfVat']=tempLineitem['amountInclVat']-tempLineitem['amountExclVat'];
                }
                tempLineitem['categorisationType']=transactionLineitem['categorisationType'];
                tempLineitem['categorisationCategory']=transactionLineitem['categorisationCategory'];
                tempLineitem['eu']=transactionLineitem['eu'];
                tempLineitem['disallowable']=transactionLineitem['disallowable'];

                // push clone into tempLineitems
                tempLineitems.push(clone(tempLineitem));
            });
        }else{
            // if creating a new invoiceBill_refund from a transaction, the invoiceBill_refund's lineitems must match the invoiceBill.
            refundParent['guidsOfChildren'].forEach((guidOfChild) => {
                const indexOfRefundParentLineitem=getIndexFromGuid(guidOfChild);
                const refundParentLineitem=lineitems[indexOfRefundParentLineitem];

                // create blank lineitem in tempLineitem
                getNewTempLineitem();

                // populate the new lineitem
                tempLineitem['guidOfParent']=tempEntry['guid'];
                tempLineitem['description']=refundParentLineitem['description'];
                tempLineitem['vatRate']=refundParentLineitem['vatRate'];
                tempLineitem['amountInclVat']=refundParentLineitem['amountInclVat'];
                if(tempLineitem['amountInclVat']!==''){
                    tempLineitem['amountExclVat']=Math.round(refundParentLineitem['amountInclVat']/(1+(refundParentLineitem['vatRate']/100))*100)/100;
                    tempLineitem['amountOfVat']=tempLineitem['amountInclVat']-tempLineitem['amountExclVat'];
                }
                tempLineitem['categorisationType']=refundParentLineitem['categorisationType'];
                tempLineitem['categorisationCategory']=refundParentLineitem['categorisationCategory'];
                tempLineitem['eu']=refundParentLineitem['eu'];
                tempLineitem['disallowable']=refundParentLineitem['disallowable'];

                // push clone into tempLineitems
                tempLineitems.push(clone(tempLineitem));
            });
        }

        // ---- create new invoice/bill (the lineitems will also be created).
        newEntry_silent();

        // ---- grab the guid of the newly created invoice/bill and release the rest of the assignment code
        targetGuid=tempEntry['guid'];

        // ---- calc the new invoice or bill
        if(targetType==='invoice' || targetType==='invoice_refund'){
            calcInvoice(targetGuid);
        }
        if(targetType==='bill' || targetType==='bill_refund'){
            calcBill(targetGuid);
        }
    }

    const targetIndex=getIndexFromGuid(targetGuid);
    const targetType=getEntityTypeFromGuid(targetGuid);
    const targetList=getList(targetType);

    // see if already assigned to an invoice
    if(transactions[transactionIndex]['assignedToInvoiceGuid']!==''){
        // yep. so remove without warning
        const oldInvIndex=getIndexFromGuid(transactions[transactionIndex]['assignedToInvoiceGuid']);
        invoices[oldInvIndex]['assignedTransactionsGuids']=invoices[oldInvIndex]['assignedTransactionsGuids'].filter((item) => {return (item !== transactionGuid)});
    }
    // see if already assigned to bill
    if(transactions[transactionIndex]['assignedToBillGuid']!==''){
        // yep. so remove without warning
        const oldBillIndex=getIndexFromGuid(transactions[transactionIndex]['assignedToBillGuid']);
        bills[oldBillIndex]['assignedTransactionsGuids']=bills[oldBillIndex]['assignedTransactionsGuids'].filter((item) => {return (item !== transactionGuid)});
    }

    // set transaction's assignedToInvoiceGuid or assignedToBillGuid
    if(targetType==='invoice' || targetType==='invoice_refund'){
        transactions[transactionIndex]['assignedToInvoiceGuid']=targetGuid;
        transactions[transactionIndex]['assignedToBillGuid']='';
    }
    if(targetType==='bill' || targetType==='bill_refund'){
        transactions[transactionIndex]['assignedToBillGuid']=targetGuid;
        transactions[transactionIndex]['assignedToInvoiceGuid']='';
    }

    // set target (invoice or bill)'s assignedTransactionsGuids
    targetList[targetIndex]['assignedTransactionsGuids'].push(transactionGuid);



    // ---- wrangle transaction
    // 1. change all transaction lineitems to match the invoiceBill lineitems and set as cousins
    const invoiceBill=targetList[targetIndex];
    const transaction=transactions[transactionIndex];

    // 1a. delete all transaction lineitems
    transaction['guidsOfChildren'].forEach((lineitemGuid) => {
        const lineitemIndex=getIndexFromGuid(lineitemGuid);
        // remove cousin links
        getGuidsOfCousins(lineitems[lineitemIndex]['guidOfCousins']).forEach((guidOfCousin) => {
            const cousin=lineitems[getIndexFromGuid(guidOfCousin)];
            cousin['guidOfCousins']='';
        });

        // lineitems[lineitemIndex]['guidOfCousins'].forEach((guidOfCousin)=>{
        //     const cousin=lineitems[getIndexFromGuid(guidOfCousin)];
        //     cousin['guidOfCousins']=cousin['guidOfCousins'].filter((guidOfCousin)=>{
        //         return guidOfCousin!==lineitemGuid;
        //     });
        // });

        // remove lineitem
        lineitems.splice(lineitemIndex,1);
    });
    transaction['guidsOfChildren']=[];

    // 1b. add back lineitem from the invoiceBill
    invoiceBill['guidsOfChildren'].forEach((invoiceBillLineitemGuid) => {
        const invoiceBillLineitem=lineitems[getIndexFromGuid(invoiceBillLineitemGuid)];
        // clone the invoice's lineitem
        tempLineitem=clone(invoiceBillLineitem);
        // get new guid
        const transactionLineitemGuid=uuidv4();
        // console.log('add lineitem',transactionLineitemGuid);
        // get new guid
        tempLineitem['guid']=transactionLineitemGuid;
        // set guidOfParent
        tempLineitem['guidOfParent']=transaction['guid'];
        transaction['guidsOfChildren'].push(transactionLineitemGuid);
        // set cousins
        // add new guid to invoiceBill's guidOfCousins
        let newCousinGuid=invoiceBillLineitem['guidOfCousins']
        if(newCousinGuid===''){
            newCousinGuid=uuidv4();
        }
        invoiceBillLineitem['guidOfCousins']=newCousinGuid;

        // add the invoiceBillLineItemGuid to the tempLineitem
        tempLineitem['guidOfCousins']=newCousinGuid;

        // pro-rata amounts
        // console.log('transaction[\'amountInclVat\']',transaction['amountInclVat']);
        // console.log('invoice[\'amountInclVat\']',invoice['amountInclVat']);
        let correctedInvoiceBillAmountInclVat=1;
        if(invoiceBill['amountInclVat']!==0){
            correctedInvoiceBillAmountInclVat=invoiceBill['amountInclVat']
        }
        tempLineitem['amountInclVat']=Math.round((tempLineitem['amountInclVat']*(transaction['amountInclVat']/correctedInvoiceBillAmountInclVat))*100)/100;
        tempLineitem['amountExclVat']=Math.round(tempLineitem['amountInclVat']/(1+(tempLineitem['vatRate']/100))*100)/100;
        tempLineitem['amountOfVat']=tempLineitem['amountInclVat']-tempLineitem['amountExclVat'];

        // add templLineitem to lineitems
        lineitems.push(clone(tempLineitem));
    });
    setNotification('assignment complete');
}