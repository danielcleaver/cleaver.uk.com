function formatPounds(numbr, accountancyNegatives) {
    // this takes a numbr in the amount and returns a string £ 11,000

    if(numbr==='')return'';

    if(numbr===0)return('£0');

    if(numbr<0){
        if(accountancyNegatives){
            return formatPoundsPence(numbr,true).slice(0, -4)+')';
        }else{
            return formatPoundsPence(numbr).slice(0, -3);
        }

    }
    return formatPoundsPence(numbr).slice(0, -3);

}

////////////////////////////////////////////////////////////////////////
function formatPoundsPence(numbr, accountancyNegatives) {
    // this takes a numbr in the amount and returns a string £ 11,000.00

    if(numbr==='')return'';

    if(numbr===0)return('£0.00');
// console.log(numbr);
    let positive=true;
    let longCurrency='';

    numbr=numbr.toFixed(2);

    if(numbr<0){
        positive=false;
        numbr=Number(-numbr).toFixed(2);
    }

    if(!positive) {
        if(accountancyNegatives){
            longCurrency += '(';
        }else{
            longCurrency += '-';
        }
    }

    longCurrency+='£';

    let value=numbr.toString();

    const groupsOfThree=(Math.ceil((value.length-3)/3))-1;
    const headerFigures=(value.length-3)-(3*groupsOfThree);

    for(let i=0;i<headerFigures;i++){
        longCurrency=longCurrency+value.charAt(i);
    }

    for(let i=0;i<groupsOfThree;i++)
    {
        longCurrency=longCurrency+",";
        longCurrency=longCurrency+value.charAt(headerFigures+(3*i))+value.charAt(headerFigures+(3*i)+1)+value.charAt(headerFigures+(3*i)+2);

    }

    longCurrency=longCurrency+value.charAt(value.length-3)+value.charAt(value.length-2)+value.charAt(value.length-1);

    if(!positive) {
        if(accountancyNegatives){
            longCurrency += ')';
        }
    }

    return longCurrency;
}