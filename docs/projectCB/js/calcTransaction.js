function calcTransactions(){
    transactions.forEach((transaction) => {
        calcTransaction(transaction['guid']);
    });
}
////////////////////////////////////////////////////////////////////////////////
function calcTransaction(guid){
    let debug=false;
    if(guid==='aabcdeef-0122-4345-a678-9aabcdeff012'){
        // debug=true;
    }

    if(debug)console.log('calc transaction',guid);

    // ---- calculate the totalExclVat and totalInclVat for manual transactions only
    const transaction=transactions[getIndexFromGuid(guid)];
    let totalExclVat='';
    let totalInclVat='';
    // console.log(transaction['guidsOfChildren']);
    transaction['guidsOfChildren'].forEach((lineitemGuid) => {
        const lineitem=lineitems[getIndexFromGuid(lineitemGuid)];
        // console.log(lineitem);
        // console.log(lineitem['guid']);
        // console.log(lineitem['amountExclVat']);
        if(lineitem['amountExclVat']!==''){
            totalExclVat=Number(totalExclVat)+lineitem['amountExclVat'];
        }
        if(lineitem['amountInclVat']!==''){
            totalInclVat=Number(totalInclVat)+lineitem['amountInclVat'];
        }

    });
    if(debug)console.log('totalExclVat',totalExclVat);
    if(debug)console.log('totalInclVat',totalInclVat);
    transaction['amountExclVat']=totalExclVat;
    if(transaction['sourceType']==='manual'){
        // console.log(totalInclVat);
        transaction['amountInclVat']=totalInclVat;
    }

    // ---- if bankfeed or csv, and only 1 lineitem, set the lineitems amountInclVat to the transaction's totalInclVat
    if(
        (transaction['sourceType']==='bankFeed' ||
        transaction['sourceType']==='csv')
        &&
        transaction['guidsOfChildren'].length===1
    ){
        const lineitemGuid=transaction['guidsOfChildren'][0];
        const lineitem=lineitems[getIndexFromGuid(lineitemGuid)];
        lineitem['amountInclVat']=transaction['amountInclVat'];
    }

}

////////////////////////////////////////////////////////////////////////////////
function calcInvoices(){
    invoices.forEach((invoice) => {
        calcInvoice(invoice['guid']);
    });
}
////////////////////////////////////////////////////////////////////////////////
function calcInvoice(guid){
    // console.log('calc invoice:',guid);

    let debug=false;
    if(guid==='b299ca64-a65e-4aef-8050-709cfa9eaa64'){
        // debug=true;
    }
    if(debug)console.log(guid);

    const invoiceIndex=getIndexFromGuid(guid);

    // ---- sum items from lineitems
    let totalInclVat='';
    let totalExclVat='';
    invoices[invoiceIndex]['guidsOfChildren'].forEach((lineitemGuid)=>{
        const lineitemIndex=getIndexFromGuid(lineitemGuid);
        if(lineitems[lineitemIndex]['amountInclVat']!==''){
            totalInclVat=Number(totalInclVat)+lineitems[lineitemIndex]['amountInclVat'];
        }
        if(lineitems[lineitemIndex]['amountExclVat']!==''){
            totalExclVat=Number(totalExclVat)+lineitems[lineitemIndex]['amountExclVat'];
        }
    });

    if(debug)console.log('totalInclVat',totalInclVat);
    if(debug)console.log('totalExclVat',totalExclVat);


    invoices[invoiceIndex]['amountInclVat']=totalInclVat;
    invoices[invoiceIndex]['amountExclVat']=totalExclVat;

    if(totalInclVat!=='' && totalExclVat!==''){
        invoices[invoiceIndex]['amountOfVat']=invoices[invoiceIndex]['amountInclVat']-invoices[invoiceIndex]['amountExclVat'];
    }else{
        invoices[invoiceIndex]['amountOfVat']='';
    }


    // ---- sum items from assigned transactions
    let paidAmount='';
    invoices[invoiceIndex]['assignedTransactionsGuids'].forEach((transactionGuid)=>{
        const transactionIndex=getIndexFromGuid(transactionGuid);
        if(transactions[transactionIndex]['amountInclVat']!==''){
            paidAmount=Number(paidAmount)+transactions[transactionIndex]['amountInclVat'];
        }

    });
    if(invoices[invoiceIndex]['amountInclVat']!==''){
        invoices[invoiceIndex]['outstandingAmount']=invoices[invoiceIndex]['amountInclVat']-Number(paidAmount);
    }else {
        invoices[invoiceIndex]['outstandingAmount']='';
    }


}
////////////////////////////////////////////////////////////////////////////////
function calcBills(){
    bills.forEach((bill) => {
        calcBill(bill['guid']);
    });
}
////////////////////////////////////////////////////////////////////////////////
function calcBill(guid){
    // console.log('calc bill',guid);

    let debug=false;
    if(guid==='e0049a95-0c11-4622-9f73-1029d8f51489'){
        // debug=true;
    }
    if(debug)console.log(guid);

    const billIndex=getIndexFromGuid(guid);

    // ---- sum items from lineitems
    let totalInclVat='';
    let totalExclVat='';
    bills[billIndex]['guidsOfChildren'].forEach((lineitemGuid)=>{
        const lineitemIndex=getIndexFromGuid(lineitemGuid);
        if(lineitems[lineitemIndex]['amountInclVat']!==''){
            totalInclVat=Number(totalInclVat)+lineitems[lineitemIndex]['amountInclVat'];
        }
        if(lineitems[lineitemIndex]['amountExclVat']!==''){
            totalExclVat=Number(totalExclVat)+lineitems[lineitemIndex]['amountExclVat'];
        }
    });

    if(debug)console.log('totalInclVat',totalInclVat);
    if(debug)console.log('totalExclVat',totalExclVat);


    bills[billIndex]['amountInclVat']=totalInclVat;
    bills[billIndex]['amountExclVat']=totalExclVat;

    if(totalInclVat!=='' && totalExclVat!==''){
        bills[billIndex]['amountOfVat']=bills[billIndex]['amountInclVat']-bills[billIndex]['amountExclVat'];
    }else{
        bills[billIndex]['amountOfVat']='';
    }


    // ---- sum items from assigned transactions
    let paidAmount='';
    bills[billIndex]['assignedTransactionsGuids'].forEach((transactionGuid)=>{
        const transactionIndex=getIndexFromGuid(transactionGuid);
        if(transactions[transactionIndex]['amountInclVat']!==''){
            paidAmount=Number(paidAmount)+transactions[transactionIndex]['amountInclVat'];
        }

    });
    if(bills[billIndex]['amountInclVat']!==''){
        bills[billIndex]['outstandingAmount']=bills[billIndex]['amountInclVat']-Number(paidAmount);
    }else {
        bills[billIndex]['outstandingAmount']='';
    }

}
