function selectClientPopup(){
// ---- set the modal-title
    document.getElementById('modal-title').innerHTML='Select business';

    // ---- set the modal-body
    let content='';
    content+='This is only a picture, these details are not implemented in the mockup';
    content+='<img class="page-corner" src="./images/selectClient.png" alt="corner">';


    const body=document.getElementById('modal-body');
    body.innerHTML=content;

    // ---- set the modal-controls
    content='';

    content+='<div class="row gx-2 justify-content-end">';
    content+='  <div class="col-auto">';
    content+='      <button id="modal-action-button" class="btn btn-primary" type="button" onclick="closeModal(); ">Close</button>';
    content+='  </div>';
    content+='</div>';


    document.getElementById('modal-controls').innerHTML=content;

    // ---- open the modal
    openModal();

}