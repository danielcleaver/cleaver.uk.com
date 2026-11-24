function assignBill(element){
    // console.log('Assign bill',element);

    that=element;

    const assignedItemGuid=getGuidFromElement(element);
    const assignedItemIndex=getIndexFromGuid(assignedItemGuid);
    const assignedItemType=getEntityTypeFromGuid(assignedItemGuid);
    const assignedItemList=getList(assignedItemType);

    // ---- set the modal-title
    document.getElementById('modal-title').innerHTML='Assign to Bill...';

    // const positive = transactions[assignedItemIndex]['amountInclVat']>=0;

    // ---- set the modal-body
    let content='';
    content+=assignBillChooserXmlDoc;

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
    content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="assignBill_silent(); closeModal(); refreshPage();" disabled>Assign</button>';
    content+='  </div>';
    content+='</div>';


    document.getElementById('modal-controls').innerHTML=content;

    // ---- open the modal
    openModal();


}
////////////////////////////////////////////////////////////////
function assignBillSelectorChanged(element){

    setAssignBillChooserSummary();

}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function setAssignBillChooserSummary(){
    const choice=document.getElementById('transaction-selector').value;

    switch(choice) {
        case '':
            break;
        case'newTransaction':
            document.getElementById('modal-action-button').disabled=false;
            document.getElementById('modal-summary').innerHTML='<p>The new transaction will appear on the transactions page and will have lineitems and amounts which match this bill.</p>';
            break;
        default:
            document.getElementById('modal-action-button').disabled=false;
            const targetType='transaction';
            const targetIndex=getIndexFromGuid(choice);
            const targetList=getList(targetType);

            // see if transaction lineitems match chosen invoiceBill lineitem
            const transaction=transactions[targetIndex];
            // console.log('transaction',transaction);

            const invoiceBill=bills[getIndexFromGuid(getGuidFromElement(that))];
            // console.log('bill',invoiceBill);

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
                document.getElementById('modal-summary').innerHTML='<p>The items on the transaction match the bill.</p>';
            }else{
                document.getElementById('modal-summary').innerHTML='<p>The items on the transaction do not match the bill.</p><p class="smaller">Assigning this will change the transcation items to match the bill.</p>';
            }
    }


}
////////////////////////////////////////////////////////////////
function assignBill_silent(){
    const element=that;
    const billGuid=getGuidFromElement(element);
    const billIndex=getIndexFromGuid(billGuid);

    let transactionGuid=document.getElementById('transaction-selector').value;

    if(transactionGuid==='newTransaction'){
        const targetType='transaction';

        getNewTempEntry(targetType);
        getNewTempLineitem();

        // ---- populate new transaction (in tempEntry)
        tempEntry['primaryDate']=bills[billIndex]['primaryDate'];
        tempEntry['description']=bills[billIndex]['description'];
        tempEntry['amountInclVat']=bills[billIndex]['amountInclVat'];
        tempEntry['sourceType']='manual';
        tempEntry['confirmed']=true;

        // ---- populate the new lineitems (in tempLineitems)

        // reset tempLineitems
        tempLineitems=[];

        // populate tempLineitems
        bills[billIndex]['guidsOfChildren'].forEach((guidOfChild) => {
            const indexOfbillLineitem=getIndexFromGuid(guidOfChild);
            const indexLineitem=lineitems[indexOfbillLineitem];

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

    // see if already assigned to an bill
    if(transactions[transactionIndex]['assignedToBillGuid']!==''){
        // yep. so remove without warning
        const oldInvIndex=getIndexFromGuid(transactions[transactionIndex]['assignedToBillGuid']);
        bills[oldInvIndex]['assignedTransactionsGuids']=bills[oldInvIndex]['assignedTransactionsGuids'].filter((item) => {return (item !== transactionGuid)});
    }
    // see if already assigned to bill
    if(transactions[transactionIndex]['assignedToBillGuid']!==''){
        // yep. so remove without warning
        const oldBillIndex=getIndexFromGuid(transactions[transactionIndex]['assignedToBillGuid']);
        bills[oldBillIndex]['assignedTransactionsGuids']=bills[oldBillIndex]['assignedTransactionsGuids'].filter((item) => {return (item !== transactionGuid)});
    }

    // set transaction's assignedToBillGuid and reset assignedToBillGuid
    transactions[transactionIndex]['assignedToBillGuid']=billGuid;
    transactions[transactionIndex]['assignedToBillGuid']='';

    // set bill's assignedTransactionsGuids
    bills[billIndex]['assignedTransactionsGuids'].push(transactionGuid);



    // ---- wrangle transaction
    // 1. change all transaction lineitems to match the invoice/bill lineitems and set as cousins
    const bill=bills[billIndex];
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

    // 1b. add back lineitem from the bill
    bill['guidsOfChildren'].forEach((billLineitemGuid) => {
        const billLineitem=lineitems[getIndexFromGuid(billLineitemGuid)];
        // clone the bill's lineitem
        tempLineitem=clone(billLineitem);
        // get new guid
        const transactionLineitemGuid=uuidv4();
        // console.log('add lineitem',transactionLineitemGuid);
        // get new guid
        tempLineitem['guid']=transactionLineitemGuid;
        // set guidOfParent
        tempLineitem['guidOfParent']=transaction['guid'];
        transaction['guidsOfChildren'].push(transactionLineitemGuid);
        // set cousins
        // add new guid to bill's guidOfCousins
        let newCousinGuid=billLineitem['guidOfCousins']
        if(newCousinGuid===''){
            newCousinGuid=uuidv4();
        }
        billLineitem['guidOfCousins']=newCousinGuid;

        // add the billLineItemGuid to the tempLineitem
        tempLineitem['guidOfCousins']=newCousinGuid;


        // pro-rata amounts
        // console.log('transaction[\'amountInclVat\']',transaction['amountInclVat']);
        // console.log('bill[\'amountInclVat\']',bill['amountInclVat']);
        let correctedBillAmountInclVat=1;
            if(bill['amountInclVat']!==0){
            correctedBillAmountInclVat=bill['amountInclVat']
        }
        tempLineitem['amountInclVat']=Math.round((tempLineitem['amountInclVat']*(transaction['amountInclVat']/correctedBillAmountInclVat))*100)/100;
        tempLineitem['amountExclVat']=Math.round(tempLineitem['amountInclVat']/(1+(tempLineitem['vatRate']/100))*100)/100;
        tempLineitem['amountOfVat']=tempLineitem['amountInclVat']-tempLineitem['amountExclVat'];

        // add templLineitem to lineitems
        lineitems.push(clone(tempLineitem));
    });

    setNotification('assignment complete');
}