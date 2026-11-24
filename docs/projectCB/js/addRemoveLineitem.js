function removeLineitem(element){
    // console.log('remove item',element);

    that=element;



    const lineitemGuid=getGuidFromElement(element);
    const lineitemIndex=getIndexFromGuid(lineitemGuid);
    const lineitem=lineitems[lineitemIndex];

    removingLineitem=document.querySelector('.lineitem[data-id="'+lineitemGuid+'"]');

    // get parent
    const parentGuid=lineitem['guidOfParent'];
    const parentIndex=getIndexFromGuid(parentGuid);
    const parentEntityType=getEntityTypeFromGuid(parentGuid);
    const parentList=getList(parentEntityType);
    const parent=parentList[parentIndex];

    // ---- has lineitem got cousins?
    if(lineitem['guidOfCousins']!==''){
        // ---- lineitem has cousins
        // popup warning
        // ---- set the modal-title
        document.getElementById('modal-title').innerHTML='Remove Item';
        // ---- set the modal-body
        let content='';
        if(parentEntityType==='transaction'){
            content+='<p>Are you sure you wish to remove this item?</p>';
            content+='<p class="mt-2">If you do so, equivalent items on all assigned transactions, invoices and bills will also be removed.</p>';
            // content+='<p>This transaction is assigned to an invoice/bill.</p>';
            // content+='<p>Removing the item from this transaction will also remove the corresponding item from the invoice/bill and from all other transactions attached to that invoice/bill.</p>';
        }else{
            content+='<p>Are you sure you wish to remove this item?</p>';
            content+='<p class="mt-2">If you do so, equivalent items on all assigned transactions, invoices and bills will also be removed.</p>';
            // content+='<p>This invoice/bill is has transaction(s) assigned to it.</p>';
            // content+='<p>Removing the item from this invoice/bill will also remove the corresponding item from all the transactions attached to this invoice/bill.</p>';
        }
        const body=document.getElementById('modal-body');
        body.innerHTML=content;

        // ---- set the modal-controls
        content='';

        content+='<div class="row gx-2 justify-content-end">';
        content+='  <div class="col-auto">';
        content+='      <button class="btn btn-outline-primary" type="button" onclick="closeModal();">No</button>';
        content+='  </div>';
        content+='  <div class="col-auto">';
        // content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="removeLineitems_silent(); closeModal();refreshPage();">Yes</button>';
        content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick=" lineitems['+lineitemIndex+'][\'status\']=\'closing\'; closeModal();refreshPage();setTimeout(()=>{removeLineitems_silent();refreshPage();},1000)">Yes</button>';
        content+='  </div>';
        content+='</div>';


        document.getElementById('modal-controls').innerHTML=content;

        // ---- open the modal
        openModal();

    }else{
        // ---- lineitem does not have cousins
        // popup warning
        // ---- set the modal-title
        document.getElementById('modal-title').innerHTML='Remove Item';
        // ---- set the modal-body
        let content='';
        if(parentEntityType==='transaction'){
            content+='<p>Are you sure you wish to remove this item?</p>';
            // content+='<p class="mt-2">If you do so, equivalent items on all assigned transactions, invoices and bills will also be removed.</p>';
            // content+='<p>This transaction is assigned to an invoice/bill.</p>';
            // content+='<p>Removing the item from this transaction will also remove the corresponding item from the invoice/bill and from all other transactions attached to that invoice/bill.</p>';
        }else{
            content+='<p>Are you sure you wish to remove this item?</p>';
            // content+='<p class="mt-2">If you do so, equivalent items on all assigned transactions, invoices and bills will also be removed.</p>';
            // content+='<p>This invoice/bill is has transaction(s) assigned to it.</p>';
            // content+='<p>Removing the item from this invoice/bill will also remove the corresponding item from all the transactions attached to this invoice/bill.</p>';
        }
        const body=document.getElementById('modal-body');
        body.innerHTML=content;

        // ---- set the modal-controls
        content='';

        content+='<div class="row gx-2 justify-content-end">';
        content+='  <div class="col-auto">';
        content+='      <button class="btn btn-outline-primary" type="button" onclick="closeModal();">No</button>';
        content+='  </div>';
        content+='  <div class="col-auto">';
        // content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="removeLineitems_silent(); closeModal();refreshPage();">Yes</button>';
        content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick=" lineitems['+lineitemIndex+'][\'status\']=\'closing\'; closeModal();refreshPage();setTimeout(()=>{removeLineitems_silent();refreshPage();},1000)">Yes</button>';
        content+='  </div>';
        content+='</div>';


        document.getElementById('modal-controls').innerHTML=content;

        // ---- open the modal
        openModal();

    }

}

