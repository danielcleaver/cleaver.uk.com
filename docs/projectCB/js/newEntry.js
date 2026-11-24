function newEntry(){
    // console.log('new Entry');

    const entryType=settings['displayMode'].slice(0, -1);

    // ---- setup new entry
    getNewTempEntry(entryType);
    if(entryType==='transaction'){
        tempEntry['sourceType']='manual';
    }
    if(entryType==='invoice' || entryType==='invoice_refund'){
        // set date to today's date
        const now=new Date();
        const nowYear=now.getFullYear();
        const nowMonth=String(now.getMonth()+1).length===2?String(now.getMonth()+1):'0'+String(now.getMonth()+1);
        const nowDay=String(now.getDate()).length===2?String(now.getDate()+1):'0'+String(now.getDate());
        tempEntry['primaryDate']=nowYear+'-'+nowMonth+'-'+nowDay;
    }
    tempEntry['open']=true;
    // console.log('tempEntry',tempEntry);


    // ---- setup one new lineitem
    // reset tempLineitems
    tempLineitems=[];

    // create blank lineitem in tempLineitem
    getNewTempLineitem();

    // push clone into tempLineitems
    tempLineitems.push(clone(tempLineitem));

    // console.log('tempLineitems',tempLineitems);

    // ---- set the modal-title
    document.getElementById('modal-title').innerHTML='New '+capitalize(entryType);

    // ---- set the modal-body
    let content='';
    content+='<p>A blank '+entryType+' will be created at the top of the list.</p>';

    if(entryType==='invoice'){
        content+='<p>Note: This is <strong>not</strong> an invoice to be sent to customers. It is a record which captures data from your invoice to complete your tax returns.</p>'
    }
    if(entryType==='invoice_refund'){
        content+='<p>Note: This is a record which captures data about the refund to complete your tax returns.</p>'
    }
    if(entryType==='bill'){
        content+='<p>Note: This is a record which captures data from a bill to complete your tax returns.</p>'
    }
    if(entryType==='bill_refund'){
        content+='<p>Note: This is a record which captures data about the refund to complete your tax returns.</p>'
    }

    const body=document.getElementById('modal-body');
    body.innerHTML=content;

    // ---- set the modal-controls
    content='';

    content+='<div class="row gx-2 justify-content-end">';
    content+='  <div class="col-auto">';
    content+='      <button class="btn btn-outline-primary" type="button" onclick="closeModal();">Cancel</button>';
    content+='  </div>';
    content+='  <div class="col-auto">';
    content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="newEntry_silent(); closeModal(); refreshPage();">Create New '+capitalize(entryType)+'</button>';
    content+='  </div>';
    content+='</div>';

    document.getElementById('modal-controls').innerHTML=content;

    // ---- open the modal
    openModal();

}
/////////////////////////////////////////////////////
function newEntry_silent(){
    // console.log(tempEntry);

    // ---- return if tempEntry['entityType'] is not set
    if(!tempEntry['entityType']){
        console.warn('no entity type');
        return;
    }

    // ---- set notification
    const entryType=tempEntry['entityType'];
    const humanReadableEntryType = entryType.replaceAll('_',' ');
    setNotification('new '+humanReadableEntryType+' created');

    // ---- first create new lineitems
    tempLineitems.forEach((tempLineitem) => {
        // ---- insert a new lineitem for this entry

        // ---- set parent
        tempLineitem['guidOfParent']=tempEntry['guid'];

        // ---- push clone into lineitems
        lineitems.push(clone(tempLineitem));
        // tempLineitem['entityType']='';

        // ---- put guid of new lineitem into this entry's children
        // console.log('tempEntry',tempEntry);
        tempEntry['guidsOfChildren'].push(tempLineitem['guid']);
    });


    // ---- proceed to create entry (transaction, invoice, invoice_refund, bill or bill_refund)
    const list=getList(tempEntry['entityType']);
    list.push(clone(tempEntry));  // deep clone this

    // ---- assign refunds to their parents
    if(entryType==='invoice_refund' || entryType==='bill_refund'){
        const refundGuid=tempEntry['guid'];
        const parentGuid=tempEntry['refundGuids'][0]; // there can only be 1 parent;
        const parentIndex=getIndexFromGuid(parentGuid);
        list[parentIndex]['refundGuids'].push(refundGuid);
        list[parentIndex]['refundGuids']=[...new Set(list[parentIndex]['refundGuids'])];
    }


    // ---- reset tempEntry['entityType']
    tempEntry['entityType']='';

}


/////////////////////////////////////////////////////
function getNewTempEntry(type){
    // console.log(type);
    if(type==='transaction'){
        tempEntry=clone(blankTransaction);  // deep clone this

    }
    if(type==='invoice'){
        tempEntry=clone(blankInvoice);  // deep clone this
    }
    if(type==='bill'){
        tempEntry=clone(blankBill);  // deep clone this
    }
    if(type==='invoice_refund'){
        tempEntry=clone(blankInvoice);  // deep clone this
        tempEntry['entityType']='invoice_refund';
    }
    if(type==='bill_refund'){
        tempEntry=clone(blankBill);  // deep clone this
        tempEntry['entityType']='bill_refund';
    }

    tempEntry['guid']=uuidv4();

}
/////////////////////////////////////////////////////
function getNewTempLineitem(){
    tempLineitem=clone(blankLineitem);  // deep clone this
    tempLineitem['guid']=uuidv4();
}