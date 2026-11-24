function bankfeedRequiredChanged(){
    if(document.getElementById('bankfeed-required').checked){
        bankfeedRequired=true;
    }else{
        if(document.getElementById('bankfeed-not-required').checked){
            bankfeedRequired=false;
        }else{
            bankfeedRequired='';
        }
    }

    // bankfeedRequired=document.getElementById('bankfeed-required').checked;
    // document.getElementById('bankfeed-required').checked=bankfeedRequired;
    document.getElementById('bankfeed-required-2').checked=bankfeedRequired;
    // document.getElementById('bankfeed-not-required').checked=!bankfeedRequired;
    document.getElementById('bankfeed-not-required-2').checked=!bankfeedRequired;
}

function bankfeedRequiredChanged2(){
    if(document.getElementById('bankfeed-required-2').checked){
        bankfeedRequired=true;
    }else{
        if(document.getElementById('bankfeed-not-required-2').checked){
            bankfeedRequired=false;
        }else{
            bankfeedRequired='';
        }
    }
    // bankfeedRequired=document.getElementById('bankfeed-required-2').checked;
    document.getElementById('bankfeed-required').checked=bankfeedRequired;
    // document.getElementById('bankfeed-required-2').checked=bankfeedRequired;
    document.getElementById('bankfeed-not-required').checked=!bankfeedRequired;
    // document.getElementById('bankfeed-not-required-2').checked=!bankfeedRequired;
}