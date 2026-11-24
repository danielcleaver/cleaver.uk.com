function transactionFieldChanged(field){

    // console.log('transactionFieldChanged',field);

    const guid=getGuidFromElement(field);
    const transactionIndex=getIndexFromGuid(guid)

    // Replace blank descriptions with the stored default
    if(field.classList.contains('description')){
        if(field.value===''){
            field.value=transactions[transactionIndex]['descriptionDefault'];
        }
    }


    // ---- set all lineitems to match qe if qe are changed
    const qeFields=[
        ['qe-transaction-type','categorisationType'],
        ['qe-transaction-category','categorisationCategory'],
        ['qe-transaction-vatrate','vatRate'],
        ['qe-transaction-eu','eu'],
        ['qe-transaction-disallowable','disallowable'],
    ];
    qeFields.forEach((qeField) =>{
        if(field.classList.contains(qeField[0])){
            transactions[transactionIndex]['guidsOfChildren'].forEach((lineitemGuid) => {
                const lineitemIndex=getIndexFromGuid(lineitemGuid);

                if(field.type==='checkbox'){
                    lineitems[lineitemIndex][qeField[1]]=field.checked;
                }else{
                    lineitems[lineitemIndex][qeField[1]]=field.value;
                }

            })
        }
    })


    // ---- if only one lineitem then setting the transaction amount inc vat should change the line items amount inc vat
    if(transactions[transactionIndex]['guidsOfChildren'].length===1){
        if(field.classList.contains('amount-incl-vat')){
            const lineitemIndex=getIndexFromGuid(transactions[transactionIndex]['guidsOfChildren'][0]);

            if(
                lineitems[lineitemIndex]['amountInclVat']!==''
            ){
                lineitems[lineitemIndex]['amountInclVat']=Number(field.value);
                lineitems[lineitemIndex]['amountExclVat']=Math.round(lineitems[lineitemIndex]['amountInclVat']/(1+(lineitems[lineitemIndex]['vatRate']/100))*100)/100;
                lineitems[lineitemIndex]['amountOfVat']=lineitems[lineitemIndex]['amountInclVat']-lineitems[lineitemIndex]['amountExclVat'];
            }else{
                lineitems[lineitemIndex]['amountExclVat']='';
                lineitems[lineitemIndex]['amountOfVat']='';
            }


            // const field=document.querySelector('.lineitem[data-id="'+transactions[transactionIndex]['guidsOfChildren'][0]+'"]');
            // console.log(field);
            // document.querySelector('.lineitem[data-id="'+transactions[transactionIndex]['guidsOfChildren'][0]+'"]').value=field.value;
        }
    }


    calcTransaction(guid);
    checkTransaction(guid);


    const classesToImmediatelyStoreInTransactions=[
        // ['cssCLASS','transactionsPROPERTY'],
        ['qe-transaction-type','qe-transaction-type'],
        ['qe-transaction-category','qe-transaction-category'],
        ['qe-transaction-vatrate','qe-transaction-vatrate'],
        ['qe-transaction-eu','qe-transaction-eu'],
        ['qe-transaction-disallowable','qe-transaction-disallowable'],
        ['transaction-ignoreConfirm-selector','qe-transaction-ignoreConfirm'],
        ['ignoreConfirmTickbox','qe-transaction-ignoreConfirm-ticked'],

        ['primary-date','primaryDate'],
        ['description','description'],
        ['amount-incl-vat','amountInclVat'],
        ['flag','flag'],
        ['ignored-tickbox','ignored'],
        ['note-field','notes']
    ];

    // reset categories when types change
    if(field.classList.contains('qe-transaction-type')){
        transactions[transactionIndex]['qe-transaction-category']='';
        // if(field.value==='sales'){transactions[transactionIndex]['qe-transaction-category']='sales';}
        if(field.value==='sale'){
            transactions[transactionIndex]['qe-transaction-category']='income';
            const lineitemIndex=getIndexFromGuid(transactions[transactionIndex]['guidsOfChildren'][0]);
            lineitems[lineitemIndex]['categorisationCategory']='income';
        }
        if(field.value==='sale_refund'){
            transactions[transactionIndex]['qe-transaction-category']='income';
            const lineitemIndex=getIndexFromGuid(transactions[transactionIndex]['guidsOfChildren'][0]);
            lineitems[lineitemIndex]['categorisationCategory']='income';
        }
        if(field.value==='na_expense'){
            transactions[transactionIndex]['qe-transaction-category']='ignored';
            const lineitemIndex=getIndexFromGuid(transactions[transactionIndex]['guidsOfChildren'][0]);
            lineitems[lineitemIndex]['categorisationCategory']='ignored';
        }
        if(field.value==='na_income'){
            transactions[transactionIndex]['qe-transaction-category']='ignored';
            const lineitemIndex=getIndexFromGuid(transactions[transactionIndex]['guidsOfChildren'][0]);
            lineitems[lineitemIndex]['categorisationCategory']='ignored';
        }
    }


    classesToImmediatelyStoreInTransactions.forEach((mapping) => {
        if(field.classList.contains(mapping[0])){
            let storeValue=field.value;
            if(field.classList.contains('amount-input')){
                if(storeValue!==''){
                    storeValue=Number(storeValue
                        .replaceAll('£','')
                        .replaceAll(' ','')
                        .replaceAll(',',''));
                }
            }
            if(field.type==='checkbox'){
                storeValue=field.checked;
            }
            transactions[transactionIndex][mapping[1]]=storeValue;
        }
    });





    // console.log(transactions);

}

