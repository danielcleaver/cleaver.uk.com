function deleteEntry(identifier){


    if(confirm("Are you sure?")){
        entryData[identifier]['type']='deleted';

        refreshEntryList();
        refreshPageHeaderMenu();
        refreshPageHeaderSummaryBar();
    }





}