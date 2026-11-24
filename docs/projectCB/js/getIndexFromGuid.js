function getGuidFromElement(element){
    // console.log(element);
    if(
        element.classList.contains('transaction') ||
        element.classList.contains('lineitem') ||
        element.classList.contains('invoice') ||
        element.classList.contains('bill') ||
        element.classList.contains('submission')
    ){
        // return element.id;
        return element.dataset.id;
    }
    return getGuidFromElement(element.parentNode);
}

////////////////////////////////////////////////////////////////////
function getGuidFromElement_custom(element,classnames){
    // console.log(element);
    let match=false;
    classnames.forEach((classname) => {
        if(element.classList.contains(classname)){
            match=true;
        }
    });
    if(match){
        // return element.id;
        return element.dataset.id;
    }else{
        if(element.classList.contains('page_container')){
            return false;
        }
        return getGuidFromElement_custom(element.parentNode,classnames);
    }

}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function getIndexFromGuid(guid){
    let index;

    index = getIndexFromGuidWorker(lineitems,guid);
    if(index !== -1){
        return index;
    }
    index = getIndexFromGuidWorker(transactions,guid);
    if(index !== -1){
        return index;
    }
    index = getIndexFromGuidWorker(invoices,guid);
    if(index !== -1){
        return index;
    }
    index = getIndexFromGuidWorker(bills,guid);
    if(index !== -1){
        return index;
    }
    index = getIndexFromGuidWorker(submissions,guid);
    if(index !== -1){
        return index;
    }

    return -1;
}

////////////////////////////////////////////////////////////////////

function getIndexFromGuidWorker(listObject,guid){
    for(let i=0;i<listObject.length;i++){
        if(listObject[i]['guid']===guid){
            return i;
        }
    }
    return -1;
}

////////////////////////////////////////////////////////////////////
function getGuidsOfCousins(guid){
    const cousins=[];

    if(guid===''){
        // blank guid - no cousins
        return cousins;
    }

    lineitems.forEach((lineitem) => {
        if(lineitem['guidOfCousins']===guid){
            cousins.push(lineitem['guid']);
        }
    });

    return cousins;
}
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
function getEntityTypeFromGuid(guid){
    let index;

    index = getEntityTypeFromGuidWorker(lineitems,guid);
    if(index !== ''){
        return index;
    }
    index = getEntityTypeFromGuidWorker(transactions,guid);
    if(index !== ''){
        return index;
    }
    index = getEntityTypeFromGuidWorker(invoices,guid);
    if(index !== ''){
        return index;
    }
    index = getEntityTypeFromGuidWorker(bills,guid);
    if(index !== ''){
        return index;
    }
    index = getEntityTypeFromGuidWorker(submissions,guid);
    if(index !== ''){
        return index;
    }

    return '';
}

////////////////////////////////////////////////////////////////////

function getEntityTypeFromGuidWorker(listObject,guid){
    for(let i=0;i<listObject.length;i++){
        if(listObject[i]['guid']===guid){
            return listObject[i]['entityType'];
        }
    }
    return '';
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
function getList(name){
    if(name==='lineitem'){
        return lineitems;
    }
    if(name==='transaction'){
        return transactions;
    }
    if(name==='invoice' || name==='invoice_refund'){
        return invoices;
    }
    if(name==='bill' || name==='bill_refund'){
        return bills;
    }
    if(name==='submission'){
        return submissions;
    }
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////