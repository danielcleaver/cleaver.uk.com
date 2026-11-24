// ==== LOAD INLINETRANSACTION
let inlineTransactionXmlHttp;
let inlineTransactionXmlDoc;

if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    inlineTransactionXmlHttp=new XMLHttpRequest();
}
else{
    // code for IE6, IE5
    inlineTransactionXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
inlineTransactionXmlHttp.open("GET","components/inlineTransaction.html",false);
inlineTransactionXmlHttp.send();
inlineTransactionXmlDoc=inlineTransactionXmlHttp.responseText;



////////////////////////////////////////////////////////////////
function drawTransactionInline(guid){
    let content = '';

    content+='<div data-id="'+guid+'" class="inline-transaction mb-1 xpt-1">';
    content+=inlineTransactionXmlDoc;
    content+='</div>';

    return content;
}