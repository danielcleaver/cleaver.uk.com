function closeAllLedgerEntries(listName){

    const list=getList(listName);
    list.forEach((entry) => {
        entry['open']=false;
        entry['open2']=false;
    });

}