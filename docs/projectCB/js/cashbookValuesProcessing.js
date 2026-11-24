function isTransactionReady(transactionIndex){
    // console.log('xxx transactions[transactionIndex][\'confirmed\']',transactions[transactionIndex]['confirmed']);
    // console.log('xxx transactions[transactionIndex][\'primaryDate\']',transactions[transactionIndex]['primaryDate']);
    // console.log('xxx transactions[transactionIndex][\'description\']',transactions[transactionIndex]['description']);
    // console.log('xxx transactions[transactionIndex][\'qe-transaction-type\']',transactions[transactionIndex]['qe-transaction-type']);
    // console.log('xxx transactions[transactionIndex][\'qe-transaction-category\']',transactions[transactionIndex]['qe-transaction-category']);
    // console.log('xxx transactions[transactionIndex][\'qe-transaction-vatrate\']',transactions[transactionIndex]['qe-transaction-vatrate']);
    if(
        transactions[transactionIndex]['confirmed'] === true &&
        transaction['primaryDate'] !=='' &&
        transaction['description'] !=='' &&
        transactions[transactionIndex]['qe-transaction-type'] !=='' &&
        transactions[transactionIndex]['qe-transaction-category'] !=='' &&
        transactions[transactionIndex]['qe-transaction-vatrate'] !==''

    ){
        return true;
    }

    return false;
}