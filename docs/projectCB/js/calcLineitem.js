function calcLineitems(){
    lineitems.forEach((lineitem) => {
        calcLineitem(lineitem['guid']);
    });
}
////////////////////////////////////////////////////////////////////////////////
function calcLineitem(guid,field){
    // console.log('calcLineitem',guid,field);

    let debug=false;
    if(guid==='33456778-9abb-4cde-bf01-2334567789ab'){
        // debug=true;
    }
    if(debug)console.log(guid);

    const lineitem=[...document.querySelectorAll('[data-id="'+guid+'"]')][0];

    if(!lineitem){
        return;
    }

    // ==== CALCS THAT REQUIRE AN INPUT FIELD
    if(field){

        // ---- CALC VAT

        // input: lineitem-amount-excl-vat
        if(field.classList.contains('lineitem-amount-excl-vat')){

            const rawVatrate=unmakePretty(lineitem.getElementsByClassName('lineitem-transaction-vatrate')[0].value);
            const vatRate=Number(rawVatrate)/100;
            let output=(Number(field.value)*(1+vatRate)).toFixed(2);
            if(rawVatrate==='N/A'){
                output=field.value;
            }
            if(field.value===''){
                output='';
            }
            [...lineitem.getElementsByClassName('lineitem-amount-incl-vat')].forEach((input) =>{
                input.value=makePretty(output);
                lineitemFieldChanged(input,true);
            })
        }

        // input: lineitem-amount-incl-vat
        if(field.classList.contains('lineitem-amount-incl-vat')){
            const rawVatrate=unmakePretty(lineitem.getElementsByClassName('lineitem-transaction-vatrate')[0].value);
            const vatRate=Number(rawVatrate)/100;
            let output=(Number(field.value)/(1+vatRate)).toFixed(2);
            if(rawVatrate==='N/A'){
                output=field.value;
            }
            if(field.value===''){
                output='';
            }
            [...lineitem.getElementsByClassName('lineitem-amount-excl-vat')].forEach((input) =>{
                input.value=makePretty(output);
                lineitemFieldChanged(input,true);
            })
        }

        // input: lineitem-transaction-vatrate
        if(field.classList.contains('lineitem-transaction-vatrate')){
            const rawVatrate=field.value
            let vatRate=Number(rawVatrate)/100;
            if(rawVatrate==='N/A'){
                vatRate=0;
            }
            const amountInclVat=Number(unmakePretty(lineitem.getElementsByClassName('lineitem-amount-incl-vat')[0].value));
            let output=(Number(amountInclVat)/(1+(vatRate))).toFixed(2);
            if(lineitem.getElementsByClassName('lineitem-amount-incl-vat')[0].value===''){
                output='';
            }
            [...lineitem.getElementsByClassName('lineitem-amount-excl-vat')].forEach((input) =>{
                input.value=makePretty(output);
                lineitemFieldChanged(input,true);
            })
        }

    }

    // ==== CALCS THAT DO NOT REQUIRE AN INPUT FIELD

    // input: lineitem-amount-of-vat
    let output='';
    if(
        unmakePretty(lineitem.getElementsByClassName('lineitem-amount-incl-vat')[0].value) !=='' &&
        unmakePretty(lineitem.getElementsByClassName('lineitem-amount-excl-vat')[0].value) !==''
    ){
        const amountInclVat=Number(unmakePretty(lineitem.getElementsByClassName('lineitem-amount-incl-vat')[0].value));
        const amountExclVat=Number(unmakePretty(lineitem.getElementsByClassName('lineitem-amount-excl-vat')[0].value));
        output=(amountInclVat-amountExclVat).toFixed(2);
    }

    [...lineitem.getElementsByClassName('lineitem-amount-of-vat')].forEach((input) =>{
        input.value=makePretty(output);
        lineitemFieldChanged(input,true);
    })


}