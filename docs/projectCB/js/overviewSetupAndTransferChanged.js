function setupAndTransferChanged(trigger){

    if(trigger.id==="setup-and-transfer"){
        if(trigger.checked){
            setupAndTransfer=true;
            document.getElementById('setup-only').checked=false;
        }else{
            // setupAndTransfer=false;
            // document.getElementById('setup-only').checked=true;
            setupAndTransfer=true;
            document.getElementById('setup-and-transfer').checked=true;
        }
    }else{
        if(trigger.checked){
            setupAndTransfer=false;
            document.getElementById('setup-and-transfer').checked=false;
        }else{
            // setupAndTransfer=true;
            // document.getElementById('setup-and-transfer').checked=true;
            setupAndTransfer=false;
            document.getElementById('setup-only').checked=true;
        }
    }
// console.log('setupAndTransfer',setupAndTransfer);
}