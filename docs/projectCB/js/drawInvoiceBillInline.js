// ==== LOAD INLINEINVOICEBILL
let inlineInvoiceBillXmlHttp;
let inlineInvoiceBillXmlDoc;

if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    inlineInvoiceBillXmlHttp=new XMLHttpRequest();
}
else{
    // code for IE6, IE5
    inlineInvoiceBillXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
inlineInvoiceBillXmlHttp.open("GET","components/inlineInvoiceBill.html",false);
inlineInvoiceBillXmlHttp.send();
inlineInvoiceBillXmlDoc=inlineInvoiceBillXmlHttp.responseText;



////////////////////////////////////////////////////////////////
function drawInvoiceBillInline(guid){
    let content = '';

    content+='<div data-id="'+guid+'" class="inline-invoiceBill mb-1 xpt-1">';
    content+=inlineInvoiceBillXmlDoc;
    content+='</div>';

    return content;
}