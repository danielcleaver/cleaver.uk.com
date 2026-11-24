function showMore(id){

    let entry=document.getElementById('entry-'+id);

    // more items
    entity=entry.getElementsByClassName('more');
    if(entity){
        [...entity].forEach((element) => element.style.display="flex");
    }
    // more-inverse items
    entity=entry.getElementsByClassName('more-inverse');
    if(entity){
        [...entity].forEach((element) => element.style.display="none");
    }
}

///////////////////////////////////////////////////
///////////////////////////////////////////////////

function showLess(id){

    let entry=document.getElementById('entry-'+id);

    // more items
    entity=entry.getElementsByClassName('more');
    if(entity){
        [...entity].forEach((element) => element.style.display="none");
    }
    // more-inverse items
    entity=entry.getElementsByClassName('more-inverse');
    if(entity){
        [...entity].forEach((element) => element.style.display="flex");
    }
}