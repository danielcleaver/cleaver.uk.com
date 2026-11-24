function setTransactionType(entry){
    // console.log(entry.id);

    // const selectItems=entry.getElementsByClassName('transaction-type');
    // if(selectItems){
    //     [...selectItems].forEach((selectItem) => {
    //
    //         let generatedInnerHTML='';
    //         const uuid=entry.id.replace('entry-','');
    //         const identifier=getEntryIndexFromId(uuid);
    //
    //         // console.log(uuid, identifier);
    //
    //         if(entryData[identifier]['polarity']==='incoming'){
    //             generatedInnerHTML+=incomingTypes();
    //             if(entryData[identifier]['type']==='transaction' && entryData[identifier]['source-type']==='manual'){
    //                 generatedInnerHTML+=optionBreak();
    //                 generatedInnerHTML+=outgoingTypes();
    //             }
    //         }
    //         if(entryData[identifier]['polarity']==='outgoing'){
    //             generatedInnerHTML+=outgoingTypes();
    //             if(entryData[identifier]['type']==='transaction' && entryData[identifier]['source-type']==='manual'){
    //                 generatedInnerHTML+=optionBreak();
    //                 generatedInnerHTML+=incomingTypes();
    //             }
    //         }
    //
    //         selectItem.innerHTML=generatedInnerHTML;
    //     });
    // }
    //
    // setTransactionCategory(entry.id);
}


////////////////////////////////////////////////////////////////
function incomingTypes(){
    // let output='';
    // output+='<option value="sales">Sales</option>';
    // output+='<option value="payment_refund">Payment refund</option>';
    // output+='<option value="disposal_of_capital_asset">Disposal of capital asset</option>';
    // output+='<option value="other_money_in">Other money in</option>';
    // // output+='<option value="" disabled></option>';
    // output+='<option value="personal_income">Personal income</option>';
    //
    // return output;
}
////////////////////////////////////////////////////////////////
function outgoingTypes(){
    // let output='';
    // output+='<option value="payment">Payment</option>';
    // output+='<option value="sales_refund">Sales refund</option>';
    // output+='<option value="purchase_of_capital_asset">Purchase of capital asset</option>';
    // output+='<option value="other_money_out">Other money out</option>';
    // // output+='<option value="" disabled></option>';
    // output+='<option value="333">Personal expense</option>';
    //
    // return output;
}
////////////////////////////////////////////////////////////////
function optionBreak() {
    // let output='';
    // output+='<option value="" disabled></option>';
    //
    // return output;
}