function refreshTransactions(){

    // console.log('=== Refresh transactions');

    // ==== set properties for the entire transaction list

    // ==== go through all transactions
    [...document.getElementsByClassName('transaction')].forEach((parent) => {
        // ---- get the index of this transactions in the transactions object
        const i=getIndexFromGuid(parent.dataset.id);
        //
        // console.log('refresh transaction',i);
        // console.log('transactions[i][\'open\']',transactions[i]['open']);

        // ======== add classes to the transaction =============

        // add/remove confirmed class
        transactions[i]['confirmed'] ? parent.classList.add('confirmed') :  parent.classList.remove('confirmed');

        // add/remove ready class
        transactions[i]['ready'] ? parent.classList.add('ready') :  parent.classList.remove('ready');

        // add/remove ignored class
        transactions[i]['ignored'] ? parent.classList.add('ignored') :  parent.classList.remove('ignored');

        // add/remove flag classes
        parent.classList.remove('flagged-0');
        parent.classList.remove('flagged-1');
        parent.classList.remove('flagged-2');
        parent.classList.remove('flagged-3');
        parent.classList.remove('flagged-4');
        parent.classList.remove('flagged-5');
        parent.classList.remove('flagged-6');
        parent.classList.add('flagged-'+transactions[i]['flag']);

        // add/remove quick-edit class
        transactions[i]['qe'] ? parent.classList.add('quick-editing') :  parent.classList.remove('quick-editing');

        // add/remove assigned classes
        transactions[i]['assignedToInvoiceGuid'] ? parent.classList.add('assigned-to-invoice-or-invoice_refund') :  parent.classList.remove('assigned-to-invoice-or-invoice_refund');
        transactions[i]['assignedToBillGuid'] ? parent.classList.add('assigned-to-bill-or-bill_refund') :  parent.classList.remove('assigned-to-bill-or-bill_refund');

        if(transactions[i]['assignedToInvoiceGuid']){
            const invoice=invoices[getIndexFromGuid(transactions[i]['assignedToInvoiceGuid'])];
            invoice['entityType']==='invoice' ? parent.classList.add('assigned-to-invoice') :  parent.classList.remove('assigned-to-invoice');
            invoice['entityType']==='invoice_refund' ? parent.classList.add('assigned-to-invoice_refund') :  parent.classList.remove('assigned-to-invoice_refund');
        }
        if(transactions[i]['assignedToBillGuid']){
            const bill=bills[getIndexFromGuid(transactions[i]['assignedToBillGuid'])];
            bill['entityType']==='bill' ? parent.classList.add('assigned-to-bill') :  parent.classList.remove('assigned-to-bill');
            bill['entityType']==='bill_refund' ? parent.classList.add('assigned-to-bill_refund') :  parent.classList.remove('assigned-to-bill_refund');
        }

        (transactions[i]['assignedToInvoiceGuid'] || transactions[i]['assignedToBillGuid']) ? parent.classList.add('assigned') :  parent.classList.remove('assigned');

        // add/remove included-within-tax-return
        transactions[i]['includedInTaxReturnGuids'].length>0 ? parent.classList.add('included-within-tax-return') :  parent.classList.remove('included-within-tax-return');

        // // add/remove open class
        transactions[i]['open'] ? parent.classList.add('open') :  parent.classList.remove('open');

        // // add/remove open2 class
        transactions[i]['open2'] ? parent.classList.add('open2') :  parent.classList.remove('open2');

        //add/remove multiple-lineitems class
        transactions[i]['guidsOfChildren'].length>1 ? parent.classList.add('multiple-lineitems') :  parent.classList.remove('multiple-lineitems');

        // add/remove qe-transaction-eu-present
        transactions[i]['qe-transaction-eu'] ? parent.classList.add('qe-transaction-eu-present') :  parent.classList.remove('qe-transaction-eu-present');

        // add/remove qe-transaction-disallowable-present
        transactions[i]['qe-transaction-disallowable'] ? parent.classList.add('qe-transaction-disallowable-present') :  parent.classList.remove('qe-transaction-disallowable-present');

        // add/remove deletable
        transactions[i]['deletable'] ? parent.classList.add('deletable') :  parent.classList.remove('deletable');

        // add/remove accounting methods
        settings['accountingMethod']==='cashbasis' ? parent.classList.add('cashbasis') :  parent.classList.remove('cashbasis');
        settings['accountingMethod']==='accrual' ? parent.classList.add('accrual') :  parent.classList.remove('accrual');

        // add/remove hide-totals
        let hideTotals=false;
        if(transactions[i]['guidsOfChildren'].length===1){
            hideTotals=true;
        }

        if(settings['accountingMethod']==='accrual'){
            hideTotals=false;
        }

        hideTotals ? parent.classList.add('hide-totals') :  parent.classList.remove('hide-totals');



        // ======== readonly qe fields of opening =============
        if(transactions[i]['opening'] || (transactions[i]['open'] && typeof transactions[i]['opening']==='undefined')){
            // transaction is open, at least at the top level
            const display=parent.getElementsByClassName('display')[0];

            // make qe fields read-only
            [...display.getElementsByClassName('qe-transaction-type')].forEach((element) =>{
                element.disabled=true;
                element.classList.add('qe-disabled');
            });
            [...display.getElementsByClassName('qe-transaction-category')].forEach((element) =>{
                element.disabled=true;
                element.classList.add('qe-disabled');
            });
            [...display.getElementsByClassName('qe-transaction-vatrate')].forEach((element) =>{
                element.disabled=true;
                element.classList.add('qe-disabled');
            });
            [...display.getElementsByClassName('transaction-ignoreConfirm-selector')].forEach((element) =>{
                element.disabled=true;
                element.classList.add('qe-disabled');
            });
            [...display.getElementsByClassName('ignoreConfirmTickbox')].forEach((element) =>{
                element.disabled=true;
                element.classList.add('qe-disabled');
            });
            [...display.getElementsByClassName('assign-transaction-link')].forEach((element) =>{
                element.disabled=true;
                element.classList.add('qe-disabled');
                element.onclick='';
            });
        }




        // ======== populate fields =============

        // ---- row-1 headline figures

        // ---- populate description
        [...parent.getElementsByClassName('description')].forEach((element) =>{populate(element,transactions[i]['description']);});

        // ---- populate description-label
        let descriptionLabel='Information?';
        if(transactions[i]['description']!==''){
            descriptionLabel=transactions[i]['description'];
        }
        [...parent.getElementsByClassName('description-label')].forEach((element) =>{populate(element,descriptionLabel);});

        // ---- populate amount-incl-vat
        [...parent.getElementsByClassName('amount-incl-vat')].forEach((element) =>{populate(element,formatPoundsPence(transactions[i]['amountInclVat']))});

        // ---- populate amount-incl-vat-label
        let amountInclVatLabel='Amount?';

        if(transactions[i]['amountInclVat']!==''){
            amountInclVatLabel=formatPoundsPence(transactions[i]['amountInclVat'])
        }


        [...parent.getElementsByClassName('amount-incl-vat-label')].forEach((element) =>{populate(element,amountInclVatLabel)});

        // ---- enable/disable amount-incl-vat

        // If transaction is deletable, then the amount-incl-vat should be not disabled in the edit-panel
        // [...parent.getElementsByClassName('edit-panel')].forEach((editPanel) => {
        //     [...editPanel.getElementsByClassName('amount-incl-vat')].forEach((element) => {
        //         element.disabled=!transactions[i]['deletable'];
        //     });
        // });

        // amount-incl-vat SHOULD BE DISABLED FOR ALL TRANSACTIONS
        [...parent.getElementsByClassName('edit-panel')].forEach((editPanel) => {
            [...editPanel.getElementsByClassName('amount-incl-vat')].forEach((element) => {
                element.disabled=true;
            });
        });


        // ---- populate amount-excl-vat
        [...parent.getElementsByClassName('amount-excl-vat')].forEach((element) =>{populate(element,formatPoundsPence(transactions[i]['amountExclVat']))});

        // ---- row-2 quick edit

        // ---- populate qe-transaction-type
        [...parent.getElementsByClassName('qe-transaction-type')].forEach((element) =>{
            // options
            element.innerHTML=getTypesQe(transactions[i]['amountInclVat']);
            // value
            populate(element,transactions[i]['qe-transaction-type']);

            //disable category if type is not set
            if(transactions[i]['qe-transaction-type'] ==='') {
                [...parent.getElementsByClassName('qe-transaction-category')].forEach((element) => {
                    element.disabled=true;
                });
            }
        });

        // ---- populate qe-transaction-type-category
        [...parent.getElementsByClassName('qe-transaction-category')].forEach((element) =>{
            // options
            element.innerHTML=getCategoriesQe([...parent.getElementsByClassName('qe-transaction-type')][0].value);
            // value
            populate(element,transactions[i]['qe-transaction-category']);
        });

        // ---- populate qe-transaction-type-vatrate
        [...parent.getElementsByClassName('qe-transaction-vatrate')].forEach((element) =>{
            // options
            element.innerHTML=getVatratesQe();
            // value
            populate(element,transactions[i]['qe-transaction-vatrate']);
        });

        // ---- populate qe-transaction-eu
        [...parent.getElementsByClassName('qe-transaction-eu')].forEach((element) =>{
            // value
            populate(element,transactions[i]['qe-transaction-eu']);
        });

        // ---- populate qe-transaction-disallowable
        [...parent.getElementsByClassName('qe-transaction-disallowable')].forEach((element) =>{
            // value
            populate(element,transactions[i]['qe-transaction-disallowable']);
        });

        // ---- populate qe-transaction-ignoreConfirm-selector
        [...parent.getElementsByClassName('transaction-ignoreConfirm-selector')].forEach((element) =>{
            // value
            populate(element,transactions[i]['qe-transaction-ignoreConfirm']);
        });

        // ---- populate qe-ignoreConfirmTickbox
        [...parent.getElementsByClassName('ignoreConfirmTickbox')].forEach((element) =>{
            // value
            populate(element,transactions[i]['qe-transaction-ignoreConfirm-ticked']);
        });


        // ---- row-3 quick edit summary

        // ---- populate display-summary
        let content='ERROR! No line items for this transaction!';
        if(transactions[i]['guidsOfChildren'].length===1){
            // one lineitem, so let's get its properties to display
            const lineitemIndex=getIndexFromGuid(transactions[i]['guidsOfChildren'][0]);
            const type=lineitems[lineitemIndex]['categorisationType']?capitalize(lineitems[lineitemIndex]['categorisationType'].replaceAll('_',' ')):'<span class="red">Type?</span>';
            const category=lineitems[lineitemIndex]['categorisationCategory']?capitalize(lineitems[lineitemIndex]['categorisationCategory'].replaceAll('_',' ')):'<span class="red">Category?</span>';
            const vatRate=lineitems[lineitemIndex]['vatRate']?'VAT '+lineitems[lineitemIndex]['vatRate']+'%':'<span class="red">VAT rate?</span>';
            content=type+' &bull; '+category+' &bull; '+vatRate;
        }else{
            if(transactions[i]['guidsOfChildren'].length>1){
                content='More than one item';
            }
        }
        [...parent.getElementsByClassName('display-summary')].forEach((element) =>{populate(element,content)});

        // ---- populate id
        [...parent.getElementsByClassName('id')].forEach((element) =>{populate(element,'ID: '+transactions[i]['guid'])});

        // ---- populate end-bar-label
        [...parent.getElementsByClassName('end-bar-label')].forEach((element) =>{
            let content;
            if(transactions[i]['sourceType']==='bankFeed'){
                if(transactions[i]['sourceId']){
                    content=transactions[i]['sourceId'].toUpperCase()+' ';
                }
                content+=humanReadableSourceType(transactions[i]['sourceType']);
            }else{
               content=humanReadableSourceType(transactions[i]['sourceType']);
            }
            populate(element,content);
        });

        // ---- populate primary-date
        [...parent.getElementsByClassName('primary-date')].forEach((element) =>{populate(element,transactions[i]['primaryDate'])});

        // ---- populate flag-type
        [...parent.getElementsByClassName('flag')].forEach((element) =>{
            const currentVal=element.value;
            element.innerHTML=getFlagTypes();
            populate(element,transactions[i]['flag']);
            if(currentVal!==''){element.value=currentVal}
        });

        // ---- populate ignored
        [...parent.getElementsByClassName('ignored-tickbox')].forEach((element) =>{populate(element,transactions[i]['ignored'])});


        // ---- populate lineitems-well
        content='';
        let firstLineitem=true;
        transactions[i]['guidsOfChildren'].forEach((childGuid)=>{
            content+=drawLineitem(childGuid,firstLineitem);
            firstLineitem=false;
        });
        [...parent.getElementsByClassName('lineitems-well')].forEach((element) =>{
            populate(element,content);
        });

        // make lineitem totalInclVat and totalExclVat readonly if transaction type is bankfeed or CSV, AND if there is only one lineitem.
        if(
            (transactions[i]['sourceType']==='bankFeed' ||
            transactions[i]['sourceType']==='csv')
            &&
            transactions[i]['guidsOfChildren'].length===1
        ){
            [...parent.querySelectorAll('.lineitems-well .lineitem-amount-incl-vat')].forEach((element) =>{
                element.readOnly=true;
            });
            [...parent.querySelectorAll('.lineitems-well .lineitem-amount-excl-vat')].forEach((element) =>{
                element.readOnly=true;
            });
        }else{
            [...parent.querySelectorAll('.lineitems-well .lineitem-amount-incl-vat')].forEach((element) =>{
                element.readOnly=false;
            });
            [...parent.querySelectorAll('.lineitems-well .lineitem-amount-excl-vat')].forEach((element) =>{
                element.readOnly=false;
            });
        }


        // ---- populate the invoicebill-well items
        if(transactions[i]['assignedToInvoiceGuid'] || transactions[i]['assignedToBillGuid']){
            const invoiceGuid=transactions[i]['assignedToInvoiceGuid'];
            const billGuid=transactions[i]['assignedToBillGuid'];
            // make sure we have one and only one of invoiceGuid or billGuid
            if(!!invoiceGuid!==!!billGuid){
                const invoicebillGuid=!!invoiceGuid ? invoiceGuid : billGuid;
                const invoicebillIndex=getIndexFromGuid(invoicebillGuid);
                // console.log('invoiceGuid',invoiceGuid);
                // console.log('billGuid',billGuid);
                // console.log('invoicebillGuid',invoicebillGuid);
                // console.log('invoicebillIndex',invoicebillIndex);
                if(invoicebillIndex!==-1){
                    const type=getEntityTypeFromGuid(invoicebillGuid);
                    const list=getList(type);
                    // console.log('type',type);
                    // console.log('list',list);
                    // ---- populate invoicebill-primary-date
                    [...parent.getElementsByClassName('invoicebill-primary-date')].forEach((element) =>{populate(element,makeDateHumanReadable(list[invoicebillIndex]['primaryDate']))});

                    // ---- populate invoicebill-description
                    [...parent.getElementsByClassName('invoicebill-description')].forEach((element) =>{populate(element,list[invoicebillIndex]['description'])});

                    // ---- populate invoicebill-amount-incl-vat
                    [...parent.getElementsByClassName('invoicebill-amount-incl-vat')].forEach((element) =>{populate(element,formatPoundsPence(list[invoicebillIndex]['amountInclVat']))});

                    // console.log(invoicebillIndex!==-1 ? list[invoicebillIndex]['description'] : 'missing link');

                    // ---- add data-id property to inline-invoiceBill
                    [...parent.getElementsByClassName('inline-invoiceBill')].forEach((element) => {
                        element.setAttribute('data-id',invoicebillGuid);
                    });

                }
            }
        }

        // ---- populate submission-well
        content='';
        transactions[i]['includedInTaxReturnGuids'].forEach((submissionGuid)=>{
            content+=drawsubmission(submissionGuid);
        });
        [...parent.getElementsByClassName('submission-well')].forEach((element) =>{
            populate(element,content);
        });

        // ---- populate submission-well items
        transactions[i]['includedInTaxReturnGuids'].forEach((submissionGuid)=>{
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
            populate(element,transactions[i]['notes']);
        });

    });


    calcLineitems();
    checkLineitems();
    calcTransactions();
    checkTransactions();

}
