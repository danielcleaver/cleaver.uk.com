function unassign(element){
    // console.log(element);

    that=element;

    const assignedItemGuid=getGuidFromElement(element);
    const assignedItemIndex=getIndexFromGuid(assignedItemGuid);
    const assignedItemType=getEntityTypeFromGuid(assignedItemGuid);
    const assignedItemList=getList(assignedItemType);

    const assignedToItemGuid=getGuidFromElement_custom(element,['inline-invoiceBill','inline-transaction']);
    const assignedToItemIndex=getIndexFromGuid(assignedToItemGuid);
    const assignedToItemType=getEntityTypeFromGuid(assignedToItemGuid);
    const assignedToItemList=getList(assignedToItemType);


    // console.log('assignedToItemGuid',assignedToItemGuid);
    // console.log('assignedToItemIndex',assignedToItemIndex);
    // console.log('assignedToItemType',assignedToItemType);
    // console.log('assignedToItemList',assignedToItemList);

    // ---- set the modal-title
    document.getElementById('modal-title').innerHTML='Unassign Transaction';

    // ---- set the modal-body
    let content='';

    if(assignedItemType==='transaction'){
        content+='<p>Unassign this transaction from the '+assignedToItemType.replaceAll('_',' ')+'?</p>';
    }
    if(assignedItemType==='invoice'){
        content+='<p>Unassign the transaction from this invoice?</p>';
    }
    if(assignedItemType==='invoice_refund'){
        content+='<p>Unassign the transaction from this invoice refund?</p>';
    }
    if(assignedItemType==='bill'){
        content+='<p>Unassign the transaction from this bill?</p>';
    }
    if(assignedItemType==='bill_refund'){
        content+='<p>Unassign the transaction from this bill refund?</p>';
    }

    //
    // content+='<p>Unassign this '+assignedItemType+' from the '+assignedToItemType+':</p>';
    //
    // content+='<p class="fw-bold">'+assignedToItemList[assignedToItemIndex]['primaryDate']+' '+assignedToItemList[assignedToItemIndex]['description']+' '+formatPoundsPence(assignedToItemList[assignedToItemIndex]['amountInclVat'])+'</p>';

    document.getElementById('modal-body').innerHTML=content;

    // ---- set the modal-controls
    content='';

    content+='<div class="row gx-2 justify-content-end">';
    content+='  <div class="col-auto">';
    content+='      <button class="btn btn-outline-primary" type="button" onclick="closeModal();">No</button>';
    content+='  </div>';
    content+='  <div class="col-auto">';
    content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="unassign_silent(); closeModal(); refreshPage();">Yes</button>';
    content+='  </div>';
    content+='</div>';


    document.getElementById('modal-controls').innerHTML=content;

    // ---- open the modal
    openModal();

}
/////////////////////////////////////////////////////
function unassign_silent(){
    const element=that;

    const assignedItemGuid=getGuidFromElement(element);
    const assignedItemIndex=getIndexFromGuid(assignedItemGuid);
    const assignedItemType=getEntityTypeFromGuid(assignedItemGuid);
    const assignedItemList=getList(assignedItemType);

    let assignedToItemGuid='';
    if(element.nodeName==='A'){
        assignedToItemGuid=getGuidFromElement_custom(element,['inline-invoiceBill','inline-transaction']);
    }else{
        // this must be an ignore button on a transaction
        assignedToItemGuid=transactions[assignedItemIndex]['assignedToInvoiceGuid']+transactions[assignedItemIndex]['assignedToBillGuid'];
    }


    const assignedToItemIndex=getIndexFromGuid(assignedToItemGuid);
    const assignedToItemType=getEntityTypeFromGuid(assignedToItemGuid);
    const assignedToItemList=getList(assignedItemType);

    // console.log('assignedItemGuid',assignedItemGuid);
    // console.log('assignedItemType',assignedItemType);
    // console.log('assignedToItemGuid',assignedToItemGuid);
    // console.log('assignedToItemType',assignedToItemType);

    if(assignedItemType==='transaction' && (assignedToItemType==='invoice' || assignedToItemType==='invoice_refund')){
        // ---- a transaction assigned to an invoice

        // remove entry in transaction assignedToInvoiceGuid
        transactions[assignedItemIndex]['assignedToInvoiceGuid']='';

        // remove entry in invoice assignedTransactionsGuids
        invoices[assignedToItemIndex]['assignedTransactionsGuids']=invoices[assignedToItemIndex]['assignedTransactionsGuids'].filter((item) => {
            return (item !== assignedItemGuid)
        });

    }
    if(assignedItemType==='transaction' && (assignedToItemType==='bill' || assignedToItemType==='bill_refund')){
        // ---- a transaction assigned to an bill

        // remove entry in transaction assignedToInvoiceGuid
        transactions[assignedItemIndex]['assignedToInvoiceGuid']='';

        // remove entry in bill assignedTransactionsGuids
        bills[assignedToItemIndex]['assignedTransactionsGuids']=bills[assignedToItemIndex]['assignedTransactionsGuids'].filter((item) => {
            return (item !== assignedItemGuid);
        });
    }



    if((assignedItemType==='invoice' || assignedItemType==='invoice_refund') && assignedToItemType==='transaction'){
        // ---- an invoice assigned to a transaction

        // remove entry in invoice assignedTransactionsGuids
        invoices[assignedItemIndex]['assignedTransactionsGuids']=invoices[assignedItemIndex]['assignedTransactionsGuids'].filter((item) => {
            return (item !== assignedToItemGuid)
        });

        // remove entry in transaction assignedToInvoiceGuid
        transactions[assignedToItemIndex]['assignedToInvoiceGuid']='';

    }
    if((assignedItemType==='bill' || assignedItemType==='bill_refund') && assignedToItemType==='transaction'){
        // ---- an bill assigned to a transaction

        // remove entry in bill assignedTransactionsGuids
        bills[assignedItemIndex]['assignedTransactionsGuids']=bills[assignedItemIndex]['assignedTransactionsGuids'].filter((item) => {
            return (item !== assignedToItemGuid)
        });

        // remove entry in transaction assignedToInvoiceGuid
        transactions[assignedToItemIndex]['assignedToInvoiceGuid']='';

    }


    // ==== remove cousinGuid from all lineitems of assigned transaction.
    //      also check to see if there are any orphaned cousins, and clear if there are.
    let transactionGuid;
    if(assignedItemType==='transaction'){
        transactionGuid=assignedItemGuid;
    }else{
        if(assignedToItemType==='transaction'){
            transactionGuid=assignedToItemGuid;
        }
    }

    const transaction=transactions[getIndexFromGuid(transactionGuid)];
    transaction['guidsOfChildren'].forEach((lineitemGuid) => {
        const transactionLineItem=lineitems[getIndexFromGuid(lineitemGuid)];
        // get the cousinGuid
        const cousinGuid=transactionLineItem['guidOfCousins'];

        const cousins=getGuidsOfCousins(cousinGuid);
        if(cousins.length<=2){
            // one or two cousins, so clear them all
            cousins.forEach((cousin)=>{
                cousin['guidOfCousins']='';
            });
        }else{
            // more than two cousins, only clear this transaction's lineitem
            transactionLineItem['guidOfCousins']='';
        }

    });

    setNotification(assignedItemType.replaceAll('_',' ')+' unassigned from '+assignedToItemType.replaceAll('_',' '));



}