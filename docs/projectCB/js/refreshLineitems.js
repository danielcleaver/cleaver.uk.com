function refreshLineitems(){
    // console.log('=== Refresh lineitems');
    // ==== set properties for the entire lineitem list

    // ==== go through all lineitems
    [...document.getElementsByClassName('lineitem')].forEach((lineitem) => {

        // ---- get the index of this lineitems in the lineitems object
        const lineitemGuid=lineitem.dataset.id;
        // console.log('========= lineitemGuid',lineitemGuid);

        const lineitemIndex = getIndexFromGuid(lineitemGuid);
        if(lineitemIndex===-1){return}


        // console.log('lineitem',lineitem);

        const parentGuid=lineitems[lineitemIndex]['guidOfParent'];
        // console.log('parentGuid',parentGuid);

        const parentEntityType=getEntityTypeFromGuid(parentGuid);
        // console.log('parentEntityType',parentEntityType);

        const parentList=getList(parentEntityType);
        // console.log('parentList',parentList);

        const parentIndex=getIndexFromGuid(parentGuid);
        // console.log('parentIndex',parentIndex);

        const firstLineitemGuidOfParent=parentList[parentIndex]['guidsOfChildren'][0];
        // console.log('firstLineitemGuidOfParent',firstLineitemGuidOfParent);

        const isFirstLineitemOfParent = firstLineitemGuidOfParent===lineitemGuid;
        // console.log('isFirstLineitemOfParent',isFirstLineitemOfParent);

        const firstLineItemIndexOfParent=getIndexFromGuid(firstLineitemGuidOfParent);
        // console.log('firstLineItemIndexOfParent',firstLineItemIndexOfParent);

        const firstLineItemTypeGroup=getTypeGroup(lineitems[firstLineItemIndexOfParent]['categorisationType']);
        // console.log('firstLineItemTypeGroup',firstLineItemTypeGroup);

        let restrictTypesTo='';
        if(!isFirstLineitemOfParent){
            restrictTypesTo=firstLineItemTypeGroup;
        }

        const parentType=parentList[parentIndex]['entityType'];
        // console.log('parentType',parentType);

        if(parentType==='transaction'){
            if(parentList[parentIndex]['assignedToInvoiceGuid']!==''){
                const parentInvoiceIndex=getIndexFromGuid(parentList[parentIndex]['assignedToInvoiceGuid']);
                if(invoices[parentInvoiceIndex]['entityType']==='invoice'){
                    restrictTypesTo='for_invoice';
                }
                if(invoices[parentInvoiceIndex]['entityType']==='invoice_refund'){
                    restrictTypesTo='for_invoice_refund';
                }
            }
            if(parentList[parentIndex]['assignedToBillGuid']!==''){
                const parentBillIndex=getIndexFromGuid(parentList[parentIndex]['assignedToBillGuid']);
                if(bills[parentBillIndex]['entityType']==='bill'){
                    restrictTypesTo='for_bill';
                }
                if(bills[parentBillIndex]['entityType']==='bill_refund'){
                    restrictTypesTo='for_bill_refund';
                }
            }
        }

        if(parentType==='invoice'){
            restrictTypesTo='for_invoice';
        }
        if(parentType==='invoice_refund'){
            restrictTypesTo='for_invoice_refund';
        }
        if(parentType==='bill'){
            restrictTypesTo='for_bill';
        }
        if(parentType==='bill_refund'){
            restrictTypesTo='for_bill_refund';
        }


        // ======== add classes to the lineitem
        // add/remove has-cousin
        lineitems[lineitemIndex]['guidOfCousins']!=='' ? lineitem.classList.add('has-cousins') :  lineitem.classList.remove('has-cousins');

        // ======== populate fields

        // ---- populate lineitem-description
        [...lineitem.getElementsByClassName('lineitem-description')].forEach((element) =>{populate(element,lineitems[lineitemIndex]['description']);});

        // ---- populate lineitem-amount-excl-vat
        [...lineitem.getElementsByClassName('lineitem-amount-excl-vat')].forEach((element) =>{
            populate(element,formatPoundsPence(lineitems[lineitemIndex]['amountExclVat']));
        });

        // ---- populate lineitem-amount-incl-vat
        [...lineitem.getElementsByClassName('lineitem-amount-incl-vat')].forEach((element) =>{
            populate(element,formatPoundsPence(lineitems[lineitemIndex]['amountInclVat']));
        });

        // ---- populate lineitem-amount-of-vat
        [...lineitem.getElementsByClassName('lineitem-amount-of-vat')].forEach((element) =>{
            populate(element,formatPoundsPence(lineitems[lineitemIndex]['amountOfVat']));
        });

        // ---- populate lineitem-transaction-type
        [...lineitem.getElementsByClassName('lineitem-transaction-type')].forEach((element) =>{

            if(restrictTypesTo===''){
                element.innerHTML=getTypes(lineitems[lineitemIndex]['amountInclVat']);
            }else{
                element.innerHTML=getTypes(lineitems[lineitemIndex]['amountInclVat'],false,restrictTypesTo);
            }

            populate(element,lineitems[lineitemIndex]['categorisationType']);

            //disable category if type is not set
            if(lineitems[lineitemIndex]['categorisationType'] ==='') {
                [...lineitem.getElementsByClassName('lineitem-transaction-category')].forEach((element) => {
                    element.disabled=true;
                });
            }
        });

        // ---- populate lineitem-transaction-category
        [...lineitem.getElementsByClassName('lineitem-transaction-category')].forEach((element) =>{
            element.innerHTML=getCategories([...lineitem.getElementsByClassName('lineitem-transaction-type')][0].value);
            populate(element,lineitems[lineitemIndex]['categorisationCategory']);
        });

        // ---- populate lineitem-transaction-vatrate
        [...lineitem.getElementsByClassName('lineitem-transaction-vatrate')].forEach((element) =>{
            element.innerHTML=getVatrates();
            populate(element,lineitems[lineitemIndex]['vatRate']);
        });

        // ---- populate lineitem-eu
        [...lineitem.getElementsByClassName('lineitem-eu')].forEach((element) =>{
            populate(element,lineitems[lineitemIndex]['eu']);
        });

        // ---- populate lineitem-disallowable
        [...lineitem.getElementsByClassName('lineitem-disallowable')].forEach((element) =>{
            populate(element,lineitems[lineitemIndex]['disallowable']);
        });


        const guid=lineitems[lineitemIndex]['guid']
        calcLineitem(guid);
        checkLineitem(guid);


        if(lineitems[lineitemIndex]['status']===''){
            // newly created
            setTimeout(()=>{lineitems[lineitemIndex]['status']='open';lineitem.classList.add('open3')}, .1);
        }

        if(lineitems[lineitemIndex]['status']==='open'){
            // open
            lineitem.classList.add('open3');
            lineitems[lineitemIndex]['status']='open';
        }
        if(lineitems[lineitemIndex]['status']==='closing'){
            // closing
            lineitem.classList.add('open3');
            lineitems[lineitemIndex]['status']='open';
            setTimeout(()=>{lineitems[lineitemIndex]['status']='closed';lineitem.classList.remove('open3')}, 1);
        }

    });

}