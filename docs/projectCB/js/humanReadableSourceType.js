function humanReadableSourceType(sourceType){
    switch(sourceType){
        case "bankFeed":
            return 'BANK FEED';
        case "csvImport":
            return 'CSV IMPORT';
        case "manual":
            return 'MANUAL ENTRY';
        default:
            return sourceType.toUpperCase();
    }
}