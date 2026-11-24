function showInvoice(element){
    // console.log(element);
    const sourceGuid=getGuidFromElement(element);
    const sourceIndex=getIndexFromGuid(sourceGuid);
    const sourceType=getEntityTypeFromGuid(sourceGuid);
    const sourceList=getList(sourceType);

    // console.log('sourceGuid',sourceGuid);
    // console.log('sourceIndex',sourceIndex);
    // console.log('sourceType',sourceType);
    // console.log('sourceList',sourceList);

    const targetGuid=sourceList[sourceIndex]['assignedToInvoiceGuid']+sourceList[sourceIndex]['assignedToBillGuid'];
    const targetType=getEntityTypeFromGuid(targetGuid);
    
    if(targetType==='invoice' || targetType==='invoice_refund'){

        // ---- close all on the target list and open the target
        closeAllLedgerEntries(targetType.replace('_refund',''));

        const targetList=getList(getEntityTypeFromGuid(targetGuid));
        const targetIndex=getIndexFromGuid(targetGuid);
        targetList[targetIndex]['open']=true;
        targetList[targetIndex]['open2']=true;
        
        // change page
        settings['displayMode']='invoices';
        refreshPage();

        // find target and scroll ito view
        const targetElement=document.querySelector('.invoice[data-id="'+targetGuid+'"]');
        targetElement.scrollIntoView();
    }

    if(targetType==='bill' || targetType==='bill_refund'){
        // ---- close all on the target list and open the target
        closeAllLedgerEntries(targetType.replace('_refund',''));

        const targetList=getList(getEntityTypeFromGuid(targetGuid));
        const targetIndex=getIndexFromGuid(targetGuid);
        targetList[targetIndex]['open']=true;
        targetList[targetIndex]['open2']=true;
        
        // change page
        settings['displayMode']='bills';
        refreshPage();

        // find target and scroll ito view
        const targetElement=document.querySelector('.bill[data-id="'+targetGuid+'"]');
        targetElement.scrollIntoView();
    }

}


///////////////////////////////////////////////////////

function showBill(element){
    showInvoice(element);
}