////////////////////////////////////////////////////////////
function invoiceFieldChanged(field){

    // console.log('invoiceFieldChanged',field);

    const guid=getGuidFromElement(field);

    calcInvoice(guid);
    checkInvoice(guid);

    const index=getIndexFromGuid(guid);

    const classesToImmediatelyStoreInTransactions=[
        // ['cssCLASS','transactionsPROPERTY'],
        ['primary-date','primaryDate'],
        ['description','description'],
        ['flag','flag'],
        ['due-date','dueDate'],
        ['invoice-id','invoiceId'],
        ['amount-incl-vat','amountInclVat'],


        ['note-field','notes']

    ];

    classesToImmediatelyStoreInTransactions.forEach((mapping) => {
        if(field.classList.contains(mapping[0])){
            let storeValue=field.value;
            if(field.classList.contains('amount-input')){
                if(storeValue!==''){
                    storeValue=Number(storeValue
                        .replaceAll('£','')
                        .replaceAll(' ','')
                        .replaceAll(',',''));
                }
            }
            if(field.type==='checkbox'){
                storeValue=field.checked;
            }
            invoices[index][mapping[1]]=storeValue;
        }
    });

}

////////////////////////////////////////////////////////////
function billFieldChanged(field){

    // console.log('billFieldChanged',field);

    const guid=getGuidFromElement(field);

    calcBill(guid);
    checkBill(guid);

    const index=getIndexFromGuid(guid);

    const classesToImmediatelyStoreInTransactions=[
        // ['cssCLASS','transactionsPROPERTY'],
        ['primary-date','primaryDate'],
        ['description','description'],
        ['flag','flag'],
        ['due-date','dueDate'],
        ['bill-id','billId'],
        ['amount-incl-vat','amountInclVat'],
        ['note-field','notes']
    ];

    classesToImmediatelyStoreInTransactions.forEach((mapping) => {
        if(field.classList.contains(mapping[0])){
            let storeValue=field.value;
            if(field.classList.contains('amount-input')){
                if(storeValue!==''){
                    storeValue=Number(storeValue
                        .replaceAll('£','')
                        .replaceAll(' ','')
                        .replaceAll(',',''));
                }

            }
            if(field.type==='checkbox'){
                storeValue=field.checked;
            }
            bills[index][mapping[1]]=storeValue;
        }
    });

}

