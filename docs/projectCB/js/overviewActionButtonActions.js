function setPeriodClicked(){
    panel['business']['open']=false;
    panel['business']['tick']='tick';
    panel['business']['completed']=true;

    // panel['period']['open']=true;

    panel['options']['open']=true;
    showNewlyCratedLabel=true;
    overviewRefresh();
}

////////////////////////////////////////////

// function createClicked(){
//     panel['period']['open']=false;
//     panel['period']['tick']='tick';
//     panel['period']['completed']=true;
//
//     panel['options']['open']=true;
//
//     showNewlyCratedLabel=true;
//     overviewRefresh();
// }

////////////////////////////////////////////

function optionsClicked(){
    panel['options']['open']=false;
    panel['options']['tick']='tick';
    panel['options']['completed']=true;

    panel['credit']['open']=true;

    overviewRefresh();
}

////////////////////////////////////////////
// function shareClicked(){
//     panel['share']['open']=false;
//     panel['share']['tick']='tick';
//     panel['share']['completed']=true;
//
//     panel['credit']['open']=true;
//
//     overviewRefresh();
// }
////////////////////////////////////////////

function creditClicked(){
    panel['credit']['open']=false;
    panel['credit']['tick']='tick';
    panel['credit']['completed']=true;
    if(!creditRequired && !document.getElementById('apply-credit-anyway').checked){
        // do nothing
    }else{
        // credited=true;
        console.log('credit',getSelectedCreditYear());
       creditedArray['credit'+getSelectedCreditYear()]=true;
    }

    panel['bankfeed']['open']=true;

    overviewRefresh();
}
////////////////////////////////////////////
function getSelectedCreditYear(){
    if(document.getElementById('2024').checked){return '2024';}
    if(document.getElementById('2023').checked){return '2023';}
    if(document.getElementById('2020').checked){return '2020';}
    if(document.getElementById('2019').checked){return '2019';}
    return false;
}
////////////////////////////////////////////

function creditContinueClicked(){
    panel['credit']['open']=false;
    panel['credit']['tick']='tick';
    panel['credit']['completed']=true;

    panel['bankfeed']['open']=true;

    overviewRefresh();
}
////////////////////////////////////////////

function bankfeedClicked(){
    panel['bankfeed']['open']=false;
    panel['bankfeed']['tick']='tick';
    panel['bankfeed']['completed']=true;

    panel['edit']['open']=true;

    overviewRefresh();
}

////////////////////////////////////////////

function editClicked(){
    panel['edit']['open']=false;
    panel['edit']['tick']='tick';
    panel['edit']['completed']=true;

    // panel['pdfcopy']['open']=true;

    overviewRefresh();
}