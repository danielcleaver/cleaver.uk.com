function checkLineitems(){

    lineitems.forEach((lineitem) => {
        checkLineitem(lineitem['guid']);
    });
}
////////////////////////////////////////////////////////////////////////////////
function checkLineitem(guid){
    // console.log('checkLineitem',guid);

    let anyErrors=false;

    // ---- for each copy of this lineitem
    [...document.querySelectorAll('[data-id="'+guid+'"]')].forEach((lineitem) => {

        // ==== reset this lineitem
        lineitem.setAttribute('data-error','false');
        [...lineitem.querySelectorAll('[data-error]')].forEach((item) =>{
            item.setAttribute('data-error','false');
        });

        let lineitemContainsError=false;
        const mandatoryFields=[
            // 'lineitem-description',
            'lineitem-transaction-type',
            'lineitem-transaction-category',
            'lineitem-amount-excl-vat',
            'lineitem-amount-incl-vat',
            'lineitem-transaction-vatrate',

        ];

        mandatoryFields.forEach((fieldname) => {
            [...lineitem.querySelectorAll('input.'+fieldname+',select.'+fieldname)].forEach((input) =>{
                if(input.value===''){
                    if(fieldname==='lineitem-transaction-category'){
                        if( [...lineitem.getElementsByClassName('lineitem-transaction-type')][0].value!==''){
                            input.setAttribute('data-error','true');
                            lineitemContainsError=true;
                        }
                    }else{
                        input.setAttribute('data-error','true');
                        lineitemContainsError=true;
                    }
                }
            });
        });


        if(lineitemContainsError){
            lineitem.setAttribute('data-error','true');
            anyErrors=true;
        }else{
            lineitem.setAttribute('data-error','false');
        }

    });
    // console.log('xxxx checkLineitem',guid,'anyErrors',anyErrors);
    return anyErrors;
}