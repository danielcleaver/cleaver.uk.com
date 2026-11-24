function showFlags(){

    // ---- set the modal-title
    document.getElementById('modal-title').innerHTML='FLAG NAMES';

    // ---- set the modal-body
    let content='';

    content+='<p>Change the names of the flags below and click Done.</p>';

    content+='<div class="m-3">';
    for(let i=1;i<flagLabel.length;i++){
        content+='<div class="row gx-0 mb-1 flag-label-row flagged-'+i+'">';

        content+='   <div class="col-auto flag-bar">&nbsp;';
        // content+='      <div class="flag-bar">&nbsp;</div>';
        content+='   </div>';
        content+='   <div class="col">';
        content+='      <input id="flag-input-'+i+'" type="text" class="form-control p-1" value="'+flagLabel[i]+'">';
        content+='   </div>';

        content+='</div>';
    }

    content+='</div>';

    document.getElementById('modal-body').innerHTML=content;

    // ---- set the modal-controls
    content='';

    content+='<button class="btn w-100 btn-primary" type="button" onclick="refreshFlagNames(); closeModal();">DONE</button>';

    document.getElementById('modal-controls').innerHTML=content;

    // ---- open the modal
    openModal();

}

//////////////////////////////////////////////////
function refreshFlagNames(){
    for(let i=1;i<flagLabel.length;i++){
        flagLabel[i]=document.getElementById('flag-input-'+i).value;
    }

    refreshPage();
}