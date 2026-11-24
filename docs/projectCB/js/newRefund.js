function newRefund(element){
    console.log('newRefund');

    const refundParentGuid=getGuidFromElement(element);
    const refundParentType=getEntityTypeFromGuid(refundParentGuid);
    const refundParentIndex=getIndexFromGuid(refundParentGuid);
    const refundParentList=getList(refundParentType);
    const refundParent=refundParentList[refundParentIndex];

    const entityType=settings['displayMode'].slice(0, -1)+'_refund';
    const humanReadableEntryType = entityType.replaceAll('_',' ');

    // ---- setup new entity
    getNewTempEntry(entityType);
    tempEntry['refundGuids']=[refundParentGuid];
    tempEntry['open']=true;

    // reset tempLineitems
    tempLineitems=[];

    // ---- setup new lineitems to match the refundParent
    refundParent['guidsOfChildren'].forEach((guidOfrefundParentChild) => {
        // create blank lineitem in tempLineitem
        getNewTempLineitem();

        const refundParentChild=lineitems[getIndexFromGuid(guidOfrefundParentChild)];

        // populate the new lineitem
        tempLineitem['guidOfParent']=tempEntry['guid'];
        tempLineitem['description']=refundParentChild['description'];
        tempLineitem['vatRate']=refundParentChild['vatRate'];
        // tempLineitem['amountInclVat']=refundParentChild['amountInclVat'];
        // tempLineitem['amountExclVat']=Math.round(refundParentChild['amountInclVat']/(1+(refundParentChild['vatRate']/100))*100)/100;
        // tempLineitem['amountOfVat']=tempLineitem['amountInclVat']-tempLineitem['amountExclVat'];
        tempLineitem['categorisationType']=refundParentChild['categorisationType']+'_refund';
        tempLineitem['categorisationCategory']=refundParentChild['categorisationCategory'];
        tempLineitem['eu']=refundParentChild['eu'];
        tempLineitem['disallowable']=refundParentChild['disallowable'];

        // push clone into tempLineitems
        tempLineitems.push(clone(tempLineitem));
    });





    // console.log('tempLineitems',tempLineitems);

    // ---- set the modal-title
    document.getElementById('modal-title').innerHTML='New '+capitalize(humanReadableEntryType);

    // ---- set the modal-body
    let content='';
    content+='<p>A blank '+humanReadableEntryType+' will be created at the top of the list.</p>';

    const body=document.getElementById('modal-body');
    body.innerHTML=content;

    // ---- set the modal-controls
    content='';

    content+='<div class="row gx-2 justify-content-end">';
    content+='  <div class="col-auto">';
    content+='      <button class="btn btn-outline-primary" type="button" onclick="closeModal();">Cancel</button>';
    content+='  </div>';
    content+='  <div class="col-auto">';
    content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="newEntry_silent(); closeModal(); refreshPage();">Create New '+capitalize(humanReadableEntryType)+'</button>';
    content+='  </div>';
    content+='</div>';

    document.getElementById('modal-controls').innerHTML=content;

    // ---- open the modal
    openModal();


}