////////////////////////////////////////////////////////////
function lineitemFieldChanged(field, doNotTriggerCalcOrCheck){

    const guid=getGuidFromElement(field);
    const lineitemIndex=getIndexFromGuid(guid);

    const parentGuid=lineitems[lineitemIndex]['guidOfParent'];
    const parentIndex=getIndexFromGuid(parentGuid);
    const parentType=getEntityTypeFromGuid(parentGuid);
    const parentList=getList(parentType);

    // console.log('lineitemFieldChanged',guid, doNotTriggerCalcOrCheck, field.classList);
    // console.log('lineitemIndex',lineitemIndex);
    // console.log('parentIndex',parentIndex);
    // console.log('==========================');

    if(!doNotTriggerCalcOrCheck){
        calcLineitem(guid,field);
        checkLineitem(guid);
    }

    // ---- deal with qe fields for transactions only.
    if(parentType==='transaction'){
        if(parentList[parentIndex]['guidsOfChildren'].length===1){

            // ---- set qe to match lineitem items if lineitem is changed AND there is only one lineitem
            const qeFields=[
                ['lineitem-transaction-type','qe-transaction-type'],
                ['lineitem-transaction-category','qe-transaction-category'],
                ['lineitem-transaction-vatrate','qe-transaction-vatrate'],
                ['lineitem-eu','qe-transaction-eu'],
                ['lineitem-disallowable','qe-transaction-disallowable'],
            ];
            qeFields.forEach((qeField) =>{
                if(field.classList.contains(qeField[0])){

                    if(field.type==='checkbox'){
                        parentList[parentIndex][qeField[1]]=field.checked;
                    }else{
                        parentList[parentIndex][qeField[1]]=field.value;
                    }

                }
            })
        }

        if(parentList[parentIndex]['guidsOfChildren'].length>1){
            const qeFields=[
                ['lineitem-transaction-type','qe-transaction-type'],
                ['lineitem-transaction-category','qe-transaction-category'],
                ['lineitem-transaction-vatrate','qe-transaction-vatrate'],
                ['lineitem-eu','qe-transaction-eu'],
                ['lineitem-disallowable','qe-transaction-disallowable'],
            ];
            qeFields.forEach((qeField) =>{
                if(field.classList.contains(qeField[0])){
                    // ---- set qe to multiple as there are more than one lineitem
                    parentList[parentIndex]['qe-transaction-type']='multiple';
                    parentList[parentIndex]['qe-transaction-category']='multiple';
                    parentList[parentIndex]['qe-transaction-vatrate']='multiple';
                    parentList[parentIndex]['qe-transaction-eu']=false;
                    parentList[parentIndex]['qe-transaction-disallowable']=false;
                }
            });
        }
    }

    const index=getIndexFromGuid(guid);
    const thisLineItem=lineitems[index];
    // console.log('field',field);
    // console.log('guid',guid);
    // console.log('index',index);


    const classesToImmediatelyStoreInLineitems=[
        ['lineitem-description','description'],
        ['lineitem-amount-excl-vat','amountExclVat'],
        ['lineitem-amount-incl-vat','amountInclVat'],
        ['lineitem-amount-of-vat','amountOfVat'],
        ['lineitem-transaction-type','categorisationType'],
        ['lineitem-transaction-category','categorisationCategory'],
        ['lineitem-transaction-vatrate','vatRate'],
        ['lineitem-eu','eu'],
        ['lineitem-disallowable','disallowable'],
    ];

    // reset categories when types change
    if(field.classList.contains('lineitem-transaction-type')){
        thisLineItem['categorisationCategory']='';
        if(field.value==='sale' || field.value==='sale_refund'){thisLineItem['categorisationCategory']='income';}
        if(field.value==='na_income' || field.value==='na_expense'){thisLineItem['categorisationCategory']='ignored';}
    }

    classesToImmediatelyStoreInLineitems.forEach((classToImmediatelyStoreInLineitems) => {
        if(field.classList.contains(classToImmediatelyStoreInLineitems[0])){
            let storeValue=field.value;
            if(field.classList.contains('amount-input')){
                if(storeValue!==''){
                    storeValue=Number(storeValue
                        .replaceAll('£','')
                        .replaceAll(' ','')
                        .replaceAll(',','')
                    );
                }
            }
            if(field.type==='checkbox'){
                storeValue=field.checked;
            }
            thisLineItem[classToImmediatelyStoreInLineitems[1]]=storeValue;
        }
    });


    // ================== make sure all cousins are kept in sync.
    const valuesSyncedWithCousins=[
        'categorisationType',
        'categorisationCategory',
        'eu',
        'disallowable',
        'vatRate',
        'description',
    ];

    // ---- get cousinGuids
    const cousinGuids=getGuidsOfCousins(thisLineItem['guidOfCousins']);
    const thisParentGuid=thisLineItem['guidOfParent'];
    const thisParentIndex=getIndexFromGuid(thisParentGuid);
    const thisParentType=getEntityTypeFromGuid(thisParentGuid);
    const thisParentList=getList(thisParentType);
    const thisParent=thisParentList[thisParentIndex];
    let thisIsRefund=false;

    if(thisLineItem['categorisationType'].endsWith('_refund')){
        thisIsRefund=true;
    }


    // console.log('thisParentGuid',thisParentGuid);
    // console.log('thisParentIndex',thisParentIndex);
    // console.log('thisParentType',thisParentType);

    // console.log('thisIsRefund',thisIsRefund);
    // console.log('thisLineItem[\'guidOfCousins\']',thisLineItem['guidOfCousins']);
    // console.log('cousinGuids',cousinGuids);
    cousinGuids.forEach((cousinGuid) => {

        const cousinIndex=getIndexFromGuid(cousinGuid);
        const cousin=lineitems[cousinIndex];

        const cousinParentGuid=cousin['guidOfParent'];
        const cousinParentType=getEntityTypeFromGuid(cousinParentGuid);
        const cousinParentList=getList(cousinParentType);
        const cousinParentIndex=getIndexFromGuid(cousinParentGuid);
        const cousinParent=cousinParentList[cousinParentIndex];

        let cousinIsRefund=false;
        if(cousinParentType.endsWith('_refund')){
            cousinIsRefund=true;
        }else{
            if(cousinParentType==='transaction'){
                //check to see if the transaction is attached to a refund
                const cousinParentParentGuid=cousinParent['assignedToInvoiceGuid']+cousinParent['assignedToBillGuid'];
                if(cousinParentParentGuid !=='')  {
                    // it is assigned
                    const cousinParentParentType=getEntityTypeFromGuid(cousinParentParentGuid);
                    if(cousinParentParentType.endsWith('_refund')){
                        cousinIsRefund=true;
                    }
                }else{
                    if(cousinParent['amountInclVat']<0 && thisParent['entityType']==='invoice'){
                        cousinIsRefund=true;
                    }
                    if(cousinParent['amountInclVat']>0 && thisParent['entityType']==='bill'){
                        cousinIsRefund=true;
                    }
                }
            }else{
                if(cousinParent['amountInclVat']<0 && thisParent['entityType']==='invoice'){
                    cousinIsRefund=true;
                }
                if(cousinParent['amountInclVat']>0 && thisParent['entityType']==='bill'){
                    cousinIsRefund=true;
                }
            }

        }

        // console.log('--cousinGuid',cousinGuid);
        // console.log('cousinIsRefund',cousinIsRefund);
        // console.log('=== thisGuid  ',thisLineItem['guid']);
        // console.log('thisIsRefund  ',thisIsRefund);
        // console.log('    cousinGuid',cousinGuid);
        // console.log('cousinIsRefund',cousinIsRefund);


        // overwrite valuesSyncedWithCousins
        valuesSyncedWithCousins.forEach((valueLabel) => {
            let remappedValue =thisLineItem[valueLabel];

            // remap types between invoice/invoiceRefunds and bill/billRefunds

            if(valueLabel==='categorisationType'){
                if(!thisIsRefund && cousinIsRefund){
                    remappedValue=remappedValue.replaceAll('_refund','')+'_refund';
                }

                if(thisIsRefund && !cousinIsRefund){
                    remappedValue=remappedValue.replaceAll('_refund','');
                }
            }

            cousin[valueLabel]=remappedValue;

        });
        // re-calc amountExclVat and amountOfVat
        cousin['amountExclVat']=Math.round(cousin['amountInclVat']/(1+(cousin['vatRate']/100))*100)/100;
        cousin['amountOfVat']=cousin['amountInclVat']-cousin['amountExclVat'];
    });

}