let bankfeedData=[];

let bankfeedDataChunk=[];
let bankfeedDataItem=[];
let bankfeedAmount=[];

// ================= CHUNK 1
bankfeedDataChunk=[];
// ---- transaction 1
bankfeedDataItem['transactionId']='024050701901008-1';
bankfeedDataItem['valueDate']='2024-05-07';
bankfeedAmount['amount']='-15.00';
bankfeedAmount['currency']='GBP';
bankfeedDataItem['transactionAmount']=[];
bankfeedDataItem['transactionAmount'].push(clone(bankfeedAmount));  // deep clone this
bankfeedDataItem['remittanceInformationUnstructured']='PAYMENT Alderaan Coffe';
bankfeedDataChunk.push(clone(bankfeedDataItem));  // deep clone this

// ---- transaction 2
bankfeedDataItem['transactionId']='024050701901007-1';
bankfeedDataItem['valueDate']='2024-05-07';
bankfeedAmount['amount']='45.00';
bankfeedAmount['currency']='GBP';
bankfeedDataItem['transactionAmount']=[];
bankfeedDataItem['transactionAmount'].push(clone(bankfeedAmount));  // deep clone this
bankfeedDataItem['remittanceInformationUnstructured']='For the support of Restoration of the Republic foundation';
bankfeedDataChunk.push(clone(bankfeedDataItem));  // deep clone this

bankfeedData.push(clone(bankfeedDataChunk));  // deep clone this


// ================= CHUNK 2
bankfeedDataChunk=[];
// ---- transaction 1
bankfeedDataItem['transactionId']='024050701901008-2';
bankfeedDataItem['valueDate']='2024-05-07';
bankfeedAmount['amount']='-15.00';
bankfeedAmount['currency']='GBP';
bankfeedDataItem['transactionAmount']=[];
bankfeedDataItem['transactionAmount'].push(clone(bankfeedAmount));  // deep clone this
bankfeedDataItem['remittanceInformationUnstructured']='PAYMENT Alderaan Coffe';
bankfeedDataChunk.push(clone(bankfeedDataItem));  // deep clone this

// ---- transaction 2
bankfeedDataItem['transactionId']='024050701901007-2';
bankfeedDataItem['valueDate']='2024-05-07';
bankfeedAmount['amount']='45.00';
bankfeedAmount['currency']='GBP';
bankfeedDataItem['transactionAmount']=[];
bankfeedDataItem['transactionAmount'].push(clone(bankfeedAmount));  // deep clone this
bankfeedDataItem['remittanceInformationUnstructured']='For the support of Restoration of the Republic foundation';
bankfeedDataChunk.push(clone(bankfeedDataItem));  // deep clone this

bankfeedData.push(clone(bankfeedDataChunk));  // deep clone this


