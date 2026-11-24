function assignInvoice(element){
    // console.log('Assign invoice',element);

    that=element;

    const assignedItemGuid=getGuidFromElement(element);
    const assignedItemIndex=getIndexFromGuid(assignedItemGuid);
    const assignedItemType=getEntityTypeFromGuid(assignedItemGuid);
    const assignedItemList=getList(assignedItemType);

    // ---- set the modal-title
    document.getElementById('modal-title').innerHTML='Assign to Invoice...';

    // const positive = transactions[assignedItemIndex]['amountInclVat']>=0;

    // ---- set the modal-body
    let content='';
    content+=assignInvoiceChooserXmlDoc;

    const body=document.getElementById('modal-body');
    body.innerHTML=content;

    // --- populate selects
    content='<option value="" disabled selected>Select transaction...</option>';
    content+='<option value="newTransaction">New transaction</option>';
    transactions.forEach((transaction)=>{
        content+='<option value="'+transaction['guid']+'">'+transaction['description']+'</option>';
    });
    document.getElementById('transaction-selector').innerHTML=content;


    // ---- set the modal-controls
    content='';

    content+='<div class="row gx-2 justify-content-end">';
    content+='  <div class="col-auto">';
    content+='      <button class="btn btn-outline-primary" type="button" onclick="closeModal();">Cancel</button>';
    content+='  </div>';
    content+='  <div class="col-auto">';
    content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="assignInvoice_silent(); closeModal(); refreshPage();" disabled>Assign</button>';
    content+='  </div>';
    content+='</div>';


    document.getElementById('modal-controls').innerHTML=content;

    // ---- open the modal
    openModal();


}
////////////////////////////////////////////////////////////////
function assignInvoiceSelectorChanged(element){

    setAssignInvoiceChooserSummary();

}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function setAssignInvoiceChooserSummary(){
    const choice=document.getElementById('transaction-selector').value;

    switch(choice){
        case '':
            break;
        case'newTransaction':
            document.getElementById('modal-action-button').disabled=false;
            document.getElementById('modal-summary').innerHTML='<p>The new transaction will appear on the transactions page and will have items and amounts which match this invoice.</p>';
            break;
        default:
            document.getElementById('modal-action-button').disabled=false;
            const targetType='transaction';
            const targetIndex=getIndexFromGuid(choice);
            const targetList=getList(targetType);

            // see if transaction lineitems match chosen invoiceBill lineitem
            const transaction=transactions[targetIndex];
            // console.log('transaction',transaction);

            const invoiceBill=invoices[getIndexFromGuid(getGuidFromElement(that))];
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
                document.getElementById('modal-summary').innerHTML='<p>The items on the transaction match the invoice.</p>';
            }else{
                document.getElementById('modal-summary').innerHTML='<p>The items on the transaction do not match the invoice.</p><p class="smaller">Assigning this will change the transaction items to match the invoice.</p>';
            }
    }


}
////////////////////////////////////////////////////////////////
function assignInvoice_silent(){
    const element=that;
    const invoiceGuid=getGuidFromElement(element);
    const invoiceIndex=getIndexFromGuid(invoiceGuid);

    let transactionGuid=document.getElementById('transaction-selector').value;

    if(transactionGuid==='newTransaction'){
        const targetType='transaction';

        getNewTempEntry(targetType);
        getNewTempLineitem();

        // ---- populate new transaction (in tempEntry)
        tempEntry['primaryDate']=invoices[invoiceIndex]['primaryDate'];
        tempEntry['description']=invoices[invoiceIndex]['description'];
        tempEntry['amountInclVat']=invoices[invoiceIndex]['amountInclVat'];
        tempEntry['sourceType']='manual';
        tempEntry['confirmed']=true;

        // ---- populate the new lineitems (in tempLineitems)

        // reset tempLineitems
        tempLineitems=[];

        // populate tempLineitems
        invoices[invoiceIndex]['guidsOfChildren'].forEach((guidOfChild) => {
            const indexOfInvoiceLineitem=getIndexFromGuid(guidOfChild);
            const indexLineitem=lineitems[indexOfInvoiceLineitem];

            // create blank lineitem in tempLineitem
            getNewTempLineitem();

            // populate the new lineitem
            tempLineitem['guidOfParent']=tempEntry['guid'];
            tempLineitem['description']=indexLineitem['description'];
            tempLineitem['vatRate']=indexLineitem['vatRate'];
            tempLineitem['amountInclVat']=indexLineitem['amountInclVat'];
            if(tempLineitem['amountInclVat']!==''){
                tempLineitem['amountExclVat']=Math.round(indexLineitem['amountInclVat']/(1+(indexLineitem['vatRate']/100))*100)/100;
                tempLineitem['amountOfVat']=tempLineitem['amountInclVat']-tempLineitem['amountExclVat'];
            }
            tempLineitem['categorisationType']=indexLineitem['categorisationType'];
            tempLineitem['categorisationCategory']=indexLineitem['categorisationCategory'];
            tempLineitem['eu']=indexLineitem['eu'];
            tempLineitem['disallowable']=indexLineitem['disallowable'];

            // push clone into tempLineitems
            tempLineitems.push(clone(tempLineitem));
        });

        // ---- create new transaction (the lineitems will also be created).
        newEntry_silent();

        // ---- grab the guid of the newly created transaction and release the rest of the assignment code
        transactionGuid=tempEntry['guid'];
        calcTransaction(transactionGuid);
    }

    const transactionIndex=getIndexFromGuid(transactionGuid);

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

    // set transaction's assignedToInvoiceGuid and reset assignedToBillGuid
    transactions[transactionIndex]['assignedToInvoiceGuid']=invoiceGuid;
    transactions[transactionIndex]['assignedToBillGuid']='';

    // set invoice's assignedTransactionsGuids
    invoices[invoiceIndex]['assignedTransactionsGuids'].push(transactionGuid);



    // ---- wrangle transaction
    // 1. change all transaction lineitems to match the invoice/bill lineitems and set as cousins
    const invoice=invoices[invoiceIndex];
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

    // 1b. add back lineitem from the invoice
    invoice['guidsOfChildren'].forEach((invoiceLineitemGuid) => {
        const invoiceLineitem=lineitems[getIndexFromGuid(invoiceLineitemGuid)];
        // clone the invoice's lineitem
        tempLineitem=clone(invoiceLineitem);

        // get new guid
        const transactionLineitemGuid=uuidv4();
        // console.log('add lineitem',transactionLineitemGuid);
        // get new guid
        tempLineitem['guid']=transactionLineitemGuid;
        // set guidOfParent
        tempLineitem['guidOfParent']=transaction['guid'];
        transaction['guidsOfChildren'].push(transactionLineitemGuid);
        // set cousins
        // add new guid to invoice's guidOfCousins
        let newCousinGuid=invoiceLineitem['guidOfCousins']
        if(newCousinGuid===''){
            newCousinGuid=uuidv4();
        }
        invoiceLineitem['guidOfCousins']=newCousinGuid;

        // add the invoiceLineItemGuid to the tempLineitem
        tempLineitem['guidOfCousins']=newCousinGuid;

        // pro-rata amounts
        // console.log('transaction[\'amountInclVat\']',transaction['amountInclVat']);
        // console.log('invoice[\'amountInclVat\']',invoice['amountInclVat']);
        let correctedInvoiceAmountInclVat=1;
        if(invoice['amountInclVat']!==0){
            correctedInvoiceAmountInclVat=invoice['amountInclVat']
        }
        tempLineitem['amountInclVat']=Math.round((tempLineitem['amountInclVat']*(transaction['amountInclVat']/correctedInvoiceAmountInclVat))*100)/100;
        tempLineitem['amountExclVat']=Math.round(tempLineitem['amountInclVat']/(1+(tempLineitem['vatRate']/100))*100)/100;
        tempLineitem['amountOfVat']=tempLineitem['amountInclVat']-tempLineitem['amountExclVat'];

        // add templLineitem to lineitems
        lineitems.push(clone(tempLineitem));

        calcLineitem(transactionLineitemGuid);

    });

    setNotification('assignment complete');
}