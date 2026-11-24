function validateFields(){

    // ==== TRANSACTIONS

    const transactionRequiredFields=[
        'qe-transaction-type',
        'qe-transaction-category',
        'qe-transaction-vatrate',
    ];

    for(let identifier=0;identifier<transactions.length;identifier++){

        // let entry=document.getElementById(transactions[identifier]['guid']);

        [...document.querySelectorAll('[data-id="'+transactions[identifier]['guid']+'"]')].forEach((entry) => {

            transactionRequiredFields.forEach((classname) => {
                [...entry.getElementsByClassName(classname)].forEach((element) => {
                    if(element.value===''){
                        if(classname==='qe-transaction-category'){
                            if( [...entry.getElementsByClassName('qe-transaction-type')][0].value!==''){
                                element.classList.add("error-field");
                            }
                        }else{
                            element.classList.add("error-field");
                        }
                    }else{
                        element.classList.remove("error-field");
                    }
                });
            });

        });

    }


}