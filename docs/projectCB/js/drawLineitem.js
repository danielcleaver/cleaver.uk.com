function drawLineitem(guid, first){
    let content = '';

    content+='<div data-id="'+guid+'" class="lineitem Xmb-1 ps-0 pe-0 Xp-1 mb-0'+(first?' first-lineitem':'')+'">';
    content+=lineitemXmlDoc;
    content+='</div>';

    return content;
}
////////////////////////////////////////////////////////////////
function drawsubmission(guid){
    let content = '';

    content+='<div data-id="'+guid+'" class="submission xmb-1 xpt-1 xp-2">';
    content+=submissionXmlDoc;
    content+='</div>';

    return content;
}