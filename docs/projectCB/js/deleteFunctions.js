function deleteTransaction(element){
    // console.log('delete transaction:',element);

    that=element;

    // ---- set the modal-title
    document.getElementById('modal-title').innerHTML='Delete Transaction';

    // ---- set the modal-body
    let content='';
    content+='Are you sure you wish to delete this transaction?';

    const body=document.getElementById('modal-body');
    body.innerHTML=content;

    // ---- set the modal-controls
    content='';

    content+='<div class="row gx-2 justify-content-end">';
    content+='  <div class="col-auto">';
    content+='      <button class="btn btn-outline-primary" type="button" onclick="closeModal();">No</button>';
    content+='  </div>';
    content+='  <div class="col-auto">';
    content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="deleteTransaction_silent(); closeModal(); refreshPage();">Yes</button>';
    content+='  </div>';
    content+='</div>';


    document.getElementById('modal-controls').innerHTML=content;

    // ---- open the modal
    openModal();
}

////////////////////////////////////////////////////////////////
function deleteTransaction_silent(){
    const element=that;
    const transactionGuid=getGuidFromElement(element);
    const transactionIndex=getIndexFromGuid(transactionGuid);

    // console.log('deleteTransaction_silent',transactionGuid);

    // 1. remove any line items attached
    transactions[transactionIndex]['guidsOfChildren'].forEach((lineitemGuid) => {
        const lineitemIndex=getIndexFromGuid(lineitemGuid);
        lineitems.splice(lineitemIndex,1);
    });

    // 2. remove this transaction from invoices and bills
    invoices.forEach((invoice) => {
        invoice['assignedTransactionsGuids']=invoice['assignedTransactionsGuids'].filter((item) => {
            return (item !== transactionGuid);
        });
    });

    bills.forEach((bill) => {
        bill['assignedTransactionsGuids']=bill['assignedTransactionsGuids'].filter((item) => {
            return (item !== transactionGuid);
        });
    });

    // 3. remove this transaction from transactions
    transactions.splice(transactionIndex,1);

    setNotification('transaction deleted');

}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function deleteInvoice(element){
    // console.log('delete invoice:',element);

    that=element;

    const invoiceGuid=getGuidFromElement(element);
    const invoiceIndex=getIndexFromGuid(invoiceGuid);
    const entityType=invoices[invoiceIndex]['entityType'];
    const humanReadableEntryType = entityType.replaceAll('_',' ');

    // ---- set the modal-title
    document.getElementById('modal-title').innerHTML='Delete ' + capitalize(humanReadableEntryType);

    // ---- set the modal-body
    let content='';
    if(entityType==='invoice'){
        if(invoices[invoiceIndex]['refundGuids'].length>0){
            content+='<p>Deleting this invoice will also delete all its refunds.</p>'
        }
    }
    if(entityType==='invoice_refund'){
        if(invoices[invoiceIndex]['refundGuids'].length>0){
            content+='<p>Deleting this invoice refund will not delete the invoice to which it is assigned.</p>'
        }
    }
    content+='<p>Are you sure you wish to delete this '+humanReadableEntryType+'?</p>';

    const body=document.getElementById('modal-body');
    body.innerHTML=content;

    // ---- set the modal-controls
    content='';

    content+='<div class="row gx-2 justify-content-end">';
    content+='  <div class="col-auto">';
    content+='      <button class="btn btn-outline-primary" type="button" onclick="closeModal();">No</button>';
    content+='  </div>';
    content+='  <div class="col-auto">';
    content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="deleteInvoice_silent(); closeModal(); refreshPage();">Yes</button>';
    content+='  </div>';
    content+='</div>';


    document.getElementById('modal-controls').innerHTML=content;

    // ---- open the modal
    openModal();
}
////////////////////////////////////////////////////////////////
function deleteInvoice_silent(passedInvoiceGuid){
    let invoiceGuid=getGuidFromElement(that);
    if(passedInvoiceGuid){
        invoiceGuid=passedInvoiceGuid;
    }

    let invoiceIndex=getIndexFromGuid(invoiceGuid);
    const entityType=invoices[invoiceIndex]['entityType'];

    // console.log('deleteInvoice_silent',entityType);

    // 1. remove any line items attached
    invoices[invoiceIndex]['guidsOfChildren'].forEach((lineitemGuid) => {
        const lineitemIndex=getIndexFromGuid(lineitemGuid);
        lineitems.splice(lineitemIndex,1);
    });

    // 2. remove this invoice from any transactions
    transactions.forEach((transaction) => {
        if(transaction['assignedToInvoiceGuid']===invoiceGuid){
            transaction['assignedToInvoiceGuid']='';
        }
    });

    // 3. if a refund, remove its guid from its parent invoice's ['refundGuids']
    //  THIS MUCKS UP invoiceIndex
    if(entityType==='invoice_refund'){
        const parentGuid=invoices[invoiceIndex]['refundGuids'][0]; // there can only be one
        const parentIndex=getIndexFromGuid(parentGuid);
        invoices[parentIndex]['refundGuids']=invoices[parentIndex]['refundGuids'].filter((item) => {
            return (item !==invoiceGuid);
        });
        // re-calc invoiceIndex
        invoiceIndex=getIndexFromGuid(invoiceGuid);
    }

    // 4. if an invoice, remove all refunds
    //  THIS MUCKS UP invoiceIndex
    if(entityType==='invoice'){
        const refundGuids=invoices[invoiceIndex]['refundGuids'];
        refundGuids.forEach((refundGuid) => {
            deleteInvoice_silent(refundGuid);
        });
        // re-calc invoiceIndex
        invoiceIndex=getIndexFromGuid(invoiceGuid);
    }

    // 5. remove this invoice from invoices
    invoices.splice(invoiceIndex,1);

    setNotification(entityType.replaceAll('_',' ')+' deleted');

}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function deleteBill(element){
    // console.log('delete bill:',element);

    that=element;

    const billGuid=getGuidFromElement(element);
    const billIndex=getIndexFromGuid(billGuid);
    const entityType=bills[billIndex]['entityType'];
    const humanReadableEntryType = entityType.replaceAll('_',' ');

    // ---- set the modal-title
    document.getElementById('modal-title').innerHTML='Delete ' + capitalize(humanReadableEntryType);

    // ---- set the modal-body
    let content='';
    if(entityType==='bill'){
        if(bills[billIndex]['refundGuids'].length>0){
            content+='<p>Deleting this bill will also delete all its refunds.</p>'
        }
    }
    if(entityType==='bill_refund'){
        if(bills[billIndex]['refundGuids'].length>0){
            content+='<p>Deleting this bill refund will not delete the bill to which it is assigned.</p>'
        }
    }
    content+='<p>Are you sure you wish to delete this '+humanReadableEntryType+'?</p>';

    const body=document.getElementById('modal-body');
    body.innerHTML=content;

    // ---- set the modal-controls
    content='';

    content+='<div class="row gx-2 justify-content-end">';
    content+='  <div class="col-auto">';
    content+='      <button class="btn btn-outline-primary" type="button" onclick="closeModal();">No</button>';
    content+='  </div>';
    content+='  <div class="col-auto">';
    content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="deleteBill_silent(); closeModal(); refreshPage();">Yes</button>';
    content+='  </div>';
    content+='</div>';


    document.getElementById('modal-controls').innerHTML=content;

    // ---- open the modal
    openModal();
}
////////////////////////////////////////////////////////////////
function deleteBill_silent(passedBillGuid){
    let billGuid=getGuidFromElement(that);
    if(passedBillGuid){
        billGuid=passedBillGuid;
    }

    let billIndex=getIndexFromGuid(billGuid);
    const entityType=bills[billIndex]['entityType'];

    // console.log('deleteBill_silent',billGuid);

    // 1. remove any line items attached
    bills[billIndex]['guidsOfChildren'].forEach((lineitemGuid) => {
        const lineitemIndex=getIndexFromGuid(lineitemGuid);
        lineitems.splice(lineitemIndex,1);
    });

    // 2. remove this bill from any transactions
    transactions.forEach((transaction) => {
        if(transaction['assignedToBillGuid']===billGuid){
            transaction['assignedToBillGuid']='';
        }
    });

    // 3. if a refund, remove its guid from its parent bill's ['refundGuids']
    //  THIS MUCKS UP billIndex
    if(entityType==='bill_refund'){
        const parentGuid=bills[billIndex]['refundGuids'][0]; // there can only be one
        const parentIndex=getIndexFromGuid(parentGuid);
        bills[parentIndex]['refundGuids']=bills[parentIndex]['refundGuids'].filter((item) => {
            return (item !==billGuid);
        });
        // re-calc billIndex
        billIndex=getIndexFromGuid(billGuid);
    }

    // 4. if an bill, remove all refunds
    //  THIS MUCKS UP billIndex
    if(entityType==='bill'){
        const refundGuids=bills[billIndex]['refundGuids'];
        refundGuids.forEach((refundGuid) => {
            deleteBill_silent(refundGuid);
        });
        // re-calc billIndex
        billIndex=getIndexFromGuid(billGuid);
    }

    // 5. remove this bill from bills
    bills.splice(billIndex,1);

    setNotification(entityType.replaceAll('_',' ')+' deleted');
}