function hide(element){
    element.style.display = "none";
    element.classList.remove('missing');
}

/////////////////////////////////////////////

function unhide(element){
    let displayStyle='block';
    if(element.className.includes('row')){displayStyle='flex'}
    if(element.tagName==='SPAN'){displayStyle='inline'}
    if(element.tagName==='I'){displayStyle='inline-block'}
    element.style.display = displayStyle;
}