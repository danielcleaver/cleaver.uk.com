function requestDoNotUsePaperworkClicked(){
    settings['requestDoNotUsePaperwork']=document.getElementById("request-do-not-use-paperwork").checked;
}

////////////////////////////////////////////////////

function setDoNotUsePaperwork(){

    if(
        settings['requestDoNotUsePaperwork'] &&
        // invoices.length===0 &&
        // bills.length===0 &&
        settings['accountingMethod']==='cashbasis'
    ){
        settings['doNotUsePaperwork']=true;
    }else{
        settings['doNotUsePaperwork']=false;
    }

    [...document.getElementsByClassName('page_container')].forEach((element) => {
        if(settings['doNotUsePaperwork']){
            element.classList.add('do-not-use-paperwork');
        }else{
            element.classList.remove('do-not-use-paperwork');
        }

    });
}