function entryTicked(id){
    const index=getEntryIndexFromId(id);
    const entry=document.getElementById('entry-'+id);

    editEntry(id);

    // if(entry.getElementsByClassName('tier2')[0].style.display==='none'){
    //     editEntry(id);
    // }else{
    //     unEditEntry(id);
    // }
}

////////////////////////////////////////////////////////
function editEntry(id){
    let fields;
    const index=getEntryIndexFromId(id);
    const entry=document.getElementById('entry-'+id);

    // hide display
    fields=entry.getElementsByClassName('display');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.display='none'
    }

    // show edit
    fields=entry.getElementsByClassName('edit');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.display='flex'
    }

    return;


    // hide click target
    entry.getElementsByClassName('row-click-target')[0].style.display='none';

    // show tier2
    entry.getElementsByClassName('tier2')[0].style.display='block';

    // unlock fields
    fields=entry.getElementsByTagName('input');
    for(let i=0;i<fields.length;i++){
        fields[i].readOnly=false;
    }

    // deal with currency
    fields=entry.getElementsByClassName('currency');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].value.replace('£ ','');
    }

    // deal with polarities
    fields=entry.getElementsByClassName('polarity-display');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.display='none'
    }
    fields=entry.getElementsByClassName('polarity-edit');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.display='block'
    }

    // deal with sublabels
    fields=entry.getElementsByClassName('sublabel');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.display='none'
    }

    // deal with hide-when-editing
    fields=entry.getElementsByClassName('hide-when-editing');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.display='none'
    }

    // deal with flag-bar
    fields=entry.getElementsByClassName('flag-bar');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.visibility='hidden'
    }

    // deal with bill and invoice amounts
    if(entryData[index]['type']==='bill' || entryData[index]['type']==='invoice' || entryData[index]['type']==='bill_refund' || entryData[index]['type']==='invoice_refund'){
        entry.getElementsByClassName('amount')[0].getElementsByTagName('input')[0].value=entryData[index]['gross-amount'];
        entry.getElementsByClassName('amount')[0].getElementsByClassName('sublabel2')[0].innerHTML='total value';
    }
}
////////////////////////////////////////////////////////
function unEditEntry(id){
    let fields;
    const index=getEntryIndexFromId(id);
    const entry=document.getElementById('entry-'+id);

    // show display
    // entry.getElementsByClassName('display')[0].style.display='flex';
    fields=entry.getElementsByClassName('display');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.display='flex'
    }

    // hide edit
    // entry.getElementsByClassName('edit')[0].style.display='none';
    fields=entry.getElementsByClassName('edit');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.display='none'
    }

    return;


    // show click target
    entry.getElementsByClassName('row-click-target')[0].style.display='block';

    // hide tier2
    entry.getElementsByClassName('tier2')[0].style.display='none';

    // lock fields
    fields=entry.getElementsByTagName('input');
    for(let i=0;i<fields.length;i++){
        fields[i].readOnly=true;
    }

    // deal with currency
    fields=entry.getElementsByClassName('currency');
    for(let i=0;i<fields.length;i++){
        fields[i].value='£ '+fields[i].value;
    }

    // deal with polarities
    fields=entry.getElementsByClassName('polarity-display');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.display='block'
    }
    fields=entry.getElementsByClassName('polarity-edit');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.display='none'
    }

    // deal with sublabels
    fields=entry.getElementsByClassName('sublabel');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.display='block'
    }

    // deal with hide-when-editing
    fields=entry.getElementsByClassName('hide-when-editing');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.display='block'
    }

    // deal with flag-bar
    fields=entry.getElementsByClassName('flag-bar');
    for(let i=0;i<fields.length;i++){
        fields[i].value=fields[i].style.visibility='visible'
    }

    // deal with bill and invoice amounts
    if(entryData[index]['type']==='bill' || entryData[index]['type']==='invoice' || entryData[index]['type']==='bill_refund' || entryData[index]['type']==='invoice_refund'){
        entry.getElementsByClassName('amount')[0].getElementsByTagName('input')[0].value=entryData[index]['amount-outstanding'];
        entry.getElementsByClassName('amount')[0].getElementsByClassName('sublabel2')[0].innerHTML='to be paid';
    }
}
////////////////////////////////////////////////////////
function reversePolarity(id){
    const index=getEntryIndexFromId(id);
    const entry=document.getElementById('entry-'+id);

    let element=entry.getElementsByClassName('polarity-edit')[0].getElementsByTagName('button')[0];

    // console.log(element.innerHTML);
    let symbol='+'
    if(element.innerHTML==='+'){
        symbol='-';
    }
    element.innerHTML=symbol;

    entry.getElementsByClassName('polarity-display')[0].getElementsByClassName('polarity-icon')[0].innerHTML=symbol;
}