//////////////////////////////////////////////////////////////////////////////////////////////////
function importBankfeedClicked(){


    if(settings['nextBankfeedDataToImport']>=bankfeedData.length-1){
        document.getElementById('demo_import_bankfeed').disabled=true;
    }

    settings['nextBankfeedDataToImport']++;
    refreshDemoControls();
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function importBankfeed2Clicked(){

    transaction['guid']='437c8f03-73a9-4050-a12d-7aea0ac73745';
    transaction['entityType']='transaction';
    transaction['primaryDate']='2024-12-05';
    transaction['confirmed']=false;
    transaction['ready']=false;
    transaction['ignored']=false;
    transaction['sourceType']='bankFeed';
    transaction['sourceId']='Barclays';
    transaction['sourceTransactionId']='';
    transaction['flag']='0';
    transaction['description']='Offices services';
    transaction['descriptionDefault']='Offices services';
    transaction['amountInclVat']=-147.00;
    transaction['amountExclVat']=0;
    transaction['amount-incl-vat_alt']='';
    transaction['amountExclVat_alt']='';
    transaction['notes']='';
    transaction['guidsOfChildren']=['2da86eb9-8011-4a46-a101-51217d0296fe'];
    transaction['assignedToInvoiceGuid']='';
    transaction['assignedToBillGuid']='';
    transaction['includedInTaxReturnGuids']=[];
    transaction['qe']=true;
    transaction['qe-transaction-type']='';
    transaction['qe-transaction-category']='';
    transaction['qe-transaction-vatrate']='20';
    transaction['qe-transaction-eu']=false;
    transaction['qe-transaction-disallowable']=false;
    transaction['qe-transaction-ignoreConfirm-ticked']=false;
    transaction['qe-transaction-ignoreConfirm']='confirm';
    transaction['open']=false;
    transaction['open2']=false;
    transaction['deletable']=false;
    transaction['editableInline']=false;
    transactions.push(clone(transaction));  // deep clone this

    transaction['guid']='fe2734b8-c1c9-4c05-8540-5374fa4ebf1d';
    transaction['entityType']='transaction';
    transaction['primaryDate']='2024-11-29';
    transaction['confirmed']=false;
    transaction['ready']=false;
    transaction['ignored']=false;
    transaction['sourceType']='bankFeed';
    transaction['sourceId']='Barclays';
    transaction['sourceTransactionId']='';
    transaction['flag']='0';
    transaction['description']='UK Water Co.';
    transaction['descriptionDefault']='UK Water Co.';
    transaction['amountInclVat']=-80.73;
    transaction['amountExclVat']=0;
    transaction['amount-incl-vat_alt']='';
    transaction['amountExclVat_alt']='';
    transaction['notes']='';
    transaction['guidsOfChildren']=['487501f5-1168-4966-a86c-4d6f30a09b37'];
    transaction['assignedToInvoiceGuid']='';
    transaction['assignedToBillGuid']='';
    transaction['includedInTaxReturnGuids']=[];
    transaction['qe']=true;
    transaction['qe-transaction-type']='purchase';
    transaction['qe-transaction-category']='utilities_costs';
    transaction['qe-transaction-vatrate']='20';
    transaction['qe-transaction-eu']=false;
    transaction['qe-transaction-disallowable']=false;
    transaction['qe-transaction-ignoreConfirm-ticked']=false;
    transaction['qe-transaction-ignoreConfirm']='confirm';
    transaction['open']=false;
    transaction['open2']=false;
    transaction['deletable']=false;
    transaction['editableInline']=false;
    transactions.push(clone(transaction));  // deep clone this

    transaction['guid']='82d3fab2-467c-4586-a4ab-4c19954e9d47';
    transaction['entityType']='transaction';
    transaction['primaryDate']='2024-12-04';
    transaction['confirmed']=false;
    transaction['ready']=false;
    transaction['ignored']=false;
    transaction['sourceType']='bankFeed';
    transaction['sourceId']='Barclays';
    transaction['sourceTransactionId']='';
    transaction['flag']='0';
    transaction['description']='Green Energy';
    transaction['descriptionDefault']='Green Energy';
    transaction['amountInclVat']=-140.50;
    transaction['amountExclVat']=0;
    transaction['amount-incl-vat_alt']='';
    transaction['amountExclVat_alt']='';
    transaction['notes']='';
    transaction['guidsOfChildren']=['027511a3-5762-4a80-abc4-badb23482f5b'];
    transaction['assignedToInvoiceGuid']='';
    transaction['assignedToBillGuid']='';
    transaction['includedInTaxReturnGuids']=[];
    transaction['qe']=true;
    transaction['qe-transaction-type']='';
    transaction['qe-transaction-category']='';
    transaction['qe-transaction-vatrate']='20';
    transaction['qe-transaction-eu']=false;
    transaction['qe-transaction-disallowable']=false;
    transaction['qe-transaction-ignoreConfirm-ticked']=false;
    transaction['qe-transaction-ignoreConfirm']='confirm';
    transaction['open']=false;
    transaction['open2']=false;
    transaction['deletable']=false;
    transaction['editableInline']=false;
    transactions.push(clone(transaction));  // deep clone this



    document.getElementById('demo_import_bankfeed2').disabled=true;

}