function openEntry(element){
    const parentGuid=getGuidFromElement(element);
    const parentIndex=getIndexFromGuid(parentGuid);
    const parentEntityType=getEntityTypeFromGuid(parentGuid);
    const list=getList(parentEntityType);
    const parent=list[parentIndex];

    // getList(parentEntityType)[parentIndex]['open']=true;

    if(parent['open']===false){
        parent['opening']=true;
        setTimeout(()=>{
            parent['open']=true;
            smoothOpenClose();
        }, .1);
    }else{
        parent['opening']=false;
        setTimeout(()=>{
            parent['open']=false;
            parent['open2']=false;
            smoothOpenClose();
        }, .1);
    }

    refreshPage();

}
//////////////////////////////////////////////////////////////////////////
function unOpenEntry(element){
    // const parentGuid=getGuidFromElement(element);
    // const parentIndex=getIndexFromGuid(parentGuid);
    // const parentEntityType=getEntityTypeFromGuid(parentGuid);
    //
    // // getList(parentEntityType)[parentIndex]['open']=false;
    //
    // setTimeout(()=>{
    //     getList(parentEntityType)[parentIndex]['open']=false;
    //     getList(parentEntityType)[parentIndex]['open2']=false;
    //     smoothOpenClose();
    // }, .1);
    //
    // refreshPage();
}
//////////////////////////////////////////////////////////////////////////
function smoothOpenClose(){
    [...document.getElementsByClassName('transaction')].forEach((parent) => {
        // ---- get the index of this transactions in the transactions object
        const i=getIndexFromGuid(parent.dataset.id);

        // add/remove open class
        transactions[i]['open'] ? parent.classList.add('open') : parent.classList.remove('open');
        transactions[i]['open2'] ? parent.classList.add('open2') : parent.classList.remove('open2');
    });

    [...document.getElementsByClassName('invoice')].forEach((parent) => {
        // ---- get the index of this invoices in the invoices object
        const i=getIndexFromGuid(parent.dataset.id);

        // add/remove open class
        invoices[i]['open'] ? parent.classList.add('open') : parent.classList.remove('open');
        invoices[i]['open2'] ? parent.classList.add('open2') : parent.classList.remove('open2');
    });

    [...document.getElementsByClassName('bill')].forEach((parent) => {
        // ---- get the index of this bills in the bills object
        const i=getIndexFromGuid(parent.dataset.id);

        // add/remove open class
        bills[i]['open'] ? parent.classList.add('open') : parent.classList.remove('open');
        bills[i]['open2'] ? parent.classList.add('open2') : parent.classList.remove('open2');
    });
}
//////////////////////////////////////////////////////////////////////////
function open2Entry(element){
    const parentGuid=getGuidFromElement(element);
    const parentIndex=getIndexFromGuid(parentGuid);
    const parentEntityType=getEntityTypeFromGuid(parentGuid);

    // getList(parentEntityType)[parentIndex]['open']=true;

    setTimeout(()=>{
        getList(parentEntityType)[parentIndex]['open2']=true;
        smoothOpenClose();
    }, .1);


    refreshPage();

}
