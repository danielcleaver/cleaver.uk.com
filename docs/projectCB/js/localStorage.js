function saveSettingsToLocalStorage(thing){
    // console.log(thing);

    const label="settings";

    const newArr = Object.keys(thing).map(function (key) {
        let obj = {};
        obj[key] = thing[key];
        return obj;
    });

    const outgoingJson=JSON.stringify(newArr)

    localStorage.setItem(label,outgoingJson);

    const incomingObject=JSON.parse(localStorage.getItem(label));


    incomingObject.forEach(function (element) {
        thing[Object.keys(element)[0]]=element[Object.keys(element)[0]];
    });
    // console.log(thing);
}

////////////////////////////////////////////////////////////
function loadSettingsFromLocalStorage(thing){
    const label="settings";

    const incomingObject=JSON.parse(localStorage.getItem(label));

    incomingObject.forEach(function (element) {
        thing[Object.keys(element)[0]]=element[Object.keys(element)[0]];
    });


}


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
function saveTransactionsToLocalStorage(thing,label){
    // console.log(thing);

    const newArray=[];

    thing.forEach(function (element) {
        newArray.push(
            Object.keys(element).map(function (key) {
                let obj = {};
                obj[key] = element[key];
                return obj;
            })
        )
    });

    const outgoingJson=JSON.stringify(newArray);

    localStorage.setItem(label,outgoingJson);

    const incomingObject=JSON.parse(localStorage.getItem(label));

    for(let i=0;i<incomingObject.length;i++){
        incomingObject[i].forEach(function (element) {
            thing[i][Object.keys(element)[0]]=element[Object.keys(element)[0]];
        })
    }


    // console.log(thing);

}

////////////////////////////////////////////////////////////

function loadTransactionsFromLocalStorage(thing,label){

    thing=[];

    const incomingObject=JSON.parse(localStorage.getItem(label));

    // if(label==="lineitems")console.log(incomingObject);

    for(let i=0;i<incomingObject.length;i++){

        if(label==="transactions"){thing[i]=clone(blankTransaction)}
        if(label==="invoices"){thing[i]=clone(blankInvoice)}
        if(label==="bills"){thing[i]=clone(blankBill)}
        if(label==="lineitems"){thing[i]=clone(blankLineitem)}
        // thing[i]=[];

        // if(label==="lineitems")console.log(i);

        incomingObject[i].forEach(function (element) {
            // console.log(Object.keys(element)[0],element[Object.keys(element)[0]]);
            thing[i][Object.keys(element)[0]]=element[Object.keys(element)[0]];
        })
    }

    // if(label==="lineitems")console.log(thing);

    return(thing);
    // if(label==="transactions")console.log(transactions);
}