/////////////////////////////////////////////////
function removeLineitems_silent(){
    const element=that;

    const lineitemGuid=getGuidFromElement(element);
    const lineitemIndex=getIndexFromGuid(lineitemGuid);
    const lineitem=lineitems[lineitemIndex];

    // get parent
    const parentGuid=lineitem['guidOfParent'];
    const parentIndex=getIndexFromGuid(parentGuid);
    const parentEntityType=getEntityTypeFromGuid(parentGuid);
    const parentList=getList(parentEntityType);
    const parent=parentList[parentIndex];

    // ---- has lineitem got cousins?
    if(lineitem['guidOfCousins']!==''){
        // ---- lineitem has cousins

        getGuidsOfCousins(lineitem['guidOfCousins']).forEach((cousinGuid) => {
            // For each cousin (includes the lineitem that triggered this remove action)
            // get the cousin
            const cousinIndex=getIndexFromGuid(cousinGuid);
            const cousin=lineitems[cousinIndex];

            // get the cousin's parent
            const parentOfCousinGuid=cousin['guidOfParent'];
            const parentOfCousinIndex=getIndexFromGuid(parentOfCousinGuid);
            const parentOfCousinEntityType=getEntityTypeFromGuid(parentOfCousinGuid);
            const parentOfCousinList=getList(parentOfCousinEntityType);
            const parentOfCousin=parentOfCousinList[parentOfCousinIndex];

            // remove cousinGuid from parentOfCousin's guidsOfChildren
            parentOfCousin['guidsOfChildren']=parentOfCousin['guidsOfChildren'].filter((item) => {
                return (item !== cousinGuid);
            });

            // now remove the cousin
            lineitems=lineitems.filter((lineitem)=> {
                return (lineitem['guid'] !==cousinGuid);
            });
        });

    }else{
        // ---- lineitem does not have cousins

        // remove lineitemGuid from parent's guidsOfChildren
        parent['guidsOfChildren']=parent['guidsOfChildren'].filter((item) => {
            return (item !== lineitemGuid);
        });

        // now remove the lineitem
        lineitems=lineitems.filter((lineitem)=> {
            return (lineitem['guid'] !==lineitemGuid);
        });
    }

    setNotification('item(s) removed');
}
/////////////////////////////////////////////////
function addLineItem(element){

    const parentGuid=getGuidFromElement(element);
    const parentListIndex=getIndexFromGuid(parentGuid);
    const parentEntityType=getEntityTypeFromGuid(parentGuid);
    const parentList=getList(parentEntityType);

    let invoiceBillGuid;

    // console.log('parentEntityType',parentEntityType);

    // build a list of targetGuids. These are transactions, invoices, invoice_refunds, bill, or bill_refunds which will get a net lineitem as a result of this creation.
    let targetGuids=[];



    // if parent is transaction that is not assigned to an invoice, bill, invoice_refund or bill_refund: just add that transaction guid to target guids.
    if(parentEntityType==='transaction'){
        if(parentList[parentListIndex]['assignedToInvoiceGuid']==='' && parentList[parentListIndex]['assignedToBillGuid']===''){
            targetGuids.push(parentGuid);
        }
        // console.log('a',targetGuids);
    }

    // invoice or bill that has no assigned transactions or refunds: just add that invoice or bill guid to target guids.
    if(
        (parentEntityType==='invoice' ||
        parentEntityType==='bill') &&
        parentList[parentListIndex]['assignedTransactionsGuids'].length===0 &&
        parentList[parentListIndex]['refundGuids'].length===0
    ){
        targetGuids.push(parentGuid);
        // console.log('b',targetGuids,parentList[parentListIndex]['refundGuids']);
    }


    // console.log('c',targetGuids);

    if(targetGuids.length===0){
        // there is an assignment

        // get the invoiceBillGuid
        if(
            parentEntityType==='invoice' ||
            parentEntityType==='bill'
        ){
            invoiceBillGuid=parentGuid;
        }else{
            if(
                parentEntityType==='invoice_refund' ||
                parentEntityType==='bill_refund'
            ){
                invoiceBillGuid=parentList[parentListIndex]['refundGuids'][0];  // there can be only one
            }else{
                invoiceBillGuid=parentList[parentListIndex]['assignedToInvoiceGuid'] + parentList[parentListIndex]['assignedToBillGuid'];
            }

        }

        // add the invoiceBillGuid to the targetGuids
        targetGuids.push(invoiceBillGuid);

        // add all the refunds to the targetGuids
        const invoiceBillType=getEntityTypeFromGuid(invoiceBillGuid);
        const invoiceBillIndex=getIndexFromGuid(invoiceBillGuid);
        const invoiceBillList=getList(invoiceBillType);
        invoiceBillList[invoiceBillIndex]['refundGuids'].forEach((refundGuid) => {
            targetGuids.push(refundGuid);
        });
        //de-dupe the array just in case
        targetGuids=[...new Set(targetGuids)];

        // now we should have the invoiceBill and all its refunds in the targetGuids list.
        // get the guids of all transactions assigned to all the items currently in the targetGuids array.
        const copyOfTargetGuids=clone(targetGuids);
        copyOfTargetGuids.forEach((parentGuid) => {
            const parentType=getEntityTypeFromGuid(parentGuid);
            const parentIndex=getIndexFromGuid(parentGuid);
            const parentList=getList(parentType);
            parentList[parentIndex]['assignedTransactionsGuids'].forEach((assignedTransactionGuid) => {
                targetGuids.push(assignedTransactionGuid);
            });
        });


        // // now, get the guids of all the transactions assigned to the invoiceBill and push them into targetGuids
        // const invoiceBillIndex=getIndexFromGuid(invoiceBillGuid);
        // const invoiceBillEntityType=getEntityTypeFromGuid(invoiceBillGuid);
        // const invoiceBillList=getList(invoiceBillEntityType);
        // const invoiceBill=invoiceBillList[invoiceBillIndex];
        // invoiceBill['assignedTransactionsGuids'].forEach((assignedTransactionGuid) => {
        //     targetGuids.push(assignedTransactionGuid);
        // });
    }

    // ---- targetGuids is now populated with all the entities that need a lineitem adding to them.
    let newCousinGuid=uuidv4();

    // reset newCousinGuid if only one targetGuid
    if(targetGuids.length===1){
        newCousinGuid='';
    }


    targetGuids.forEach((targetGuid) => {
        const targetIndex=getIndexFromGuid(targetGuid);
        const targetType=getEntityTypeFromGuid(targetGuid);
        const targetList=getList(targetType);
        const target=targetList[targetIndex];

        // create new lineitem
        const newItemGuid=uuidv4();
        lineitem=clone(blankLineitem);
        lineitem['guid']=newItemGuid;
        lineitem['primaryDate']=formatDateObjectToStore(new Date());
        lineitem['guidOfParent']=targetGuid;
        lineitem['guidOfCousins']=newCousinGuid;
        lineitems.push(clone(lineitem));  // deep clone this

        // add new lineitem to target
        target['guidsOfChildren'].push(newItemGuid);
    });


    //
    //
    // const newItemGuid=uuidv4();
    // // console.log('newItemGuid',newItemGuid);
    //
    //
    //
    // // create new lineitem
    // lineitem=clone(blankLineitem);
    // lineitem['guid']=newItemGuid;
    // lineitem['primaryDate']=formatDateObjectToStore(new Date());
    // lineitem['guidOfParent']=parentGuid;
    // lineitems.push(clone(lineitem));  // deep clone this
    //
    // // add new lineitem to parent
    // parentList[parentListIndex]['guidsOfChildren'].push(newItemGuid);

    // console.log(lineitems);
    // console.log(parentList);

    setNotification('new item added to '+parentEntityType.replaceAll('_',' '));



}

///////////////////////////////////////////////////
function formatDateObjectToStore(date){
    let output='';

    output+=date.getFullYear();
    output+='-';
    let month=String(date.getMonth()+1);
    if(month.length===1){
        month='0'+month;
    }
    output+=month;
    output+='-';
    let day=String(date.getDate());
    if(day.length===1){
        day='0'+day;
    }
    output+=day;
    // console.log(output);
    return output;
}