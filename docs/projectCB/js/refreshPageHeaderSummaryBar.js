function refreshPageHeaderSummaryBar(){
    generateCalculatedEntryData();

    let content='';

    // transactions bar
    if(settings['displayMode']==='transactions'){
        if(settings['transactionsHaveErrors']){
            content+='<div class="row gx-0 error align-items-center ps-3 pe-4">';
            content+='   <div class="col text-center pt-1 pb-1 me-1">';
            content+='      <i class="fa-solid fa-triangle-exclamation"></i> Incomplete / unconfirmed information';
            content+='   </div>';
            content+='   <div class="col-auto">';
            content+='      <button id="applyButton" type=\'button\' class="btn btn-outline-primary btn-smaller width-9-char" onclick="applyActions();">Save</button>';
            content+='   </div>';
            content+='</div>';

            // also add a matching class to the notification
            document.getElementById('notification').classList.add('error');

        }else{
            content+='<div class="text-center complete pt-1 pb-1">All information complete and confirmed</div>';

            // also remove a matching class to the notification
            document.getElementById('notification').classList.remove('error');
        }
    }

    // invoices bar
    if(settings['displayMode']==='invoices'){
        if(settings['invoicesOutstanding']){
            content+='<div class="text-center error pt-1 pb-1">Payments from customers due</div>';
            // also add a matching class to the notification
            document.getElementById('notification').classList.add('error');
        }else{
            content+='<div class="text-center complete pt-1 pb-1">No payments from customers due</div>';
            // also remove a matching class to the notification
            document.getElementById('notification').classList.remove('error');
        }
    }

    // bills bar
    if(settings['displayMode']==='bills'){
        if(settings['billsOutstanding']){
            content+='<div class="text-center error pt-1 pb-1">Payments to suppliers due</div>';
            // also add a matching class to the notification
            document.getElementById('notification').classList.add('error');
        }else{
            content+='<div class="text-center complete pt-1 pb-1">All payments to suppliers made</div>';
            // also remove a matching class to the notification
            document.getElementById('notification').classList.remove('error');
        }
    }

    document.getElementById("summary-bar").innerHTML=content;
    enableApplyButton();
}
