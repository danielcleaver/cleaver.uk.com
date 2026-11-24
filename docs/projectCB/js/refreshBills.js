function refreshBills() {
    // console.log('=== Refresh bills');

    // ==== set properties for the entire bill list

    // ==== go through all bills
    [...document.getElementsByClassName('bill')].forEach((parent) => {
        // ---- get the index of this bill in the bills object
        const i = getIndexFromGuid(parent.dataset.id);
        //
        // console.log('refresh bill',i);
        // console.log('bills[i][\'open\']',bills[i]['open']);

        // ======== add classes to the bill =============

        // add/remove confirmed class
        bills[i]['confirmed'] ? parent.classList.add('confirmed') :  parent.classList.remove('confirmed');

        // add/remove ready class
        bills[i]['ready'] ? parent.classList.add('ready') :  parent.classList.remove('ready');

        // add/remove flag classes
        parent.classList.remove('flagged-0');
        parent.classList.remove('flagged-1');
        parent.classList.remove('flagged-2');
        parent.classList.remove('flagged-3');
        parent.classList.remove('flagged-4');
        parent.classList.remove('flagged-5');
        parent.classList.remove('flagged-6');
        parent.classList.add('flagged-'+bills[i]['flag']);

        // add/remove included-within-tax-return
        bills[i]['includedInTaxReturnGuids'].length>0 ? parent.classList.add('included-within-tax-return') :  parent.classList.remove('included-within-tax-return');

        // add/remove open class
        bills[i]['open'] ? parent.classList.add('open') :  parent.classList.remove('open');

        // add/remove open2 class
        bills[i]['open2'] ? parent.classList.add('open2') :  parent.classList.remove('open2');

        //add/remove multiple-lineitems class
        bills[i]['guidsOfChildren'].length>1 ? parent.classList.add('multiple-lineitems') :  parent.classList.remove('multiple-lineitems');

        // add/remove paid-in-full
        bills[i]['outstandingAmount']===0 ? parent.classList.add('paid-in-full') :  parent.classList.remove('paid-in-full');

        // add/remove null-amount
        bills[i]['outstandingAmount']==='' ? parent.classList.add('null-amount') :  parent.classList.remove('null-amount');

        // add/remove bill_refund
        bills[i]['entityType']==='bill_refund' ? parent.classList.add('bill_refund') :  parent.classList.remove('bill_refund');

        // add/remove accounting methods
        settings['accountingMethod']==='cashbasis' ? parent.classList.add('cashbasis') :  parent.classList.remove('cashbasis');
        settings['accountingMethod']==='accrual' ? parent.classList.add('accrual') :  parent.classList.remove('accrual');

        // add/remove hide-totals
        let hideTotals=false;
        if(bills[i]['guidsOfChildren'].length===1){
            hideTotals=true;
        }
        if(settings['accountingMethod']==='accrual'){
            hideTotals=false;
        }
        hideTotals ? parent.classList.add('hide-totals') :  parent.classList.remove('hide-totals');

        // ======== populate fields =============

        // ---- row-1 headline figures

        // ---- populate description
        [...parent.getElementsByClassName('description')].forEach((element) =>{populate(element,bills[i]['description']);});

        // ---- populate description-label
        let descriptionLabel='Information?';
        if(bills[i]['description']!==''){
            descriptionLabel=bills[i]['description'];
        }
        [...parent.getElementsByClassName('description-label')].forEach((element) =>{populate(element,descriptionLabel);});

        // ---- populate display-amount
        let displayAmount='';
        let displayAmountLabel='';
        // console.log('bills[i][\'outstandingAmount\']',bills[i]['outstandingAmount']);
        if(bills[i]['outstandingAmount']===0){
            // paid in full
            displayAmount=bills[i]['amountInclVat'];
            bills[i]['entityType']==='bill_refund' ? displayAmountLabel='refunded in full' : displayAmountLabel='paid in full';
        }
        if(bills[i]['outstandingAmount']<0){
            // amount outstanding
            displayAmount=bills[i]['outstandingAmount'];
            bills[i]['entityType']==='bill_refund' ? displayAmountLabel='overpaid' : displayAmountLabel='outstanding';
            // displayAmountLabel='outstanding';
        }
        if(bills[i]['outstandingAmount']>0){
            // amount overpaid
            displayAmount=bills[i]['outstandingAmount'];
            bills[i]['entityType']==='bill_refund' ? displayAmountLabel='outstanding' : displayAmountLabel='overpaid';
            // displayAmountLabel='overpaid';
        }
        // console.log('displayAmount',displayAmount);
        [...parent.getElementsByClassName('display-amount')].forEach((element) =>{populate(element,formatPoundsPence(displayAmount))});
        [...parent.getElementsByClassName('outstanding-label')].forEach((element) =>{populate(element,displayAmountLabel)});

        // ---- row-2 quick edit summary

        // ---- populate display-summary
        let content='ERROR! No line items for this transaction!';
        if(bills[i]['guidsOfChildren'].length===1){
            // one lineitem, so let's get its properties to display
            const lineitemIndex=getIndexFromGuid(bills[i]['guidsOfChildren'][0]);
            const type=lineitems[lineitemIndex]['categorisationType']?capitalize(lineitems[lineitemIndex]['categorisationType'].replaceAll('_',' ')):'<span class="red">Type?</span>';
            const category=lineitems[lineitemIndex]['categorisationCategory']?capitalize(lineitems[lineitemIndex]['categorisationCategory'].replaceAll('_',' ')):'<span class="red">Category?</span>';
            const vatRate=lineitems[lineitemIndex]['vatRate']?'VAT '+lineitems[lineitemIndex]['vatRate']+'%':'<span class="red">VAT rate?</span>';
            content=type+' &bull; '+category+' &bull; '+vatRate;
        }else{
            if(bills[i]['guidsOfChildren'].length>1){
                content='More than one item';
            }
        }
        [...parent.getElementsByClassName('display-summary')].forEach((element) =>{populate(element,content)});

        // ---- populate display-amount-label
        [...parent.getElementsByClassName('display-amount-label')].forEach((element) =>{populate(element,displayAmountLabel);});

        // ---- populate id
        [...parent.getElementsByClassName('id')].forEach((element) =>{populate(element,'ID:'+bills[i]['guid'])});

        // ---- populate primary-date
        [...parent.getElementsByClassName('primary-date')].forEach((element) =>{populate(element,bills[i]['primaryDate'])});

        // ---- populate flag-type
        [...parent.getElementsByClassName('flag')].forEach((element) =>{
            const currentVal=element.value;
            element.innerHTML=getFlagTypes();
            populate(element,bills[i]['flag']);
            if(currentVal!==''){element.value=currentVal}
        });

        // ---- populate due-date
        [...parent.getElementsByClassName('due-date')].forEach((element) =>{populate(element,bills[i]['dueDate'])});

        // ---- populate bill-id
        [...parent.getElementsByClassName('bill-id')].forEach((element) =>{populate(element,bills[i]['billId'])});

        // ---- populate outstandingAmount
        if(bills[i]['outstandingAmount']===0){
            [...parent.getElementsByClassName('outstanding-amount')].forEach((element) =>{populate(element,formatPoundsPence(bills[i]['amountInclVat']))});
        }else{
            [...parent.getElementsByClassName('outstanding-amount')].forEach((element) =>{populate(element,formatPoundsPence(bills[i]['outstandingAmount']))});
        }
        // ---- populate outstandingAmount
        if(bills[i]['outstandingAmount']===0){
            [...parent.getElementsByClassName('outstanding-amount-display')].forEach((element) =>{populate(element,formatPoundsPence(bills[i]['amountInclVat']))});
        }else{
            [...parent.getElementsByClassName('outstanding-amount-display')].forEach((element) =>{populate(element,formatPoundsPence(bills[i]['outstandingAmount']))});
        }
        if(bills[i]['outstandingAmount']===''){
            [...parent.getElementsByClassName('outstanding-amount-display')].forEach((element) =>{populate(element,'Amount?')});
        }


        // ---- populate amount-incl-vat
        [...parent.getElementsByClassName('amount-incl-vat')].forEach((element) =>{populate(element,formatPoundsPence(bills[i]['amountInclVat']));});

        // ---- populate amount-excl-vat
        [...parent.getElementsByClassName('amount-excl-vat')].forEach((element) =>{populate(element,formatPoundsPence(bills[i]['amountExclVat']))});

        // ---- populate lineitems-well
        content='';
        let firstLineitem=true;
        bills[i]['guidsOfChildren'].forEach((childGuid)=>{
            content+=drawLineitem(childGuid,firstLineitem);
            firstLineitem=false;
        });
        [...parent.getElementsByClassName('lineitems-well')].forEach((element) =>{
            populate(element,content);
        });

        // ---- populate assigned transactions well
        content='';
        bills[i]['assignedTransactionsGuids'].forEach((childGuid)=>{
            content+=drawTransactionInline(childGuid);
        });
        [...parent.getElementsByClassName('transactions-well')].forEach((element) =>{
            populate(element,content);
        });

        // ---- populate assigned transactions well items
        bills[i]['assignedTransactionsGuids'].forEach((transactionGuid)=> {
            const transactionIndex=getIndexFromGuid(transactionGuid);

            [...parent.querySelectorAll('.inline-transaction[data-id="'+transactionGuid+'"]')].forEach((inlineTransaction) => {

                // ---- populate billbill-primary-date
                [...inlineTransaction.getElementsByClassName('primary-date')].forEach((element) =>{
                    populate(element,transactions[transactionIndex]['primaryDate']);
                    element.disabled=!transactions[transactionIndex]['editableInline'];
                });

                // ---- populate billbill-description
                [...inlineTransaction.getElementsByClassName('description')].forEach((element) =>{
                    populate(element,transactions[transactionIndex]['description']);
                    element.disabled=!transactions[transactionIndex]['editableInline'];
                });

                // ---- populate billbill-amount-incl-vat
                [...inlineTransaction.getElementsByClassName('amount-incl-vat')].forEach((element) =>{
                    populate(element,formatPoundsPence(transactions[transactionIndex]['amountInclVat']));
                    element.disabled=!transactions[transactionIndex]['editableInline'];
                });

                // ---- populate billbill-amount-incl-vat-INVERSEDISPLAY
                [...inlineTransaction.getElementsByClassName('amount-incl-vat-INVERSEDISPLAY')].forEach((element) =>{
                    populate(element,formatPoundsPence(transactions[transactionIndex]['amountInclVat']));
                    element.disabled=!transactions[transactionIndex]['editableInline'];
                });

            });
        });

        // ---- populate refund-items well
        content='';
        bills[i]['refundGuids'].forEach((childGuid)=>{
            content+=drawInvoiceBillInline(childGuid);
        });
        [...parent.getElementsByClassName('refund-items-well')].forEach((element) =>{
            populate(element,content);
        });

        // ---- populate assigned transactions well items
        bills[i]['refundGuids'].forEach((refundGuid)=> {
            const refundIndex=getIndexFromGuid(refundGuid);

            [...parent.querySelectorAll('.inline-invoiceBill[data-id="'+refundGuid+'"]')].forEach((inlineInvoice) => {

                // ---- populate invoicebill-primary-date
                [...inlineInvoice.getElementsByClassName('invoicebill-primary-date')].forEach((element) =>{
                    populate(element,makeDateHumanReadable(bills[refundIndex]['primaryDate']));
                    element.disabled=!bills[refundIndex]['editableInline'];
                });

                // ---- populate invoicebill-description
                [...inlineInvoice.getElementsByClassName('invoicebill-description')].forEach((element) =>{
                    populate(element,bills[refundIndex]['description']);
                    element.disabled=!bills[refundIndex]['editableInline'];
                });

                // ---- populate invoicebill-amount-incl-vat
                [...inlineInvoice.getElementsByClassName('invoicebill-amount-incl-vat')].forEach((element) =>{
                    populate(element,formatPoundsPence(bills[refundIndex]['amountInclVat']));
                    element.disabled=!bills[refundIndex]['editableInline'];
                });

            });

        });



        // ---- populate submission-well
        content='';
        bills[i]['includedInTaxReturnGuids'].forEach((submissionGuid)=>{
            content+=drawsubmission(submissionGuid);
        });
        [...parent.getElementsByClassName('submission-well')].forEach((element) =>{
            populate(element,content);
        });
        // ---- populate submission-well items
        bills[i]['includedInTaxReturnGuids'].forEach((submissionGuid)=>{
            const submissionIndex=getIndexFromGuid(submissionGuid);
            const type=getEntityTypeFromGuid(submissionGuid);
            const list=getList(type);

            // console.log('submissionGuid',submissionGuid);
            // console.log('submissionIndex',submissionIndex);
            // console.log('type',type);
            // console.log('list',list);
            // console.log('submissionType',list[submissionIndex]['submissionType']);

            //  ---- only populate the submissions in the well that match this submissionGuid
            [...parent.querySelectorAll('[data-id="'+submissionGuid+'"]')].forEach((submissionElement) =>{

                // ---- populate submission-submission-type
                [...submissionElement.getElementsByClassName('submission-submission-type')].forEach((element) =>{populate(element,list[submissionIndex]['submissionType'])});

                // ---- populate submission-period
                [...submissionElement.getElementsByClassName('submission-period')].forEach((element) =>{
                    let submissionPeriod='';
                    submissionPeriod+=makeDateHumanReadableShort(list[submissionIndex]['periodStart']);
                    submissionPeriod+=' - ';
                    submissionPeriod+=makeDateHumanReadableShort(list[submissionIndex]['periodEnd']);
                    populate(element,submissionPeriod);
                });

                // ---- populate submission-submission-date
                [...submissionElement.getElementsByClassName('submission-submission-date')].forEach((element) =>{
                    let submissionDate='';
                    if(list[submissionIndex]['status']==='submitted'){
                        submissionDate+='on ';
                        submissionDate+=makeDateHumanReadableShort(list[submissionIndex]['submissionDate'])
                    }else{
                        submissionDate+='not submitted';
                    }

                    populate(element,submissionDate);
                });
            });
        });

        // ---- populate note-field
        [...parent.getElementsByClassName('note-field')].forEach((element) =>{
            populate(element,bills[i]['notes']);
        });

        // ---- populate assigned-transaction-title
        content='';
        if(bills[i]['assignedTransactionsGuids'].length==1){
            content='assigned transaction:';
        }
        if(bills[i]['assignedTransactionsGuids'].length>1){
            content='assigned transactions:';
        }
        [...parent.getElementsByClassName('assigned-transaction-title')].forEach((element) =>{
            populate(element,content);
        });

        // ---- populate refund-item-title
        content='';
        if(bills[i]['refundGuids'].length>0){
            bills[i]['entityType']==='bill_refund' ? content='bill for this refund:' : content='refund for this bill:';
            // content='assigned transaction:';
        }
        if(bills[i]['refundGuids'].length>1){
            bills[i]['entityType']==='bill_refund' ? content='bills for this refund:' : content='refunds for this bill:';
            // content='assigned transactions:';
        }
        [...parent.getElementsByClassName('refund-item-title')].forEach((element) =>{
            populate(element,content);
        });











    });


    // calcLineitems();
    // checkLineitems();
    // calcBills();
    // checkBills();
}