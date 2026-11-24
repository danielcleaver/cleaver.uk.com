function toggleIgnored(){
    if(settings['showIgnored']){
        settings['showIgnored']=false;
        document.getElementById('demo_toggle_ignored').innerHTML="Hiding 'ignored' items";
    }else{
        settings['showIgnored']=true;
        document.getElementById('demo_toggle_ignored').innerHTML="Showing 'ignored' items";
    }
    refreshPage();
}
////////////////////////////////////////////
function toggleColourblindFriendly(){
    if(settings['colourblindFriendly']){
        settings['colourblindFriendly']=false;
        document.getElementById('demo_colourblind_friendly').innerHTML="Colourblind Friendly";
    }else{
        settings['colourblindFriendly']=true;
        document.getElementById('demo_colourblind_friendly').innerHTML="Colourblind Unfriendly";
    }
    refreshPage();
}
////////////////////////////////////////////
function toggleCashbasis(){
    if(settings['accountingMethod']==='cashbasis'){
        settings['accountingMethod']='accrual';
        document.getElementById('demo_cashbasis_accrual').innerHTML="Accrual Accounting";
    }else{
        settings['accountingMethod']='cashbasis';
        document.getElementById('demo_cashbasis_accrual').innerHTML="Cashbasis Accounting";
    }
    refreshPage();
}
////////////////////////////////////////////
function refreshDemoControls(){

    if(settings['showIgnored']){
        document.getElementById('demo_toggle_ignored').innerHTML="Showing 'ignored' items";
    }else{
        document.getElementById('demo_toggle_ignored').innerHTML="Hiding 'ignored' items";
    }

    if(settings['colourblindFriendly']){
        document.getElementById('demo_colourblind_friendly').innerHTML="Colourblind Friendly";
    }else{
        document.getElementById('demo_colourblind_friendly').innerHTML="Colourblind Unfriendly";
    }

    if(settings['accountingMethod']==='cashbasis'){
        document.getElementById('demo_cashbasis_accrual').innerHTML="Cash Basis Accounting";
    }else{
        document.getElementById('demo_cashbasis_accrual').innerHTML="Accrual Accounting";
    }

    // console.log(settings['nextBankfeedDataToImport']);
    // console.log(bankfeedData.length);
    // if(settings['nextBankfeedDataToImport']<bankfeedData.length){
    //     document.getElementById('demo_import_bankfeed').innerHTML="Import Bankfeed #"+settings['nextBankfeedDataToImport'];
    // }else{
    //     document.getElementById('demo_import_bankfeed').innerHTML="No more data";
    // }

}