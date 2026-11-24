// ==== LOAD LINEITEM
let lineitemXmlHttp;
let lineitemXmlDoc;

if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    lineitemXmlHttp=new XMLHttpRequest();
}
else{
    // code for IE6, IE5
    lineitemXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
lineitemXmlHttp.open("GET","components/lineitem.html",false);
lineitemXmlHttp.send();
lineitemXmlDoc=lineitemXmlHttp.responseText;


// ==== LOAD submission
let submissionXmlHttp;
let submissionXmlDoc;

if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    submissionXmlHttp=new XMLHttpRequest();
}
else{
    // code for IE6, IE5
    submissionXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
submissionXmlHttp.open("GET","components/submission.html",false);
submissionXmlHttp.send();
submissionXmlDoc=submissionXmlHttp.responseText;


// ==== LOAD transaction
let transactionXmlHttp;
let transactionXmlDoc;

if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    transactionXmlHttp=new XMLHttpRequest();
}
else{
    // code for IE6, IE5
    transactionXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
transactionXmlHttp.open("GET","components/transaction.html",false);
transactionXmlHttp.send();
transactionXmlDoc=transactionXmlHttp.responseText;


// ==== LOAD invoice
let invoiceXmlHttp;
let invoiceXmlDoc;

if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    invoiceXmlHttp=new XMLHttpRequest();
}
else{
    // code for IE6, IE5
    invoiceXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
invoiceXmlHttp.open("GET","components/invoice.html",false);
invoiceXmlHttp.send();
invoiceXmlDoc=invoiceXmlHttp.responseText;


// ==== LOAD bill
let billXmlHttp;
let billXmlDoc;

if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    billXmlHttp=new XMLHttpRequest();
}
else{
    // code for IE6, IE5
    billXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
billXmlHttp.open("GET","components/bill.html",false);
billXmlHttp.send();
billXmlDoc=billXmlHttp.responseText;

// ==== assignTransactionChooser
let assignTransactionChooserXmlHttp;
let assignTransactionChooserXmlDoc;

if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    assignTransactionChooserXmlHttp=new XMLHttpRequest();
}
else{
    // code for IE6, IE5
    assignTransactionChooserXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
assignTransactionChooserXmlHttp.open("GET","components/assignTransactionChooser.html",false);
assignTransactionChooserXmlHttp.send();
assignTransactionChooserXmlDoc=assignTransactionChooserXmlHttp.responseText;

// ==== assignInvoiceChooser
let assignInvoiceChooserXmlHttp;
let assignInvoiceChooserXmlDoc;

if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    assignInvoiceChooserXmlHttp=new XMLHttpRequest();
}
else{
    // code for IE6, IE5
    assignInvoiceChooserXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
assignInvoiceChooserXmlHttp.open("GET","components/assignInvoiceChooser.html",false);
assignInvoiceChooserXmlHttp.send();
assignInvoiceChooserXmlDoc=assignInvoiceChooserXmlHttp.responseText;

// ==== assignBillChooser
let assignBillChooserXmlHttp;
let assignBillChooserXmlDoc;

if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    assignBillChooserXmlHttp=new XMLHttpRequest();
}
else{
    // code for IE6, IE5
    assignBillChooserXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
assignBillChooserXmlHttp.open("GET","components/assignBillChooser.html",false);
assignBillChooserXmlHttp.send();
assignBillChooserXmlDoc=assignBillChooserXmlHttp.responseText;