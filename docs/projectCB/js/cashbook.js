// function editEntry(id){
//    document.getElementById(id).className=document.getElementById(id).className.replace(" editing",'')+" editing";
//    document.getElementById("row-click-target-"+id).style.display='none';
//    document.getElementById("edit-"+id).style.display='none';
//    document.getElementById("unedit-"+id).style.display='block';
//
//    document.getElementById(id).getElementsByClassName('bottom-label-unpaid')[0].style.display='none';
// }
// /////////////////////////////////////////////
// function uneditEntry(id){
//    document.getElementById(id).className=document.getElementById(id).className.replace(" editing",'');
//    document.getElementById("row-click-target-"+id).style.display='block';
//    document.getElementById("edit-"+id).style.display='block';
//    document.getElementById("unedit-"+id).style.display='none';
//
//    document.getElementById(id).getElementsByClassName('bottom-label-unpaid')[0].style.display='block';
// }
/////////////////////////////////////////////
/////////////////////////////////////////////
function toggleKey(){
   // item=document.getElementById('key-content');
   // if(item.style.display==='block'){
   //    item.style.display='none';
   // }else{
   //    item.style.display='block';
   // }
}
/////////////////////////////////////////////
/////////////////////////////////////////////
// function toggleTier2(id){
//    items=document.getElementById(id).getElementsByClassName('tier2item');
//    if(items[0].style.display==='block'){
//       hideTier2(id);
//    }else{
//       showTier2(id);
//    }
// }
// /////////////////////////////////////////////
// function showTier2(id){
//    items=document.getElementById(id).getElementsByClassName('tier2item');
//    for(var i=0;i<items.length;i++){
//       items[i].style.display='block';
//    }
//    items=document.getElementById(id).getElementsByClassName('tier2itemNegative');
//    for(var i=0;i<items.length;i++){
//       items[i].style.display='none';
//    }
// }
// /////////////////////////////////////////////
// function hideTier2(id){
//    items=document.getElementById(id).getElementsByClassName('tier2item');
//    for(var i=0;i<items.length;i++){
//       items[i].style.display='none';
//    }
//    items=document.getElementById(id).getElementsByClassName('tier2itemNegative');
//    for(var i=0;i<items.length;i++){
//       items[i].style.display='block';
//    }
// }
/////////////////////////////////////////////
function showTier3(id){
   // items=document.getElementById(id).getElementsByClassName('tier3item');
   // for(var i=0;i<items.length;i++){
   //    items[i].style.display='block';
   // }
   // items=document.getElementById(id).getElementsByClassName('tier3itemNegative');
   // for(var i=0;i<items.length;i++){
   //    items[i].style.display='none';
   // }
}
/////////////////////////////////////////////
function hideTier3(id){
   // items=document.getElementById(id).getElementsByClassName('tier3item');
   // for(var i=0;i<items.length;i++){
   //    items[i].style.display='none';
   // }
   // items=document.getElementById(id).getElementsByClassName('tier3itemNegative');
   // for(var i=0;i<items.length;i++){
   //    items[i].style.display='block';
   // }
}
/////////////////////////////////////////////

/////////////////////////////////////////////

