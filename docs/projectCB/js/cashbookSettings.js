function cashbookSettings(){
    // ---- set the modal-title
    document.getElementById('modal-title').innerHTML='SETTINGS';

    // ---- set the modal-body
    let content='';

    content+='<div class="row">';

    content+='<div class="col-4">';
    content+='<button class="btn btn-ftax-sidebar-grey w-100 border-radius-0 mb-2 text-start ps-4" type="button" onclick="closeModal();showFilters();">Filters</button>';
    content+='</div>';
    content+='<div class="col">';
    content+='<p>Filter cashbook entries by date, type etc.</p>';
    content+='</div>';

    content+='</div>';



    content+='<div class="row mt-3">';

    content+='<div class="col-4">';
    content+='<button class="btn btn-ftax-sidebar-grey w-100 border-radius-0 mb-2 text-start ps-4" type="button" onclick="closeModal();showFlags();">Flags</button>';
    content+='</div>';
    content+='<div class="col">';
    content+='<p>Change the names of the flags</p>';
    content+='</div>';

    content+='</div>';



    content+='<div class="row mt-3">';

    content+='<div class="col-4">';
    content+='<button class="btn btn-ftax-sidebar-grey w-100 border-radius-0 mb-2 text-start ps-4" type="button" onclick="closeModal();showRecommendations();">Auto-Select</button>';
    content+='</div>';
    content+='<div class="col">';
    content+='<p>Customise the recommended types, categories and VAT rates for newly imported transactions.</p>';
    content+='</div>';

    content+='</div>';



    content+='<div class="row mt-3">';

    content+='<div class="col-auto">';
    if(settings['requestDoNotUsePaperwork']){
        content+='<input id="request-do-not-use-paperwork" type="checkbox" class="form-control form-check-input mt-0" onchange="requestDoNotUsePaperworkClicked();refreshPage();" checked>';
    }else{
        content+='<input id="request-do-not-use-paperwork" type="checkbox" class="form-control form-check-input mt-0" onchange="requestDoNotUsePaperworkClicked();refreshPage();">';
    }

    content+='</div>';
    content+='<div class="col">';
    content+='<p>Do not use invoice management<br/>If ticked, and entire period uses cashbasis accounting, then paperwork options will be hidden.</p>';
    content+='</div>';

    content+='</div>';





    document.getElementById('modal-body').innerHTML=content;

    // ---- set the modal-controls
    content='';

    content+='<button class="btn w-100 btn-primary" type="button" onclick="closeModal();">CLOSE</button>';

    document.getElementById('modal-controls').innerHTML=content;

    // ---- open the modal
    openModal();
}