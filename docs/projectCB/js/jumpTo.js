function jumpTo(element){
    let triggerGuid='';
    let targetGuid='';
    let targetType='';

    const refundTriggerGuid=getGuidFromElement_custom(element,['inline-invoiceBill']);
    targetGuid=refundTriggerGuid ? refundTriggerGuid : '';

    if(targetGuid===''){
        triggerGuid=getGuidFromElement(element);

        const triggerType=getEntityTypeFromGuid(triggerGuid);

        if(element.parentNode.getElementsByClassName('inline-invoiceBill').length>0){
            targetGuid=element.parentNode.getElementsByClassName('inline-invoiceBill')[0].dataset.id;
            targetType=getEntityTypeFromGuid(targetGuid);
        }else{
            if(triggerType==='transaction'){
                const transaction=transactions[getIndexFromGuid(getGuidFromElement(element))]
                targetGuid=transaction['assignedToInvoiceGuid']+transaction['assignedToBillGuid'];
                targetType=getEntityTypeFromGuid(targetGuid);
            }else{
                targetGuid=element.parentNode.dataset.id;
                targetType=getEntityTypeFromGuid(targetGuid);
            }
        }
    }else{
        targetType=getEntityTypeFromGuid(targetGuid);
    }


    // console.log('targetType',targetType);
    // console.log('targetGuid',targetGuid);

    // ---- change page
    settings['displayMode']=targetType.replace('_refund','')+'s';

    // ---- close all on the target list and open the target
    closeAllLedgerEntries(targetType.replace('_refund',''));

    const list=getList(getEntityTypeFromGuid(targetGuid));
    const targetIndex=getIndexFromGuid(targetGuid);
    list[targetIndex]['open']=true;
    list[targetIndex]['open2']=true;

    refreshPage();

    // ---- find target and scroll ito view
    const targetElement=document.querySelector('.'+targetType+'[data-id="'+targetGuid+'"]');
    targetElement.scrollIntoView();

}
