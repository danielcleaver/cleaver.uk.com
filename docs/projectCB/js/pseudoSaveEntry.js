function pseudoSaveEntry(element){
    const parentGuid=getGuidFromElement(element);
    const parentIndex=getIndexFromGuid(parentGuid);
    const parentEntityType=getEntityTypeFromGuid(parentGuid);

    const list=getList(parentEntityType);
    list[parentIndex]['open']=false;
    list[parentIndex]['open2']=false;
    list[parentIndex]['opening']=false;

    list[parentIndex]['confirmed']=true;
    list[parentIndex]['qe']=false;


    // getList(parentEntityType)[parentIndex]['open']=false;
    triggerSavingSpinner();

}
//////////////////////////////////////////////////////////////////////////
function triggerSavingSpinner(){
    // ==== Do a funky modal with spinner

    // ---- set the modal-title
    document.getElementById('modal-title').innerHTML='Saving';

    // ---- set the modal-body
    let content='';

    content+='<div class="row justify-content-center">';
    content+='  <div class="col-auto">';
    content+='      <img src="./images/spinner.gif">'
    content+='  </div>';
    content+='</div>';


    document.getElementById('modal-body').innerHTML= content;

    // ---- set the modal-controls
    document.getElementById('modal-controls').innerHTML='';

    // ---- open the modal
    openModal();

    const myTimeout = setTimeout(() => {
        closeModal();
        // drawLedgers();
        // includeHTML();
        refreshPage();
    }, 500);
}
