function ignoreTransactionClicked(element){

    that=element;

    const transactionGuid=getGuidFromElement(element);
    const transactionIndex=getIndexFromGuid(transactionGuid);

    // ---- set the modal-title
    document.getElementById('modal-title').innerHTML='Ignore Transaction';

    // ---- set the modal-body
    let content='';

    content+='<p>Are you sure you wish to ignore this transaction and remove it from the cashbook?</p>';
    content+='<p class="mt-2">If you do so, the transaction will be hidden and not included in reports or calculations to populate tax returns.</p>';
    content+='<p>You can show ignored transactions in the Filter Cashbook options to view and un-ignore them.</p>';



    document.getElementById('modal-body').innerHTML=content;


    // ---- set the modal-controls
    content='';

    content+='<div class="row gx-2 justify-content-end">';
    content+='  <div class="col-auto">';
    content+='      <button class="btn btn-outline-primary" type="button" onclick="closeModal();">No</button>';
    content+='  </div>';
    content+='  <div class="col-auto">';
    // content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="transactions['+transactionIndex+'][\'ignored\']=true; closeModal();refreshPage();">Yes</button>';
    content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="ignoreTransaction_silent(); closeModal();refreshPage();">Yes</button>';
    content+='  </div>';
    content+='</div>';



    document.getElementById('modal-controls').innerHTML=content;

    // ---- open the modal
    openModal();
}

/////////////////////////////////////////////////
function ignoreTransaction_silent(){
    const element=that;

    const transactionGuid=getGuidFromElement(element);
    const transactionIndex=getIndexFromGuid(transactionGuid);

    // unassign
    unassign_silent();

    // make ignored
    transactions[transactionIndex]['ignored']=true;

}