function titleClick(){
   // const titleText=document.getElementById('page-title').innerHTML.replaceAll(' ','').replaceAll('\n','');
   // if(titleText==='EntryList'){
   //    switchToInvoiceView();
   // }else{
   //    switchToEntryView();
   // }
}
/////////////////////////////////////////////
function switchToInvoiceView(){
   // document.getElementById('page-title').innerHTML='Invoices';
   // document.getElementById('invoice-list').style.display='block';
   // document.getElementById('entry-list').style.display='none';
   // document.getElementById('summary-numbers-entrys').style.display='none';
   // document.getElementById('summary-numbers-invoices').style.display='flex';

}
/////////////////////////////////////////////
function switchToEntryView(){
   // document.getElementById('page-title').innerHTML='Entry List';
   // document.getElementById('invoice-list').style.display='none';
   // document.getElementById('entry-list').style.display='block';
   // document.getElementById('summary-numbers-entrys').style.display='flex';
   // document.getElementById('summary-numbers-invoices').style.display='none';
}
/////////////////////////////////////////////
function markAsPaid(id){
   // const now=new Date();
   // // Get year, month, and day part from the date
   // const year = now.toLocaleString("default", { year: "numeric" });
   // const month = now.toLocaleString("default", { month: "2-digit" });
   // const day = now.toLocaleString("default", { day: "2-digit" });
   // const today=year+'-'+month+'-'+day;
   // document.getElementById(id+'-itemDate').value=today;
   //
   // //hide paid button
   // document.getElementById('markAsPaid-'+id).style.display='none';
}
/////////////////////////////////////////////
function showLookupList(){
// // instanciate new modal
//    var modal = new tingle.modal({
//       footer: true,
//       stickyFooter: false,
//       closeMethods: ['overlay', 'button', 'escape'],
//       closeLabel: "Close",
//       cssClass: ['custom-class-1', 'custom-class-2'],
//       onOpen: function() {
//          console.log('modal open');
//       },
//       onClose: function() {
//          console.log('modal closed');
//       },
//       beforeClose: function() {
//          // here's goes some logic
//          // e.g. save content before closing the modal
//          return true; // close the modal
//          return false; // nothing happens
//       }
//    });
//
//    // set content
//    var content='<h2 class="mb-3">Known Organisations</h2>';
//
//    content+='<div class="organisations">\n';
//    for (let i=0; i<1;i++){
//       content+='      <div id="organisation-" class="organisation mt-2 pt-2">\n';
//       content+='      <div class="row gx-1 mb-1">\n';
//
//       content+='        <div class="col">';
//       content+='           <h3>PJB DRAINAGE</h3>';
//       content+='        </div>';
//       content+='        <div class="col-auto">';
//       content+='           <div class="delete-organisation" onclick="alert(\'Delete Organisation\')"><i class="fa-solid fa-circle-xmark"></i></div>';
//       content+='        </div>';
//
//       content+='      </div>\n';
//       content+='      <div class="row gx-0 d-flex justify-content-between">\n';
//
//       content+='        <div class="col-auto">';
//       content+='           <div class="top-label">type</div>';
//       content+='              <div class="input-group">\n';
//       content+='                 <select class="form-control" name="type" id="type">\n';
//       content+='                    <option value="">--select (e.g. Sales)--</option>\n';
//       content+='                    <option value="Sales">Sales</option>\n';
//       content+='                    <option value="Sales Refund">Sales Refund</option>\n';
//       content+='                    <option value="Disposal of capital asset">Disposal of capital asset</option>\n';
//       content+='                    <option value="Other money in">Other money in</option>\n';
//       content+='                 </select>\n';
//       content+='              </div>\n';
//       content+='        </div>';
//
//       content+='        <div class="col-auto">';
//       content+='           <div class="top-label">category</div>';
//       content+='              <div class="input-group date">\n';
//       content+='                 <select class="form-control" name="category" id="category">\n';
//       content+='                    <option value="">--select (e.g. Sales)--</option>\n';
//       content+='                    <option value="Sales">Sales</option>\n';
//       content+='                    <option value="Sales Refund">Sales Refund</option>\n';
//       content+='                    <option value="Disposal of capital asset">Disposal of capital asset</option>\n';
//       content+='                    <option value="Other money in">Other money in</option>\n';
//       content+='                 </select>\n';
//       content+='              </div>\n';
//       content+='        </div>';
//
//       content+='        <div class="col-auto">';
//       content+='           <div class="top-label">VAT rate</div>';
//       content+='              <div class="input-group">';
//       content+='                 <input type="text" placeholder="????" class="form-control input-2-5" aria-label="Amount" value="20%">';
//       content+='              </div>';
//       content+='        </div>';
//       content+='      </div>\n';
//       content+='      </div>\n';
//    }
//
//
//
//
//    content+='<h1>content of this not yet complete</h1>';
//
//
//    modal.setContent(content);
//
//    // add a button
//    // modal.addFooterBtn('Cancel', 'btn btn-outline-primary me-3', function() {
//    //    // here goes some logic
//    //    modal.close();
//    // });
//
//    // add another button
//    modal.addFooterBtn('OK', 'btn btn-primary', function() {
//       // here goes some logic
//       modal.close();
//    });
//
//    // open modal
//    modal.open();
}


/////////////////////////////////////////////
function selectClicked(){
   // selectMenu=document.getElementById('select-menu');
   // if(selectMenu.style.display==='block'){
   //    hideSelect();
   // }else{
   //    showSelect();
   // }
}
/////////////////////////////////////////////
function showSelect(){
   // items=document.getElementsByClassName('select-item');
   // for(var i=0;i<items.length;i++){
   //    items[i].style.display='block';
   // }
   // items=document.getElementsByClassName('select-item-negative');
   // for(var i=0;i<items.length;i++){
   //    items[i].style.display='none';
   // }
   // addButton=document.getElementById("add-entry");
   // addButton.disabled = true;
   //
   // closeAllEntrys();
   // openRecommendations();

}
/////////////////////////////////////////////
function hideSelect(){
   // items=document.getElementsByClassName('select-item');
   // for(var i=0;i<items.length;i++){
   //    items[i].style.display='none';
   // }
   // items=document.getElementsByClassName('select-item-negative');
   // for(var i=0;i<items.length;i++){
   //    items[i].style.display='block';
   // }
   // addButton=document.getElementById("add-entry");
   // addButton.disabled = false;
   //
   // closeAllEntrys();
}
/////////////////////////////////////////////
function closeAllEntrys(){
   // items2=document.getElementsByClassName('entry');
   // for(var i=0;i<items2.length;i++){
   //    hideTier2(items2[i].id);
   // }
}
/////////////////////////////////////////////
function openRecommendations(){
   // allItems=document.getElementsByClassName('entry');
   // for(var i=0;i<allItems.length;i++){
   //    // console.log(allItems[i].className);
   //    if(allItems[i].className.includes('has-recommendation')){
   //       showTier2(items2[i].id);
   //    }
   // }
}
/////////////////////////////////////////////
function showMoreSelectionActions(){
   items3=document.getElementsByClassName('more-selection-actions-item');
   for(var i=0;i<items3.length;i++){
      items3[i].style.display='block';
   }
   items3=document.getElementsByClassName('more-selection-actions-item-negative');
   for(var i=0;i<items3.length;i++){
      items3[i].style.display='none';
   }
}
/////////////////////////////////////////////
function hideMoreSelectionActions(){
   items4=document.getElementsByClassName('more-selection-actions-item');
   for(var i=0;i<items4.length;i++){
      items4[i].style.display='none';
   }
   items4=document.getElementsByClassName('more-selection-actions-item-negative');
   for(var i=0;i<items4.length;i++){
      items4[i].style.display='block';
   }
}




