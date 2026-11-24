let uuidCounter=0;
//////////////////////////////////////////////////////////////////////////////////////////////////
function getCounteduuidCounter(){
    const value=uuidCounter/10000;
    uuidCounter=uuidCounter+501;
    if(uuidCounter>10000){
        uuidCounter=uuidCounter-10001;
    }
    return value;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = getCounteduuidCounter() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

//////////////////////////////////////////////////////////////////////////////////////////////////
let that;
let removingLineitem;
let lineitems=[];
let transactions=[];
let bills=[];
let invoices=[];
let settings=[];
let flagLabel=['None','Blue','Green','Red','Yellow','Orange','Purple'];
let submissions=[];
let tempEntry=[];
let tempLineitem=[];
let tempLineitems=[];
let blankTransaction=[];
let blankInvoice=[];
let blankBill=[];
let blankLineitem=[];

let transaction=[];
let lineitem=[];
let invoice=[];
let bill=[];
let submission=[];

//////////////////////////////////////////////////////////////////////////////////////////////////

function saveCashbook(){

    saveSettingsToLocalStorage(settings);
    saveTransactionsToLocalStorage(transactions,'transactions');
    saveTransactionsToLocalStorage(invoices,'invoices');
    saveTransactionsToLocalStorage(bills,'bills');
    saveTransactionsToLocalStorage(lineitems,'lineitems');
    saveTransactionsToLocalStorage(submissions,'submissions');

}

//////////////////////////////////////////////////////////////////////////////////////////////////

function loadCashbook(){

    // lineitems=[];
    // transactions=[];
    // bills=[];
    // invoices=[];
    // settings=[];
    // submissions=[];

    if(localStorage.getItem('settings')===null){
        return;
    }

    loadSettingsFromLocalStorage(settings);
    transactions=loadTransactionsFromLocalStorage(transactions,'transactions');
    invoices=loadTransactionsFromLocalStorage(invoices,'invoices');
    bills=loadTransactionsFromLocalStorage(bills,'bills');
    lineitems=loadTransactionsFromLocalStorage(lineitems,'lineitems');
    submissions=loadTransactionsFromLocalStorage(submissions,'submissions');

    refreshPage();
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function resetCashbook(){

    lineitems=[];
    transactions=[];
    bills=[];
    invoices=[];
    settings=[];
    flagLabel=['None','Blue','Green','Red','Yellow','Orange','Purple'];
    submissions=[];
    tempEntry=[];
    tempLineitem=[];
    tempLineitems=[];
    blankTransaction=[];
    blankInvoice=[];
    blankBill=[];
    blankLineitem=[];




// ===============================  setup settings
    settings['showIgnored']=false;

    settings['qeApplyDisabled']=true;
    settings['qeApplyVisible']=false;

    settings['displayMode']='transactions';

    settings['transactionsHaveErrors']=false;
    settings['invoicesHaveErrors']=false;
    settings['billsHaveErrors']=false;

    settings['hasTransactions']=false;
    settings['hasInvoices']=false;
    settings['hasBills']=false;

    settings['invoicesOutstanding']=false;
    settings['billsOutstanding']=false;

    settings['reverseSortOrder']=false;

    settings['colourblindFriendly']=false;

    settings['accountingMethod']='cashbasis'; // 'cashbasis' or 'accrual'

    settings['nextBankfeedDataToImport']=0;

    settings['requestDoNotUsePaperwork']=false;
    settings['doNotUsePaperwork']=false;

    settings['inOnly']=false;
    settings['outOnly']=false;


// override for development
// settings['showIgnored']=true;
// settings['displayMode']='invoices';

// ===============================  setup transactions

    blankTransaction['guid']='';
    blankTransaction['entityType']='transaction';
    blankTransaction['primaryDate']='';
    blankTransaction['confirmed']=false;
    blankTransaction['ready']=false;
    blankTransaction['ignored']=false;
    blankTransaction['sourceType']='';
    blankTransaction['sourceId']='';
    blankTransaction['sourceTransactionId']='';
    blankTransaction['flag']='0';
    blankTransaction['description']='';
    blankTransaction['descriptionDefault']='';
    blankTransaction['amountInclVat']='';
    blankTransaction['amountExclVat']='';
    blankTransaction['amount-incl-vat_alt']='';
    blankTransaction['amountExclVat_alt']='';
    blankTransaction['notes']='';
    blankTransaction['guidsOfChildren']=[];
    blankTransaction['assignedToInvoiceGuid']='';
    blankTransaction['assignedToBillGuid']='';
    blankTransaction['includedInTaxReturnGuids']=[];
    blankTransaction['qe']=true;
    blankTransaction['qe-transaction-type']='';
    blankTransaction['qe-transaction-category']='';
    blankTransaction['qe-transaction-vatrate']='20';
    blankTransaction['qe-transaction-eu']=false;
    blankTransaction['qe-transaction-disallowable']=false;
    blankTransaction['qe-transaction-ignoreConfirm-ticked']=false;
    blankTransaction['qe-transaction-ignoreConfirm']='confirm';
    blankTransaction['open']=false;
    blankTransaction['open2']=false;
    blankTransaction['deletable']=false;
    blankTransaction['editableInline']=false;



    transaction['guid']='ff24144f-a35a-43cd-b208-b072064a2fcc';
    transaction['entityType']='transaction';
    transaction['primaryDate']='2024-10-20';
    transaction['confirmed']=false;
    transaction['ready']=false;
    transaction['ignored']=false;
    transaction['sourceType']='bankFeed';
    transaction['sourceId']='Barclays';
    transaction['sourceTransactionId']='';
    transaction['flag']='0';
    transaction['description']='Pork Pie Company';
    transaction['descriptionDefault']='Pork Pie Company';
    transaction['amountInclVat']=-75.24;
    transaction['amountExclVat']=0;
    transaction['amount-incl-vat_alt']='';
    transaction['amountExclVat_alt']='';
    transaction['notes']='';
    transaction['guidsOfChildren']=['a6f74ac1-fcd5-4062-a979-5403e5fdec12'];
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

    transaction['guid']='925d1bf0-fc7d-47e9-938a-5a26e0efc5f8';
    transaction['entityType']='transaction';
    transaction['primaryDate']='2024-11-24';
    transaction['confirmed']=false;
    transaction['ready']=false;
    transaction['ignored']=false;
    transaction['sourceType']='bankFeed';
    transaction['sourceId']='Barclays';
    transaction['sourceTransactionId']='';
    transaction['flag']='0';
    transaction['description']='Trace\'s Tea Shop';
    transaction['descriptionDefault']='Trace\'s Tea Shop';
    transaction['amountInclVat']=130.12;
    transaction['amountExclVat']=0;
    transaction['amount-incl-vat_alt']='';
    transaction['amountExclVat_alt']='';
    transaction['notes']='';
    transaction['guidsOfChildren']=['1faee9d4-fbd1-4171-b29a-71d4524078bc'];
    transaction['assignedToInvoiceGuid']='';
    transaction['assignedToBillGuid']='';
    transaction['includedInTaxReturnGuids']=[];
    transaction['qe']=true;
    transaction['qe-transaction-type']='sale';
    transaction['qe-transaction-category']='income';
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

// transaction['guid']='fe2734b8-c1c9-4c05-8540-5374fa4ebf1d';
// transaction['entityType']='transaction';
// transaction['primaryDate']='2024-11-29';
// transaction['confirmed']=false;
// transaction['ready']=false;
// transaction['ignored']=false;
// transaction['sourceType']='bankFeed';
// transaction['sourceId']='Barclays';
// transaction['sourceTransactionId']='';
// transaction['flag']='0';
// transaction['description']='UK Water Co.';
// transaction['descriptionDefault']='UK Water Co.';
// transaction['amountInclVat']=-80.73;
// transaction['amountExclVat']=0;
// transaction['amount-incl-vat_alt']='';
// transaction['amountExclVat_alt']='';
// transaction['notes']='';
// transaction['guidsOfChildren']=['487501f5-1168-4966-a86c-4d6f30a09b37'];
// transaction['assignedToInvoiceGuid']='';
// transaction['assignedToBillGuid']='';
// transaction['includedInTaxReturnGuids']=[];
// transaction['qe']=true;
// transaction['qe-transaction-type']='purchase';
// transaction['qe-transaction-category']='utilities_costs';
// transaction['qe-transaction-vatrate']='20';
// transaction['qe-transaction-eu']=false;
// transaction['qe-transaction-disallowable']=false;
// transaction['qe-transaction-ignoreConfirm-ticked']=false;
// transaction['qe-transaction-ignoreConfirm']='confirm';
// transaction['open']=false;
// transaction['open2']=false;
// transaction['deletable']=false;
// transaction['editableInline']=false;
// transactions.push(clone(transaction));  // deep clone this

// transaction['guid']='82d3fab2-467c-4586-a4ab-4c19954e9d47';
// transaction['entityType']='transaction';
// transaction['primaryDate']='2024-12-04';
// transaction['confirmed']=false;
// transaction['ready']=false;
// transaction['ignored']=false;
// transaction['sourceType']='bankFeed';
// transaction['sourceId']='Barclays';
// transaction['sourceTransactionId']='';
// transaction['flag']='0';
// transaction['description']='Green Energy';
// transaction['descriptionDefault']='Green Energy';
// transaction['amountInclVat']=-140.50;
// transaction['amountExclVat']=0;
// transaction['amount-incl-vat_alt']='';
// transaction['amountExclVat_alt']='';
// transaction['notes']='';
// transaction['guidsOfChildren']=['027511a3-5762-4a80-abc4-badb23482f5b'];
// transaction['assignedToInvoiceGuid']='';
// transaction['assignedToBillGuid']='';
// transaction['includedInTaxReturnGuids']=[];
// transaction['qe']=true;
// transaction['qe-transaction-type']='';
// transaction['qe-transaction-category']='';
// transaction['qe-transaction-vatrate']='20';
// transaction['qe-transaction-eu']=false;
// transaction['qe-transaction-disallowable']=false;
// transaction['qe-transaction-ignoreConfirm-ticked']=false;
// transaction['qe-transaction-ignoreConfirm']='confirm';
// transaction['open']=false;
// transaction['open2']=false;
// transaction['deletable']=false;
// transaction['editableInline']=false;
// transactions.push(clone(transaction));  // deep clone this

    transaction['guid']='6e3839ef-c3fd-48b9-8315-c248c66480ef';
    transaction['entityType']='transaction';
    transaction['primaryDate']='2024-10-20';
    transaction['confirmed']=false;
    transaction['ready']=false;
    transaction['ignored']=false;
    transaction['sourceType']='bankFeed';
    transaction['sourceId']='Lloyds';
    transaction['sourceTransactionId']='';
    transaction['flag']='0';
    transaction['description']='Blooming Garden Centre';
    transaction['descriptionDefault']='Blooming Garden Centre';
    transaction['amountInclVat']=300;
    transaction['amountExclVat']=250;
    transaction['amount-incl-vat_alt']='';
    transaction['amountExclVat_alt']='';
    transaction['notes']='';
    transaction['guidsOfChildren']=['d6ea3fe9-3cd9-46b2-bdd0-ff5044171bcd'];
    transaction['assignedToInvoiceGuid']='';
    transaction['assignedToBillGuid']='';
    transaction['includedInTaxReturnGuids']=[];
    transaction['qe']=true;
    transaction['qe-transaction-type']='sale';
    transaction['qe-transaction-category']='income';
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

    transaction['guid']='3d9d9e29-db86-4bbb-916b-c5065f82d15d';
    transaction['entityType']='transaction';
    transaction['primaryDate']='2024-05-01';
    transaction['confirmed']=true;
    transaction['ready']=true;
    transaction['ignored']=false;
    transaction['sourceType']='bankFeed';
    transaction['sourceId']='Lloyds';
    transaction['sourceTransactionId']='';
    transaction['flag']='0';
    transaction['description']='Michaelmas Cheeses';
    transaction['descriptionDefault']='Michaelmas Cheeses';
    transaction['amountInclVat']=600;
    transaction['amountExclVat']=500;
    transaction['amount-incl-vat_alt']='';
    transaction['amountExclVat_alt']='';
    transaction['notes']='';
    transaction['guidsOfChildren']=['568ea3a5-da9b-4cd9-b566-f9a5ee1d13eb'];
    transaction['assignedToInvoiceGuid']='';
    transaction['assignedToBillGuid']='';
    transaction['includedInTaxReturnGuids']=[];
    transaction['qe']=false;
    transaction['qe-transaction-type']='sale';
    transaction['qe-transaction-category']='income';
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

    transaction['guid']='91be44a7-86b4-4564-9d6d-f5ff4279dc59';
    transaction['entityType']='transaction';
    transaction['primaryDate']='2024-10-20';
    transaction['confirmed']=true;
    transaction['ready']=true;
    transaction['ignored']=false;
    transaction['sourceType']='bankFeed';
    transaction['sourceId']='Lloyds';
    transaction['sourceTransactionId']='';
    transaction['flag']='0';
    transaction['description']='BT Wholesale';
    transaction['descriptionDefault']='BT Wholesale';
    transaction['amountInclVat']=-6;
    transaction['amountExclVat']=-5;
    transaction['amount-incl-vat_alt']='';
    transaction['amountExclVat_alt']='';
    transaction['notes']='';
    transaction['guidsOfChildren']=['b4162808-05fc-4ead-9174-58a842c0cc26'];
    transaction['assignedToInvoiceGuid']='';
    transaction['assignedToBillGuid']='';
    transaction['includedInTaxReturnGuids']=[];
    transaction['qe']=false;
    transaction['qe-transaction-type']='sale';
    transaction['qe-transaction-category']='income';
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

    transaction['guid']='25bfc12f-586c-4e1b-a8b8-4371e7d9dd2f';
    transaction['entityType']='transaction';
    transaction['primaryDate']='2024-05-02';
    transaction['confirmed']=false;
    transaction['ready']=false;
    transaction['ignored']=false;
    transaction['sourceType']='bankFeed';
    transaction['sourceId']='Lloyds';
    transaction['sourceTransactionId']='';
    transaction['flag']='0';
    transaction['description']='Michaelmas Cheeses - Refund';
    transaction['descriptionDefault']='';
    transaction['amountInclVat']=-60;
    transaction['amountExclVat']=-50;
    transaction['amount-incl-vat_alt']='';
    transaction['amountExclVat_alt']='';
    transaction['notes']='Customer thought cheese tasted too mild';
    transaction['guidsOfChildren']=['bca33b9f-d209-476d-9981-01284a16c009'];
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




// console.log('transactions',transactions);

// ===============================  setup lineitems

    blankLineitem['guid']='';
    blankLineitem['entityType']='lineitem';
    blankLineitem['primaryDate']='';
    blankLineitem['locked']=false;
    blankLineitem['description']='';
    blankLineitem['amountInclVat']='';
    blankLineitem['amountExclVat']='';
    blankLineitem['amountOfVat']='';
    blankLineitem['vatRate']="20";
    blankLineitem['amount-incl-vat_alt']='';
    blankLineitem['amountExclVat_alt']='';
    blankLineitem['amountOfVat_alt']='';
    blankLineitem['categorisationType']='';
    blankLineitem['categorisationCategory']='';
    blankLineitem['eu']=false;
    blankLineitem['disallowable']=false;
    blankLineitem['guidOfParent']='';
    blankLineitem['guidOfCousins']='';
    blankLineitem['status']='';


    lineitem['guid']='2da86eb9-8011-4a46-a101-51217d0296fe';
    lineitem['entityType']='lineitem';
    lineitem['primaryDate']='2024-12-05';
    lineitem['locked']=false;
    lineitem['description']='Offices services';
    lineitem['amountInclVat']=-147.00;
    lineitem['amountExclVat']=-122.50;
    lineitem['amountOfVat']=-24.5;
    lineitem['vatRate']="20";
    lineitem['amount-incl-vat_alt']='';
    lineitem['amountExclVat_alt']='';
    lineitem['amountOfVat_alt']='';
    lineitem['categorisationType']='';
    lineitem['categorisationCategory']='';
    lineitem['eu']=false;
    lineitem['disallowable']=false;
    lineitem['guidOfParent']='437c8f03-73a9-4050-a12d-7aea0ac73745';
    lineitem['guidOfCousins']='';
    lineitem['guidOfCousins']='';
    lineitem['status']='open';
    lineitems.push(clone(lineitem));  // deep clone this

    lineitem['guid']='a6f74ac1-fcd5-4062-a979-5403e5fdec12';
    lineitem['entityType']='lineitem';
    lineitem['primaryDate']='2024-05-01';
    lineitem['locked']=false;
    lineitem['description']='Pork Pie Company';
    lineitem['amountInclVat']=-75.24;
    lineitem['amountExclVat']=-62.70;
    lineitem['amountOfVat']=-12.54;
    lineitem['vatRate']="20";
    lineitem['amount-incl-vat_alt']='';
    lineitem['amountExclVat_alt']='';
    lineitem['amountOfVat_alt']='';
    lineitem['categorisationType']='';
    lineitem['categorisationCategory']='';
    lineitem['eu']=false;
    lineitem['disallowable']=false;
    lineitem['guidOfParent']='ff24144f-a35a-43cd-b208-b072064a2fcc';
    lineitem['guidOfCousins']='';
    lineitem['guidOfCousins']='';
    lineitem['status']='open';
    lineitems.push(clone(lineitem));  // deep clone this

    lineitem['guid']='1faee9d4-fbd1-4171-b29a-71d4524078bc';
    lineitem['entityType']='lineitem';
    lineitem['primaryDate']='2024-05-01';
    lineitem['locked']=false;
    lineitem['description']='Trace\'s Tea Shop';
    lineitem['amountInclVat']=130.12;
    lineitem['amountExclVat']=108.43;
    lineitem['amountOfVat']=21.69;
    lineitem['vatRate']="20";
    lineitem['amount-incl-vat_alt']='';
    lineitem['amountExclVat_alt']='';
    lineitem['amountOfVat_alt']='';
    lineitem['categorisationType']='sale';
    lineitem['categorisationCategory']='income';
    lineitem['eu']=false;
    lineitem['disallowable']=false;
    lineitem['guidOfParent']='925d1bf0-fc7d-47e9-938a-5a26e0efc5f8';
    lineitem['guidOfCousins']='';
    lineitem['guidOfCousins']='';
    lineitem['status']='open';
    lineitems.push(clone(lineitem));  // deep clone this

    lineitem['guid']='487501f5-1168-4966-a86c-4d6f30a09b37';
    lineitem['entityType']='lineitem';
    lineitem['primaryDate']='2024-05-01';
    lineitem['locked']=false;
    lineitem['description']='UK Water Co.';
    lineitem['amountInclVat']=-80.73;
    lineitem['amountExclVat']=-67.28;
    lineitem['amountOfVat']=-13.46;
    lineitem['vatRate']="20";
    lineitem['amount-incl-vat_alt']='';
    lineitem['amountExclVat_alt']='';
    lineitem['amountOfVat_alt']='';
    lineitem['categorisationType']='purchase';
    lineitem['categorisationCategory']='utilities_costs';
    lineitem['eu']=false;
    lineitem['disallowable']=false;
    lineitem['guidOfParent']='fe2734b8-c1c9-4c05-8540-5374fa4ebf1d';
    lineitem['guidOfCousins']='';
    lineitem['guidOfCousins']='';
    lineitem['status']='open';
    lineitems.push(clone(lineitem));  // deep clone this

    lineitem['guid']='027511a3-5762-4a80-abc4-badb23482f5b';
    lineitem['entityType']='lineitem';
    lineitem['primaryDate']='2024-05-01';
    lineitem['locked']=false;
    lineitem['description']='Green Energy';
    lineitem['amountInclVat']=-140.50;
    lineitem['amountExclVat']=-117.08;
    lineitem['amountOfVat']=23.42;
    lineitem['vatRate']="20";
    lineitem['amount-incl-vat_alt']='';
    lineitem['amountExclVat_alt']='';
    lineitem['amountOfVat_alt']='';
    lineitem['categorisationType']='';
    lineitem['categorisationCategory']='';
    lineitem['eu']=false;
    lineitem['disallowable']=false;
    lineitem['guidOfParent']='82d3fab2-467c-4586-a4ab-4c19954e9d47';
    lineitem['guidOfCousins']='';
    lineitem['guidOfCousins']='';
    lineitem['status']='open';
    lineitems.push(clone(lineitem));  // deep clone this

// lineitem['guid']='2c864e58-56ed-4a32-b95b-280f29bc3b51';
// lineitem['entityType']='lineitem';
// lineitem['primaryDate']='2024-05-01';
// lineitem['locked']=false;
// lineitem['description']='Cheddar';
// lineitem['amountInclVat']=600.00;
// lineitem['amountExclVat']=500.00;
// lineitem['amountOfVat']=100.00;
// lineitem['vatRate']="20";
// lineitem['amount-incl-vat_alt']='';
// lineitem['amountExclVat_alt']='';
// lineitem['amountOfVat_alt']='';
// lineitem['categorisationType']='disposal_of_capital_asset';
// lineitem['categorisationCategory']='income';
// lineitem['eu']=false;
// lineitem['disallowable']=false;
// lineitem['guidOfParent']='b299ca64-a65e-4aef-8050-709cfa9eaa64';
// lineitem['guidOfCousins']='';
// lineitem['guidOfCousins']='ccab749c-6e1c-4dff-a38c-bda6e316c841';
// lineitem['status']='open';
// lineitems.push(clone(lineitem));  // deep clone this
//
// lineitem['guid']='833049b5-fc00-496f-9ac1-42f1e11024d4';
// lineitem['entityType']='lineitem';
// lineitem['primaryDate']='2024-06-25';
// lineitem['locked']=false;
// lineitem['description']='New DAB radio for the store room';
// lineitem['amountInclVat']=-235.44;
// lineitem['amountExclVat']=-196.2;
// lineitem['amountOfVat']=-39.24;
// lineitem['vatRate']="20";
// lineitem['amount-incl-vat_alt']='';
// lineitem['amountExclVat_alt']='';
// lineitem['amountOfVat_alt']='';
// lineitem['categorisationType']='purchase';
// lineitem['categorisationCategory']='computing_and_other_it_costs';
// lineitem['eu']=false;
// lineitem['disallowable']=false;
// lineitem['guidOfParent']='e0049a95-0c11-4622-9f73-1029d8f51489';
// lineitem['guidOfCousins']='';
// lineitem['status']='open';
// lineitems.push(clone(lineitem));  // deep clone this
//
    lineitem['guid']='d6ea3fe9-3cd9-46b2-bdd0-ff5044171bcd';
    lineitem['entityType']='lineitem';
    lineitem['primaryDate']='2024-06-20';
    lineitem['locked']=false;
    lineitem['description']='Olive oil and biscuit tins';
    lineitem['amountInclVat']=300;
    lineitem['amountExclVat']=250;
    lineitem['amountOfVat']=50;
    lineitem['vatRate']="20";
    lineitem['amount-incl-vat_alt']='';
    lineitem['amountExclVat_alt']='';
    lineitem['amountOfVat_alt']='';
    lineitem['categorisationType']='sale';
    lineitem['categorisationCategory']='income';
    lineitem['eu']=false;
    lineitem['disallowable']=false;
    lineitem['guidOfParent']='6e3839ef-c3fd-48b9-8315-c248c66480ef';
    lineitem['guidOfCousins']='';
    lineitem['status']='open';
    lineitems.push(clone(lineitem));  // deep clone this

    lineitem['guid']='568ea3a5-da9b-4cd9-b566-f9a5ee1d13eb';
    lineitem['entityType']='lineitem';
    lineitem['primaryDate']='2024-06-20';
    lineitem['locked']=false;
    lineitem['description']='Cheddar';
    lineitem['amountInclVat']=600;
    lineitem['amountExclVat']=500;
    lineitem['amountOfVat']=100;
    lineitem['vatRate']="20";
    lineitem['amount-incl-vat_alt']='';
    lineitem['amountExclVat_alt']='';
    lineitem['amountOfVat_alt']='';
    lineitem['categorisationType']='sale';
    lineitem['categorisationCategory']='income';
    lineitem['eu']=false;
    lineitem['disallowable']=false;
    lineitem['guidOfParent']='3d9d9e29-db86-4bbb-916b-c5065f82d15d';
    lineitem['guidOfCousins']='';
    lineitem['status']='open';
    lineitems.push(clone(lineitem));  // deep clone this

    lineitem['guid']='b4162808-05fc-4ead-9174-58a842c0cc26';
    lineitem['entityType']='lineitem';
    lineitem['primaryDate']='2024-06-20';
    lineitem['locked']=false;
    lineitem['description']='T1 annual lease';
    lineitem['amountInclVat']=-6;
    lineitem['amountExclVat']=-5.71;
    lineitem['amountOfVat']=-0.29;
    lineitem['vatRate']="5";
    lineitem['amount-incl-vat_alt']='';
    lineitem['amountExclVat_alt']='';
    lineitem['amountOfVat_alt']='';
    lineitem['categorisationType']='purchase';
    lineitem['categorisationCategory']='utilities_costs';
    lineitem['eu']=false;
    lineitem['disallowable']=false;
    lineitem['guidOfParent']='91be44a7-86b4-4564-9d6d-f5ff4279dc59';
    lineitem['guidOfCousins']='';
    lineitem['status']='open';
    lineitems.push(clone(lineitem));  // deep clone this
//
// lineitem['guid']='b9afd748-24f3-4352-ae28-ca53986eae81';
// lineitem['entityType']='lineitem';
// lineitem['primaryDate']='2024-05-02';
// lineitem['locked']=false;
// lineitem['description']='Cheddar';
// lineitem['amountInclVat']=-60;
// lineitem['amountExclVat']=-50;
// lineitem['amountOfVat']=-10;
// lineitem['vatRate']="20";
// lineitem['amount-incl-vat_alt']='';
// lineitem['amountExclVat_alt']='';
// lineitem['amountOfVat_alt']='';
// lineitem['categorisationType']='sale_refund';
// lineitem['categorisationCategory']='income';
// lineitem['eu']=false;
// lineitem['disallowable']=false;
// lineitem['guidOfParent']='1b7ca2f2-4d79-4301-a56a-1e7c7d55ee4a';
// lineitem['guidOfCousins']='ccab749c-6e1c-4dff-a38c-bda6e316c841';
// lineitem['status']='open';
// lineitems.push(clone(lineitem));  // deep clone this
//
    lineitem['guid']='bca33b9f-d209-476d-9981-01284a16c009';
    lineitem['entityType']='lineitem';
    lineitem['primaryDate']='2024-05-02';
    lineitem['locked']=false;
    lineitem['description']='Michaelmas Cheeses - Refund';
    lineitem['amountInclVat']=-60;
    lineitem['amountExclVat']=-50;
    lineitem['amountOfVat']=-10;
    lineitem['vatRate']="20";
    lineitem['amount-incl-vat_alt']='';
    lineitem['amountExclVat_alt']='';
    lineitem['amountOfVat_alt']='';
    lineitem['categorisationType']='';
    lineitem['categorisationCategory']='';
    lineitem['eu']=false;
    lineitem['disallowable']=false;
    lineitem['guidOfParent']='25bfc12f-586c-4e1b-a8b8-4371e7d9dd2f';
    lineitem['guidOfCousins']='';
    lineitem['status']='open';
    lineitems.push(clone(lineitem));  // deep clone this




// ===============================  setup invoices

    blankInvoice['guid']='';
    blankInvoice['entityType']='invoice'; // 'invoice' or 'invoice_refund'
    blankInvoice['primaryDate']='';
    blankInvoice['locked']=false;
    blankInvoice['confirmed']=true;
    blankInvoice['ready']=false;
    blankInvoice['flag']='0';
    blankInvoice['description']='';
    blankInvoice['dueDate']='';
    blankInvoice['outstandingAmount']='';
    blankInvoice['amountInclVat']='';
    blankInvoice['amountExclVat']='';
    blankInvoice['amountOfVat']='';
    blankInvoice['outstandingAmount_alt']='';
    blankInvoice['amount-incl-vat_alt']='';
    blankInvoice['amountExclVat_alt']='';
    blankInvoice['amountOfVat_alt']='';
    blankInvoice['invoiceId']='';
    blankInvoice['frequency']='once';
    blankInvoice['notes']='';
    blankInvoice['guidsOfChildren']=[];
    blankInvoice['assignedTransactionsGuids']=[];
    blankInvoice['includedInTaxReturnGuids']=[];
    blankInvoice['refundGuids']=[];
    blankInvoice['open']=false;
    blankInvoice['open2']=false;


// invoice['guid']='b299ca64-a65e-4aef-8050-709cfa9eaa64';
// invoice['entityType']='invoice';
// invoice['primaryDate']='2024-05-01';
// invoice['locked']=false;
// invoice['confirmed']=true;
// invoice['ready']=false;
// invoice['flag']='0';
// invoice['description']='Supply cheese to Michaelmas Cheeses';
// invoice['dueDate']='2024-06-12';
// invoice['outstandingAmount']=0;
// invoice['amountInclVat']=600.00;
// invoice['amountExclVat']=500.00;
// invoice['amountOfVat']=100.00;
// invoice['outstandingAmount_alt']='';
// invoice['amount-incl-vat_alt']='';
// invoice['amountExclVat_alt']='';
// invoice['amountOfVat_alt']='';
// invoice['invoiceId']='DWIN5222';
// invoice['frequency']='once';
// invoice['notes']='';
// invoice['guidsOfChildren']=['2c864e58-56ed-4a32-b95b-280f29bc3b51'];
// invoice['assignedTransactionsGuids']=['3d9d9e29-db86-4bbb-916b-c5065f82d15d'];
// invoice['includedInTaxReturnGuids']=[];
// invoice['refundGuids']=['1b7ca2f2-4d79-4301-a56a-1e7c7d55ee4a'];
// invoice['open']=false;
// invoice['open2']=false;
// invoices.push(clone(invoice));  // deep clone this
//
// invoice['guid']='1b7ca2f2-4d79-4301-a56a-1e7c7d55ee4a';
// invoice['entityType']='invoice_refund';
// invoice['primaryDate']='2024-05-02';
// invoice['locked']=false;
// invoice['confirmed']=true;
// invoice['ready']=false;
// invoice['flag']='0';
// invoice['description']='Refund for supply cheese to Michaelmas Cheeses';
// invoice['dueDate']='2024-06-12';
// invoice['outstandingAmount']=0;
// invoice['amountInclVat']=60;
// invoice['amountExclVat']=50
// invoice['amountOfVat']=10;
// invoice['outstandingAmount_alt']='';
// invoice['amount-incl-vat_alt']='';
// invoice['amountExclVat_alt']='';
// invoice['amountOfVat_alt']='';
// invoice['invoiceId']='DWIN5222';
// invoice['frequency']='once';
// invoice['notes']='';
// invoice['guidsOfChildren']=['b9afd748-24f3-4352-ae28-ca53986eae81'];
// invoice['assignedTransactionsGuids']=['25bfc12f-586c-4e1b-a8b8-4371e7d9dd2f'];
// invoice['includedInTaxReturnGuids']=[];
// invoice['refundGuids']=['b299ca64-a65e-4aef-8050-709cfa9eaa64'];
// invoice['open']=false;
// invoice['open2']=false;
// invoices.push(clone(invoice));  // deep clone this


// ===============================  setup bills

    blankBill['guid']='';
    blankBill['entityType']='bill'; // 'bill' or 'bill_refund'
    blankBill['primaryDate']='';
    blankBill['locked']=false;
    blankBill['confirmed']=true;
    blankBill['ready']=false;
    blankBill['flag']='0';
    blankBill['description']='';
    blankBill['dueDate']='';
    blankBill['outstandingAmount']='';
    blankBill['amountInclVat']='';
    blankBill['amountExclVat']='';
    blankBill['amountOfVat']='';
    blankBill['outstandingAmount_alt']='';
    blankBill['amount-incl-vat_alt']='';
    blankBill['amountExclVat_alt']='';
    blankBill['amountOfVat_alt']='';
    blankBill['billId']='';
    blankBill['frequency']='once';
    blankBill['notes']='';
    blankBill['guidsOfChildren']=[];
    blankBill['assignedTransactionsGuids']=[];
    blankBill['includedInTaxReturnGuids']=[];
    blankBill['refundGuids']=[];
    blankBill['open']=false;
    blankBill['open2']=false;


// bill['guid']='e0049a95-0c11-4622-9f73-1029d8f51489';
// bill['entityType']='bill';
// bill['primaryDate']='2024-05-28';
// bill['locked']=false;
// bill['confirmed']=true;
// bill['ready']=false;
// bill['flag']='0';
// bill['description']='Sweet Sounds Ltd';
// bill['dueDate']='2024-06-28';
// bill['outstandingAmount']=-540.00;
// bill['amountInclVat']=-600.00;
// bill['amountExclVat']=-500.00;
// bill['amountOfVat']=-100.00;
// bill['outstandingAmount_alt']=0;
// bill['amount-incl-vat_alt']='';
// bill['amountExclVat_alt']='';
// bill['amountOfVat_alt']='';
// bill['billId']='DKC-10223';
// bill['frequency']='once';
// bill['notes']='';
// bill['guidsOfChildren']=['833049b5-fc00-496f-9ac1-42f1e11024d4'];
// bill['assignedTransactionsGuids']=[];
// bill['includedInTaxReturnGuids']=[];
// bill['refundGuids']=[];
// bill['open']=false;
// bill['open2']=false;
// bills.push(clone(bill));  // deep clone this

// ===============================  setup submissions



// submission['guid']='bfa1a188-e2b9-4004-ab7c-dbb8b52ba809';
// submission['entityType']='submission';
// submission['status']='submitted';
// submission['submissionType']='Company 23/24';
// submission['periodStart']='2023-04-06';
// submission['periodEnd']='2024-04-05';
// submission['submissionDate']='2024-06-26';
// submissions.push(clone(submission));  // deep clone this
//
// submission['guid']='850cb179-7235-4850-95e8-4bc2872bc1b9';
// submission['entityType']='submission';
// submission['status']='not-submitted';
// submission['submissionType']='VAT 23/24';
// submission['periodStart']='2023-07-01';
// submission['periodEnd']='2023-09-30';
// submission['submissionDate']='2023-10-12';
// submissions.push(clone(submission));  // deep clone this

}


//////////////////////////////////////////////////////
function clone(array){
    //
    // console.log('original',array);
    // console.log('new',structuredClone(array));

    return(structuredClone(array));
    // return {...array};

}
//////////////////////////////////////////////////////
function fingerprint(guid,fuzzy){
    // if fuzzy is true, it allows _refund types to match non _refund types
    const type=getEntityTypeFromGuid(guid);
    const list=getList(type);
    const index=getIndexFromGuid(guid);
    const element=list[index];

    let fingerprint='';
    switch(type){
        case 'lineitem':
            fingerprint+=element['vatRate'];
            if(fuzzy){
                fingerprint+=element['categorisationType'].replaceAll('_refund','');
            }else{
                fingerprint+=element['categorisationType'];
            }
            fingerprint+=element['categorisationCategory'];
            fingerprint+=element['eu'];
            fingerprint+=element['disallowable'];
            fingerprint+=element['description'].toLowerCase();
            break;
        default:
            console.warn('type not supported by fingerprint')
    }




    return fingerprint;
}
//////////////////////////////////////////////////////
function creditCheck(dateNumber){
    if(dateNumber<20240628000){
        return false;
    }
    return true;
}


resetCashbook();