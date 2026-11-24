function makeDateHumanReadable(input){
    // this function takes a date in format yyyy-mm-dd and returns dd/mm/yyyy

    const dateParts=input.split('-');
    const result=dateParts[2]+'/'+dateParts[1]+'/'+dateParts[0];

    return result;
}
//////////////////////////////////////
function makeDateHumanReadableShort(input){
    // this function takes a date in format yyyy-mm-dd and returns dd/mm/yy

    const dateParts=input.split('-');
    const result=dateParts[2]+'/'+dateParts[1]+'/'+dateParts[0].substring(2);

    return result;

}