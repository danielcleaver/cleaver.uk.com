function setupEntries(){

    // console.log('setupEntries',entryData);
    //
    // for(let identifier=0;identifier<entryData.length;identifier++){
    //
    //     let entry=document.getElementById('entry-'+entryData[identifier]['guid']);
    //
    //     if(entry){
    //         let entity;
    //
    //         //=====DISPLAY
    //
    //         // set title
    //         entity=entry.getElementsByClassName('title');
    //         if(entity){
    //             [...entity].forEach((element) => element.innerHTML=entryData[identifier]['description']);
    //         }
    //
    //         // set amount
    //         entity=entry.getElementsByClassName('amount');
    //         if(entity){
    //             let amount=entryData[identifier]['gross-amount'];
    //             let amountLabel='paid in full';
    //             if(entryData[identifier]['type']!=='transaction' && entryData[identifier]['paid-status']!=='fully paid') {
    //                 amount=entryData[identifier]['amount-outstanding'];
    //                 amountLabel='to be paid';
    //             }
    //             let amountLabelHtml='';
    //             if(entryData[identifier]['type']!=='transaction'){
    //                 amountLabelHtml='<div class="sublabel2 smaller text-end">'+amountLabel+'</div>';
    //             }
    //             [...entity].forEach((element) => element.innerHTML=formatAmount(amount,entryData[identifier]['polarity'])+amountLabelHtml);
    //         }
    //
    //         // set flag-bar
    //         entity=entry.getElementsByClassName('flag-bar');
    //         if(entity){
    //             [...entity].forEach((element) => element.className="flag-bar flag-bar-"+ entryData[identifier]['flag']);
    //         }
    //
    //         // set display transaction type
    //         setTransactionType(entry);
    //
    //         //=====EDIT
    //         // set types
    //         entity=entry.getElementsByClassName('transaction-type');
    //         if(entity){
    //             [...entity].forEach((element) => element.value=entryData[identifier]['transaction-type']);
    //         }
    //
    //         // set categorys
    //         entity=entry.getElementsByClassName('transaction-category');
    //         if(entity){
    //             [...entity].forEach((element) => element.value=entryData[identifier]['transaction-category']);
    //         }
    //
    //         // set vat-selector
    //         entity=entry.getElementsByClassName('transaction-vat-selector');
    //         if(entity){
    //             [...entity].forEach((element) => element.value=entryData[identifier]['vat-rate']);
    //         }
    //
    //         // set transaction-ignoreConfirm-selector
    //         entity=entry.getElementsByClassName('transaction-ignoreConfirm-selector');
    //         if(entity){
    //             [...entity].forEach((element) => element.value=entryData[identifier]['recommendation']);
    //         }
    //
    //         // set flag
    //         entity=entry.getElementsByClassName('flag');
    //         if(entity){
    //             [...entity].forEach((element) => element.value=entryData[identifier]['flag']);
    //         }
    //
    //         // set eu
    //         entity=entry.getElementsByClassName('eu');
    //         if(entity){
    //             [...entity].forEach((element) => element.checked=(entryData[identifier]['eu']==='true'));
    //         }
    //
    //         // set disallowable
    //         entity=entry.getElementsByClassName('disallowable');
    //         if(entity){
    //             [...entity].forEach((element) => element.checked=(entryData[identifier]['disallowable']==='true'));
    //         }
    //
    //         // set ignored
    //         entity=entry.getElementsByClassName('ignored-select');
    //         if(entity){
    //             [...entity].forEach((element) => element.checked=(entryData[identifier]['ignored']==='true'));
    //         }
    //
    //         // set ignored icon
    //         setIgnoredIcon(identifier);
    //
    //         // set due-date
    //         entity=entry.getElementsByClassName('due-date');
    //         if(entity){
    //             [...entity].forEach((element) => element.value=entryData[identifier]['due-date']);
    //         }
    //
    //         // set exvat-amount
    //         entity=entry.getElementsByClassName('exvat-amount');
    //         if(entity){
    //             [...entity].forEach((element) => element.value=entryData[identifier]['exvat-amount']);
    //         }
    //
    //         // set polarity
    //         entity=entry.getElementsByClassName('polarity');
    //         if(entity){
    //             [...entity].forEach((element) => {
    //                 if(entryData[identifier]['polarity']==='incoming'){
    //                     element.value = ' ';
    //                     element.innerHTML = ' ';
    //                 }else{
    //                     element.value = '-';
    //                     element.innerHTML = '-';
    //                 }
    //             });
    //         }
    //
    //         // set invoice number
    //         entity=entry.getElementsByClassName('invoice-number');
    //         if(entity){
    //             [...entity].forEach((element) => element.value=entryData[identifier]['invoice-number']);
    //         }
    //
    //         // set outstanding-amount
    //         entity=entry.getElementsByClassName('outstanding-amount');
    //         if(entity){
    //             [...entity].forEach((element) => element.innerHTML=formatAmount(entryData[identifier]['amount-outstanding']),entryData[identifier]['polarity']);
    //         }
    //
    //         // allow to confirm?
    //         entity=entry.getElementsByClassName('ignoreConfirmTickbox');
    //         if(entity){
    //             [...entity].forEach((element) => {
    //                 if(
    //                     entry.getElementsByClassName('transaction-ignoreConfirm-selector')[0].value==='confirm' &&
    //                     (entry.getElementsByClassName('transaction-type')[0].value==='' ||
    //                         entry.getElementsByClassName('transaction-category')[0].value==='' ||
    //                         entry.getElementsByClassName('transaction-vat-selector')[0].value==='')
    //                 ){
    //                     element.disabled=true;
    //                 }else{
    //                     element.disabled=false;
    //                 }
    //
    //             });
    //         }
    //
    //         // set note
    //         entity=entry.getElementsByClassName('note-field');
    //         if(entity){
    //             [...entity].forEach((element) => element.value=entryData[identifier]['note']);
    //         }
    //
    //         // show/hide note-field-holder
    //         entity=entry.getElementsByClassName('note-field-holder');
    //         if(entity){
    //             [...entity].forEach((element) => {
    //                 if(entryData[identifier]['note']===''){
    //                     element.style.display = "none";
    //                 }else{
    //                     element.style.display = "flex";
    //                 }
    //
    //             });
    //         }
    //         entity=entry.getElementsByClassName('note-field-holder-inverse');
    //         if(entity){
    //             [...entity].forEach((element) => {
    //                 if(entryData[identifier]['note']===''){
    //                     element.style.display = "flex";
    //                 }else{
    //                     element.style.display = "none";
    //                 }
    //
    //             });
    //         }
    //
    //     }
    //
    //
    //
    // }
    // validateFields();
    // enableApplyButton();
}
///////////////////////////////////////////////////////
function enableApplyButton(){
    // console.log('XXXX settings[\'qeApplyDisabled\']',settings['qeApplyDisabled']);
    // console.log('XXXX settings[\'qeApplyVisible\']',settings['qeApplyVisible']);

    const button=document.getElementById("applyButton");
    if(button){
        button.disabled=settings['qeApplyDisabled'];
        if(settings['qeApplyVisible']){
            unhide(button);
        }else{
            hide(button);
        }
    }


}
///////////////////////////////////////////////////////
function setIgnoredIcon(identifier){
    // let entry=document.getElementById('entry-'+entryData[identifier]['guid']);
    //
    // // set ignored icon
    // entity=entry.getElementsByClassName('ignored');
    // if(entity){
    //     [...entity].forEach((element) => {
    //         let output='';
    //         if(entryData[identifier]['ignored']==='true'){
    //             output+='<i class="fa-solid fa-eye-slash me-1"></i>';
    //         }
    //         element.innerHTML = output;
    //     });
    // }
}