function addEntry(identifier) {
    // let content='';
    //
    // let deletable=false;
    // if(
    //     (entryData[identifier]['type']==='transaction' && entryData[identifier]['source-type']==='manual') ||
    //     entryData[identifier]['type']==='invoice' ||
    //     entryData[identifier]['type']==='bill'
    // ){
    //     deletable=true;
    // }
    //
    // // ===========================
    // // ===========================
    // // ============= TRANSACTIONS
    // // ===========================
    // // ===========================
    // if(entryData[identifier]['type']==='transaction'){
    //
    //     // start this row
    //     content+='<div id="entry-'+entryData[identifier]['guid']+'" class="row gx-0 entry mb-2 entry-status-'+entryData[identifier]['status']+'">';
    //
    //     // ===========================
    //     // ============= start DISPLAY
    //     // ===========================
    //
    //     content+='<div class="row gx-0 display position-relative">';
    //
    //     // content
    //     content+='    <div class="col p-2 pb-0">';
    //
    //     // content first row
    //     content+='       <div class="row gx-0">';
    //
    //     // ignored
    //     content+='          <div class="col-auto ignored">';
    //     content+='          </div>';
    //
    //     // title
    //     content+='          <div class="col title">';
    //     // content+=entryData[identifier]['description'];
    //     content+='          </div>';
    //
    //     content+='          <div class="col-auto polarity">';
    //     // content+='-';
    //     content+='          </div>';
    //
    //     // amount
    //     content+='          <div class="col-auto amount">';
    //     content+='          </div>';
    //
    //
    //     // end content first row
    //     content+='       </div>';
    //
    //     // Second row for transactions that are not confirmed and not ignored
    //     if(entryData[identifier]['status']!=='confirmed' && entryData[identifier]['ignored']!=='true'){
    //         // content second row
    //         content+='       <div class="row gx-0 recommendation-row">';
    //
    //
    //         content+='          <div class="col-sm">';
    //
    //         content+='             <div class="row gx-1 p-1 pb-0 ps-0 d-flex align-items-top small">';
    //         // transaction-type
    //         content+='                <div class="col-auto">';
    //         content+=transactionTypeSelector(identifier,'-recommendation');
    //         content+='                </div>';
    //         // transaction-category
    //         content+='                    <div class="col-auto">';
    //         content+=transactionCategorySelector(identifier,'-recommendation');
    //         content+='                    </div>';
    //
    //         // transaction vat-rate
    //         content+='                    <div class="col-auto">';
    //         content+=transactionVatSelector(identifier,'-recommendation');
    //         content+='                    </div>';
    //
    //         content+='             </div>';
    //
    //         content+='          </div>';
    //
    //         content+='          <div class="col-sm-auto">';
    //
    //         content+='             <div class="row gx-0 Xp-1 Xps-2 Xpb-0 d-flex align-items-top justify-content-end">';
    //
    //         content+='<div class="d-flex ignore-confirm-wrapper width-9-char">';
    //
    //         content+='                <div class="col-auto me-1  ">';
    //         content+=ignoreConfirmSelector(identifier,'-recommendation');
    //         content+='                </div>';
    //         content+='                <div class="col-auto">';
    //         content+='                   <input type="checkbox" class="form-check-input m-0 ignoreConfirmTickbox" onchange="ignoreConfirmTickboxChanged(\''+identifier+'\',this.checked)">';
    //         content+='                </div>';
    //
    //         content+='</div>';
    //
    //         content+='             </div>';
    //
    //         content+='          </div>';
    //         content+='       </div>';
    //
    //     }
    //
    //     // content third row
    //     content+='       <div class="row gx-0 mb-1">';
    //
    //     // display summary
    //     if(entryData[identifier]['status']==='confirmed'){
    //         content+='          <div class="col display-summary smaller mt-1">';
    //         content+=formatTransactionType(entryData[identifier]['transaction-type']);
    //         content+=' &bull; ';
    //         content+=formatTransactionType(entryData[identifier]['transaction-category']);
    //         content+=' &bull; ';
    //         content+='VAT '+entryData[identifier]['vat-rate']+'%';
    //         content+='          </div>';
    //     }
    //
    //     // invoice link
    //     if(settings['hasInvoices']) {
    //
    //         if(entryData[identifier]['status']==='confirmed'){
    //             // confirmed items with links to invoice should display that link bottom right
    //             if(entryData[identifier]['link']!==''){
    //                 // assigned link
    //                 content+='          <div class="col-auto smaller link">';
    //                 content+='             <a href="#0" class="z10" onclick="alert(\'jump to invoices list with linked invoice scrolled to top and expanded\')">assigned to invoice</a>';
    //                 content+='          </div>'
    //             }else{
    //                 // confirmed items must have a link so nothing here
    //             }
    //         }else{
    //             if(entryData[identifier]['link']!==''){
    //                 // unconfirmed items with link should display that link bottom left
    //                 content+='          <div class="col-auto smaller link">';
    //                 content+='             <a href="#0" class="z10" onclick="alert(\'jump to invoices list with linked invoice scrolled to top and expanded\')">assigned to invoice</a>';
    //                 content+='          </div>'
    //             }else{
    //                 // unconfirmed items without link should display that link bottom left
    //                 content+='          <div class="col-auto smaller link">';
    //                 content+='             <a href="#0" class="z10" onclick="alert(\'show modal dialogue: list of invoices with amounts outstanding, and ability to choose one\')">ASSIGN TO INVOICE</a>';
    //                 content+='          </div>'
    //             }
    //         }
    //
    //     }
    //
    //     // end content third row
    //     content+='       </div>';
    //
    //     // end content
    //     content+='    </div>';
    //
    //     // flag
    //     content+='    <div class="col-auto d-flex align-items-stretch">';
    //     content+='        <div class="flag-bar">';
    //     content+='        </div>';
    //     content+='    </div>';
    //
    //     // add click target
    //     // click target
    //     content+='        <div id="row-click-target-'+entryData[identifier]['guid']+'" class="row-click-target" onclick="editEntry(\''+entryData[identifier]['guid']+'\')"></div>';
    //
    //     content+='</div>';
    //
    //     // ===========================
    //     // ============= DISPLAY ended
    //     // ===========================
    //
    //
    //     // ===========================
    //     // ============= start EDIT
    //     // ===========================
    //
    //     content+='<div class="row gx-0 edit pb-2 ps-sm-2 pe-sm-2" style="display:none;">';
    //
    //     // entry label
    //     content+='<div class="row gx-0 entry-section-label ps-1 ps-sm-0 pe-1 pe-sm-0 align-items-end justify-content-between">';
    //     content+='   <div class="col-auto">';
    //     content+='      transaction';
    //     content+='   </div>';
    //     content+='   <div class="col-auto guid quiet-link">';
    //     content+='      <a href="#0" onclick="navigator.clipboard.writeText(\''+entryData[identifier]['guid']+'\');">'+entryData[identifier]['guid']+'</a>';
    //     content+='   </div>';
    //     content+='</div>';
    //
    //     // entry core
    //     content+='<div class="row gx-0 Xsedit entry-core">';
    //
    //     // end bar
    //     content+='    <div class="col-auto d-flex align-items-stretch">';
    //     content+='        <div class="end-bar text-center pt-1 pb-1">'
    //     label='';
    //     if(entryData[identifier]['source-type']==='bank-feed'){
    //         label+='BANK FEED '+entryData[identifier]['source-id'];
    //     }
    //     if(entryData[identifier]['source-type']==='csv-import'){
    //         label+='CSV IMPORT';
    //     }
    //     if(entryData[identifier]['source-type']==='manual'){
    //         label+='MANUAL ENTRY';
    //     }
    //     // label='&nbsp;';
    //     content+=label;
    //     content+='        </div>';
    //     content+='    </div>';
    //
    //     // end bar arrow
    //     content+='    <div class="col-auto d-flex align-items-stretch">';
    //     content+='        <div class="end-bar-arrow-box">';
    //     content+='            <div class="end-bar-arrow-box-up"></div>';
    //     content+='            <div class="end-bar-arrow-box-down"></div>';
    //     content+='        </div>';
    //     content+='    </div>';
    //
    //     // content
    //     content+='    <div class="col p-2 pb-0">';
    //
    //     // content first row
    //     content+='       <div class="row gx-1 align-items-end">';
    //
    //     // date
    //     content+='          <div class="col-auto">';
    //     content+='              <div class="top-label ms-1">payment date</div>';
    //     content+='              <input type="date" class="form-control m-0 width-8-char" id="'+entryData[identifier]['guid']+'-date" value="'+entryData[identifier]['date']+'">';
    //     content+='          </div>';
    //
    //     // description
    //     content+='          <div class="col">';
    //     content+='              <div class="top-label ms-1">description</div>';
    //     content+='              <input type="text" class="form-control m-0" id="'+entryData[identifier]['guid']+'-name" value="'+entryData[identifier]['description']+'">';
    //     content+='          </div>';
    //
    //     // negative symbol
    //     // let invisible='';
    //     // if(entryData[identifier]['polarity']==='incoming'){
    //     //     invisible=' invisible';
    //     // }
    //     content+='          <div class="col-auto p-0">';
    //     content+='              <input type="text" readonly class="form-control m-0 p-0 width-1-char text-end polarity" id="'+entryData[identifier]['guid']+'-polarity" value="-">';
    //     content+='          </div>';
    //
    //     // pound sign
    //     content+='          <div class="col-auto p-0">';
    //     content+='              <input type="text" readonly class="form-control m-0 p-0 width-1-char text-center" id="'+entryData[identifier]['guid']+'-pound" value="£">';
    //     content+='          </div>';
    //
    //     // amount
    //     content+='          <div class="col-auto">';
    //     content+='              <div class="top-label ms-1 text-end">amount (inc VAT)</div>';
    //     content+='              <input type="text" class="form-control m-0 text-end width-7-char" id="'+entryData[identifier]['guid']+'-gross-amount" value="'+entryData[identifier]['gross-amount']+'">';
    //     content+='          </div>';
    //
    //     // end content first row
    //     content+='       </div>';
    //
    //     // content second row
    //     content+='       <div class="row gx-1 mt-2 align-items-end XsmallX">';
    //
    //     // transaction-type
    //     content+='          <div class="col-auto">';
    //     content+='              <div class="top-label ms-1">type</div>';
    //     content+=transactionTypeSelector(identifier,'-recommendation');
    //     content+='          </div>';
    //
    //     // transaction-category
    //     content+='          <div class="col-auto">';
    //     content+='              <div class="top-label ms-1">category</div>';
    //     content+=transactionCategorySelector(identifier,'-recommendation');
    //     content+='          </div>';
    //
    //     // transaction vat-rate
    //     content+='          <div class="col">';
    //     content+='             <div class="width-7-char ms-auto form-control-font-changer">';
    //     content+='              <div class="top-label ms-1 text-end">VAT rate</div>';
    //     content+=transactionVatSelector(identifier,'-recommendation');
    //     content+='             </div>';
    //     content+='          </div>';
    //
    //     // end content second row
    //     content+='       </div>';
    //
    //     // content third row- transactions
    //     content += '       <div class="row gx-1 mt-2 align-items-end justify-content-between">';
    //
    //     // flag
    //     content+='                <div class="col-auto">';
    //     content+='                    <div class="top-label ms-1">flag</div>';
    //     content+=transactionFlagSelector(identifier);
    //     content+='                </div>';
    //
    //
    //     // EU
    //     content+='                <div class="col-auto">';
    //     content+='                    <div class="row gx-0 d-flex justify-content-center text-center"><div class="top-label">EU</div></div>';
    //     content+='                    <div class="row gx-0 d-flex justify-content-center text-center"><input type="checkbox" class="mt-0 form-control form-check-input eu" id="'+entryData[identifier]['guid']+'-eu"></div>';
    //     content+='                </div>';
    //
    //     // disallowable expense
    //     content+='                <div class="col-auto ms-1 me-1">';
    //     content+='                    <div class="row gx-0 d-flex justify-content-center text-center"><div class="top-label">disallowable</div></div>';
    //     content+='                    <div class="row gx-0 d-flex justify-content-center text-center"><input type="checkbox" class="mt-0 form-control form-check-input disallowable" id="'+entryData[identifier]['guid']+'-disallowable"></div>';
    //     content+='                </div>';
    //
    //     // // invoice-number
    //     // content+='          <div class="col">';
    //     // content+='              <div class="top-label ms-1">invoice number</div>';
    //     // content+='              <input type="text" class="form-control invoice-number" id="'+entryData[identifier]['guid']+'-invoice-number">';
    //     // content+='          </div>';
    //
    //     // ignored
    //     content+='          <div class="col-auto">';
    //     content+='          <div class="top-label ms-1">ignore</div>';
    //     // content+=transactionIgnoredSelector(identifier);
    //     content+='          <div class="row gx-0 d-flex justify-content-center text-center"><input type="checkbox" class="mt-0 form-control form-check-input ignored-select" id="'+entryData[identifier]['guid']+'-ignored"></div>';
    //     content+='          </div>';
    //
    //     // negative symbol
    //     // let invisible='';
    //     // if(entryData[identifier]['polarity']==='incoming'){
    //     //     invisible=' invisible';
    //     // }
    //     content+='<div class="col-auto">';
    //
    //
    //     content+='<div class="row gx-1 align-items-end ">';
    //     content+='          <div class="col-auto p-0">';
    //     content+='              <input type="text" readonly class="form-control p-0 width-1-char text-end polarity" id="'+entryData[identifier]['guid']+'-pound" value="-">';
    //     content+='          </div>';
    //
    //     // pound sign
    //     content+='          <div class="col-auto p-0">';
    //     content+='              <input type="text" readonly class="form-control p-0 width-1-char text-end" id="'+entryData[identifier]['guid']+'-pound" value="£">';
    //     content+='          </div>';
    //
    //     // amount
    //     content+='          <div class="col-auto ms-auto">';
    //     content+='              <div class="top-label ms-1 text-end">amount (ex VAT)</div>';
    //     content+='              <input type="text" class="form-control text-end width-7-char exvat-amount" id="'+entryData[identifier]['guid']+'-exvat-amount">';
    //     content+='          </div>';
    //     content+='</div>';
    //
    //     // content+='</div>';
    //     content+='</div>';
    //
    //     // end content third row
    //     content += '       </div>';
    //
    //     // content fourth row - note
    //     content +='       <div class="row gx-0 mt-2 note-field-holder">';
    //     content +='         <div class="col">';
    //     content+='            <div class="top-label ms-1">note</div>';
    //     content +='           <input type="text" class="form-control note-field" id="'+entryData[identifier]['guid']+'-note" placeholder="add your own note here">';
    //     content +='         </div>';
    //     content +='         <div class="col-auto">';
    //     content +='           <i class="fa-solid fa-xmark mt-3 ms-1 btn p-0 b-0" onclick="deleteNote(\''+entryData[identifier]['guid']+'\');"></i>';
    //     content +='         </div>';
    //     content += '     </div>';
    //     content +='       <div class="row gx-0 mt-0 note-field-holder-inverse">';
    //     content +='         <div class="col link">';
    //     content +='           <a class="smaller" href="#0" onclick="addNote(\''+entryData[identifier]['guid']+'\');">add note...</a>';
    //     content +='         </div>';
    //     content += '     </div>';
    //
    //
    //     // content fifth row
    //     if(!settings['hasInvoices']) {
    //         content += '       <div class="row gx-1 mt-2 align-items-end">';
    //         content+='       <div class="col-auto">';
    //         content+='          <div class="top-label">invoice date</div>';
    //         content+='          <input type="date" class="form-control width-8-char due-date" id="'+entryData[identifier]['guid']+'-due-date">';
    //         content+='       </div>';
    //
    //         // invoice number
    //         content+='          <div class="col">';
    //         content+='              <div class="top-label ms-1">invoice number</div>';
    //         content+='              <input type="text" class="form-control invoice-number" id="'+entryData[identifier]['guid']+'-invoice-number">';
    //         content+='          </div>';
    //
    //         content+='       </div>';
    //     }
    //
    //     // content sixth row
    //     content += '       <div class="row gx-1 mt-2 align-items-end">';
    //
    //     // delete
    //     if(deletable){
    //         content+='          <div class="col-auto small link">';
    //         content+='              <a id="delete-entry" href="#0" onClick="deleteEntry(\''+identifier+'\');">DELETE</a>';
    //         content+='          </div>';
    //     }
    //
    //     // save
    //     content+='          <div class="col-auto  ms-auto">';
    //     if(entryData[identifier]['status']!=='confirmed' && entryData[identifier]['ignored']!=='true'){
    //         content+='             <div class="row gx-0 Xp-1 Xps-2 Xpb-0 d-flex align-items-top ignore-confirm-wrapper">';
    //         content+='                <div class="col-auto me-1">';
    //         content+=ignoreConfirmSelector(identifier,'-recommendation');
    //         content+='                </div>';
    //         content+='                <div class="col-auto">';
    //         content+='                   <input type="checkbox" class="ignoreConfirmTickbox form-check-input m-0" onchange="ignoreConfirmTickboxChanged(\''+identifier+'\',this.checked)">';
    //         content+='                </div>';
    //         content+='             </div>';
    //     }else{
    //         content+='              <button id="add-entry" class="btn btn-primary btn-smaller btn-sm" type="button" onClick="saveEntry(\''+identifier+'\');">SAVE</button>';
    //     }
    //     content+='          </div>';
    //
    //     content+='       </div>';
    //
    //
    //     // content last row
    //     content+='       <div class="row gx-0 align-items-end">';
    //     content+='          <div class="col text-center close" onclick="unEditEntry(\''+entryData[identifier]['guid']+'\')">';
    //     content+='              <i class="fa-solid fa-caret-up"></i>';
    //     content+='          </div>';
    //     // end content last row
    //     content+='       </div>';
    //
    //     // end content
    //     content+='    </div>';
    //
    //     // end entry core
    //     content+='</div>';
    //
    //     // start entry invoices
    //     if(settings['hasInvoices']){
    //         content+='<div class="row gx-0 mt-1 ps-1 ps-sm-0 pe-1 pe-sm-0">';
    //
    //         if(entryData[identifier]['link']===''){
    //             // items without link should display link to assign to an invoice
    //             content+='       <div class="row gx-0 align-items-end justify-content-between  entry-section-label ">';
    //             content+='          <div class="col link">';
    //             content+='             <a href="#0" onclick="alert(\'show modal dialogue: list of invoices with amounts outstanding, and ability to choose one\')">ASSIGN TO INVOICE</a>';
    //             content+='          </div>'
    //             content+='       </div>'
    //         }else{
    //             // items with link should display some details
    //             content+='       <div class="row gx-0 align-items-end justify-content-between  entry-section-label ">';
    //             content+='          <div class="col">';
    //             content+='             <div>assigned to invoice:</div>';
    //             content+='          </div>';
    //             content+='          <div class="col-auto link">';
    //             content+='             <a href="#0" onclick="alert(\'unlink\')">UNASSIGN</a>';
    //             content+='          </div>';
    //             content+='       </div>';
    //             content+='       <div class="row gx-0 align-items-end" onclick="alert(\'jump to invoice\')">';
    //             content+='          <div class="col">';
    //             content+='             <div class="invoice-box p-2">';
    //
    //             content+='                <div class="row gx-2">';
    //             content+='                   <div class="col-auto">';
    //             content+='                      <div class="transaction-date">04/05/2023</div>';
    //             content+='                   </div>';
    //             content+='                   <div class="col-auto">';
    //             content+='                      <div class="transaction-title">Ladders R Us</div>';
    //             content+='                   </div>';
    //             content+='                   <div class="col-auto">';
    //             content+='                      <div class="transaction-reference">LRU 1232003</div>';
    //             content+='                   </div>';
    //             content+='                   <div class="col-auto ms-auto text-end">';
    //             content+='                      <div class="transaction-amount">£ 45,255.23 <span class="small">(inc VAT)</span></div>';
    //             content+='                   </div>';
    //             content+='                </div>';
    //
    //             content+='             </div>';
    //             content+='          </div>';
    //             content+='       </div>';
    //         }
    //
    //         content+='</div>';
    //     }
    //
    //     // start entry tax form links
    //     if(
    //         entryData[identifier]['vat-obligation-id']!=='' ||
    //         entryData[identifier]['itsa-obligation-id']!=='' ||
    //         entryData[identifier]['sa100-id']!=='' ||
    //         entryData[identifier]['ct600-id']!=='' ||
    //         entryData[identifier]['sa800-id']!=='' ||
    //         entryData[identifier]['sa900-id']!==''
    //     ){
    //         content+='<div class="row gx-0 mt-1 ps-1 ps-sm-0 pe-1 pe-sm-0">';
    //
    //         content+='       <div class="row gx-0 align-items-end entry-section-label ">';
    //         content+='          <div class="col">';
    //         content+='             <div>included within submission:</div>';
    //         content+='          </div>';
    //         content+='       </div>';
    //
    //         content+='       <div class="row gx-0 align-items-end">';
    //         content+='          <div class="col">';
    //         content+='             <div class="return-box p-2 pb-1">';
    //
    //         content+='                <div class="row gx-2 justify-content-between">';
    //         content+='                   <div class="col-auto">';
    //         content+='                      <div class="width-8-char">Company 23/24</div>';
    //         content+='                   </div>';
    //         content+='                   <div class="col-auto">';
    //         content+='                      <div>06/04/23 - 05/04/23</div>';
    //         content+='                   </div>';
    //         content+='                   <div class="col-auto">';
    //         content+='                      <div class="transaction-amount">on 26/06/24</div>';
    //         content+='                   </div>';
    //         content+='                </div>';
    //
    //         content+='                <div class="row gx-2 justify-content-between">';
    //         content+='                   <div class="col-auto">';
    //         content+='                      <div class="width-8-char">VAT 23/24</div>';
    //         content+='                   </div>';
    //         content+='                   <div class="col-auto">';
    //         content+='                      <div>01/07/23 - 30/09/23</div>';
    //         content+='                   </div>';
    //         content+='                   <div class="col-auto">';
    //         content+='                      <div class="transaction-amount">on 26/06/24</div>';
    //         content+='                   </div>';
    //         content+='                </div>';
    //
    //         content+='             </div>';
    //         content+='          </div>';
    //         content+='       </div>';
    //
    //         content+='       <div class="row gx-0 bottom-bar-arrow-box">';
    //         content+='          <div class="col bottom-bar-arrow-box-left">';
    //         content+='          </div>';
    //         content+='          <div class="col bottom-bar-arrow-box-right">';
    //         content+='          </div>';
    //         content+='       </div>';
    //
    //
    //         content+='</div>';
    //     }
    //
    //
    //     // end EDIT
    //     content+='</div>';
    //
    //     // end of row
    //     content+='</div>';
    //
    //     return content;
    //
    // }
    //
    // // ==============================
    // // ==============================
    // // ============= BILLS & INVOICES
    // // ==============================
    // // ==============================
    // if(entryData[identifier]['type']==='bill' || entryData[identifier]['type']==='invoice') {
    //
    //     // start this row
    //     content+='<div id="entry-'+entryData[identifier]['guid']+'" class="row gx-0 entry mb-2 entry-status-'+entryData[identifier]['status']+'">';
    //
    //     // start DISPLAY
    //     content+='<div class="row gx-0 display position-relative">';
    //
    //     // content
    //     content+='    <div class="col p-2 pb-0">';
    //
    //     // content first row
    //     content+='       <div class="row gx-0">';
    //
    //     // ignored
    //     content+='          <div class="col-auto ignored">';
    //     content+='          </div>';
    //
    //     // title
    //     content+='          <div class="col title">';
    //     // content+=entryData[identifier]['description'];
    //     content+='          </div>';
    //
    //     content+='          <div class="col-auto polarity">';
    //     // content+='-';
    //     content+='          </div>';
    //
    //     // amount
    //     content+='          <div class="col-auto amount">';
    //     content+='          </div>';
    //
    //
    //     // end content first row
    //     content+='       </div>';
    //
    //     // content third row
    //     content+='       <div class="row gx-0 mb-1">';
    //
    //     // end content third row
    //     // end content third row
    //     content+='       </div>';
    //
    //     // end content
    //     content+='    </div>';
    //
    //     // flag
    //     content+='    <div class="col-auto d-flex align-items-stretch">';
    //     content+='        <div class="flag-bar">';
    //     content+='        </div>';
    //     content+='    </div>';
    //
    //     // add click target
    //     // click target
    //     content+='        <div id="row-click-target-'+entryData[identifier]['guid']+'" class="row-click-target" onclick="editEntry(\''+entryData[identifier]['guid']+'\')"></div>';
    //
    //     // end DISPLAY
    //     content+='</div>';
    //
    //     // start EDIT
    //
    //     content+='<div class="row gx-0 edit ps-sm-2 pe-sm-2" style="display:none;">';
    //
    //     // entry label
    //     content+='<div class="row gx-0 entry-section-label ps-1 ps-sm-0">';
    //     content+='transaction';
    //     content+='</div>';
    //
    //     // entry core
    //     content+='<div class="row gx-0 Xsedit entry-core">';
    //
    //     // end bar
    //     content+='    <div class="col-auto d-flex align-items-stretch">';
    //     content+='        <div class="end-bar text-center pt-1 pb-1">'
    //     label='';
    //     if(entryData[identifier]['source-type']==='bank-feed'){
    //         label+='BANK FEED '+entryData[identifier]['source-id'];
    //     }
    //     if(entryData[identifier]['source-type']==='csv-import'){
    //         label+='CSV IMPORT';
    //     }
    //     if(entryData[identifier]['source-type']==='manual'){
    //         label+='MANUAL ENTRY';
    //     }
    //     // label='&nbsp;';
    //     content+=label;
    //     content+='        </div>';
    //     content+='    </div>';
    //
    //     // end bar arrow
    //     content+='    <div class="col-auto d-flex align-items-stretch">';
    //     content+='        <div class="end-bar-arrow-box">';
    //     content+='            <div class="end-bar-arrow-box-up"></div>';
    //     content+='            <div class="end-bar-arrow-box-down"></div>';
    //     content+='        </div>';
    //     content+='    </div>';
    //
    //     // content
    //     content+='    <div class="col p-2 pb-0">';
    //
    //     // content first row
    //     content+='       <div class="row gx-1 align-items-end">';
    //
    //     // date
    //     content+='          <div class="col-auto">';
    //     content+='              <div class="top-label ms-1">payment date</div>';
    //     content+='              <input type="date" class="form-control m-0 width-8-char" id="'+entryData[identifier]['guid']+'-date" value="'+entryData[identifier]['date']+'">';
    //     content+='          </div>';
    //
    //     // description
    //     content+='          <div class="col">';
    //     content+='              <div class="top-label ms-1">description</div>';
    //     content+='              <input type="text" class="form-control m-0" id="'+entryData[identifier]['guid']+'-name" value="'+entryData[identifier]['description']+'">';
    //     content+='          </div>';
    //
    //     // negative symbol
    //     // let invisible='';
    //     // if(entryData[identifier]['polarity']==='incoming'){
    //     //     invisible=' invisible';
    //     // }
    //     content+='          <div class="col-auto p-0">';
    //     content+='              <input type="text" readonly class="form-control m-0 p-0 width-1-char text-end polarity" id="'+entryData[identifier]['guid']+'-polarity" value="-">';
    //     content+='          </div>';
    //
    //     // pound sign
    //     content+='          <div class="col-auto p-0">';
    //     content+='              <input type="text" readonly class="form-control m-0 p-0 width-1-char text-center" id="'+entryData[identifier]['guid']+'-pound" value="£">';
    //     content+='          </div>';
    //
    //     // amount
    //     content+='          <div class="col-auto">';
    //     content+='              <div class="top-label ms-1 text-end">amount (inc VAT)</div>';
    //     content+='              <input type="text" class="form-control m-0 text-end width-7-char" id="'+entryData[identifier]['guid']+'-gross-amount" value="'+entryData[identifier]['gross-amount']+'">';
    //     content+='          </div>';
    //
    //     // end content first row
    //     content+='       </div>';
    //
    //     // content second row - bills and invoices
    //
    //     content+='       <div class="row gx-1 mt-2 align-items-end Xsmall">';
    //
    //     content+='<div class="col-sm">';
    //     content+='   <div class="row gx-1 mt-0 align-items-end">';
    //
    //     // due date
    //     content+='          <div class="col-auto">';
    //     content+='              <div class="top-label ms-1">due date</div>';
    //     content+='              <input type="date" class="form-control width-8-char due-date" id="'+entryData[identifier]['guid']+'-due-date">';
    //     content+='          </div>';
    //
    //     // invoice-number
    //     content+='          <div class="col">';
    //     content+='              <div class="top-label ms-1">invoice number</div>';
    //     content+='              <input type="text" class="form-control invoice-number" id="'+entryData[identifier]['guid']+'-invoice-number">';
    //     content+='          </div>';
    //
    //     // transaction vat-rate
    //     content+='          <div class="col-auto">';
    //     content+='              <div class="top-label ms-1 text-end">VAT rate</div>';
    //     content+=transactionVatSelector(identifier,'-recommendation');
    //     content+='          </div>';
    //
    //     content+='   </div>';
    //     content+='</div>';
    //     content+='<div class="col-sm-auto">';
    //     content+='   <div class="row gx-1 mt-0 align-items-end justify-content-end">';
    //
    //     // ignored
    //     content+='          <div class="col-auto">';
    //     content+='          <div class="top-label ms-1">ignore</div>';
    //     // content+=transactionIgnoredSelector(identifier);
    //     content+='          <div class="row gx-0 d-flex justify-content-center text-center"><input type="checkbox" class="mt-0 form-control form-check-input ignored-select" id="'+entryData[identifier]['guid']+'-ignored"></div>';
    //     content+='          </div>';
    //
    //     // negative symbol
    //     // let invisible='';
    //     // if(entryData[identifier]['polarity']==='incoming'){
    //     //     invisible=' invisible';
    //     // }
    //     content+='          <div class="col-auto p-0">';
    //     content+='              <input type="text" readonly class="form-control p-0 width-1-char text-end polarity" id="'+entryData[identifier]['guid']+'-pound" value="-">';
    //     content+='          </div>';
    //
    //     // pound sign
    //     content+='          <div class="col-auto p-0">';
    //     content+='              <input type="text" readonly class="form-control p-0 width-1-char text-end" id="'+entryData[identifier]['guid']+'-pound" value="£">';
    //     content+='          </div>';
    //
    //     // amount
    //     content+='          <div class="col-auto">';
    //     content+='              <div class="top-label ms-1 text-end">amount (ex VAT)</div>';
    //     content+='              <input type="text" class="form-control text-end width-7-char exvat-amount" id="'+entryData[identifier]['guid']+'-exvat-amount">';
    //     content+='          </div>';
    //
    //     content+='   </div>';
    //     content+='</div>';
    //
    //     // end content second row
    //     content+='       </div>';
    //
    //     // content last row - bills and invoices
    //
    //     content+='       <div class="row gx-0 mt-2 align-items-end">';
    //     content+='          <div class="col">';
    //     content+='             <div class="top-label ms-1">transactions assigned:</div>';
    //     content+='          </div>';
    //     content+='       </div>';
    //     content+='       <div class="row gx-2 align-items-end">';
    //     content+='          <div class="col">';
    //     content+='             <div class="white-box ps-2 pe-2 pb-1">';
    //
    //     content+='                <div class="row gx-2">';
    //     content+='                   <div class="col-auto">';
    //     content+='                      <div class="top-label">payment date</div>';
    //     content+='                      <div class="transaction-date small">dd/mm/yy</div>';
    //     content+='                   </div>';
    //     content+='                   <div class="col">';
    //     content+='                      <div class="top-label">description</div>';
    //     content+='                      <div class="transaction-title small">xxxxxxxxxxxxxxx</div>';
    //     content+='                   </div>';
    //     content+='                   <div class="col-auto">';
    //     content+='                      <div class="top-label">invoice number</div>';
    //     content+='                      <div class="transaction-reference small">xxxxxxxx</div>';
    //     content+='                   </div>';
    //     content+='                   <div class="col-auto text-end">';
    //     content+='                      <div class="top-label">amount (inc VAT)</div>';
    //     content+='                      <div class="transaction-amount small">£ xx.xx</div>';
    //     content+='                   </div>';
    //     content+='                   <div class="col-auto text-end">';
    //     content+='                      <div class="top-label">&nbsp;</div>';
    //     content+='                      <i class="fa-solid fa-xmark"></i>';
    //     content+='                   </div>';
    //     content+='                </div>';
    //
    //     content+='                <div class="row gx-2 align-items-center">';
    //     content+='                   <div class="col text-end">';
    //     content+='                      <div class="top-label">outstanding</div>';
    //     content+='                   </div>';
    //     content+='                   <div class="col-auto text-end">';
    //     content+='                      <div class="outstanding-amount small"></div>';
    //     content+='                   </div>';
    //     content+='                   <div class="col-auto text-end invisible">';
    //     content+='                      <i class="fa-solid fa-xmark"></i>';
    //     content+='                   </div>';
    //     content+='                </div>';
    //
    //
    //     content+='             </div>';
    //     content+='          </div>';
    //
    //
    //     // end content last row - bills and invoices
    //     content+='       </div>';
    //
    //     content += '       <div class="row gx-1 mt-2 align-items-end">';
    //
    //     // delete
    //     if(deletable){
    //         content+='          <div class="col-auto small link">';
    //         content+='              <a id="delete-entry" href="#0" onClick="deleteEntry(\''+identifier+'\');">DELETE <i class="fa-solid fa-trash-can"></i></a>';
    //         content+='          </div>';
    //     }
    //
    //     //save
    //     content+='          <div class="col-auto ms-auto">';
    //     content+='              <button id="add-entry" class="btn btn-primary btn-smaller btn-sm" type="button" onClick="saveEntry(\''+identifier+'\');">SAVE</button>';
    //     content+='          </div>';
    //     content+='       </div>';
    //
    //     // content last row
    //     content+='       <div class="row gx-0 align-items-end">';
    //     content+='          <div class="col text-center close" onclick="unEditEntry(\''+entryData[identifier]['guid']+'\')">';
    //     content+='              <i class="fa-solid fa-caret-up"></i>';
    //     content+='          </div>';
    //     // end content last row
    //     content+='       </div>';
    //
    //     // end content
    //     content+='    </div>';
    //
    //     // end entry core
    //     content+='</div>';
    //
    //     // entry label
    //     content+='<div class="row gx-0 entry-section-label ps-1 ps-sm-0">';
    //     content+='transaction';
    //     content+='</div>';
    //
    //     // end EDIT
    //
    //     content+='</div>';
    //
    //     //////////////////////////////////////////////////////////////////////////////////////////////////
    //     //////////////////////////////////////////////////////////////////////////////////////////////////
    //
    //     // end of row
    //     content+='</div>';
    //
    //     return content;
    // }
    //


}

//////////////////////////////////////////////////////////////////////////////////
function transactionTypeSelector(identifier, id_postfix){
    //
    // if(!id_postfix){id_postfix=''}
    //
    // let incomingTypes='';
    // incomingTypes+='<option value="sales">Sales</option>';
    // incomingTypes+='<option value="payment_refund">Payment refund</option>';
    // incomingTypes+='<option value="disposal_of_capital_asset">Disposal of capital asset</option>';
    // incomingTypes+='<option value="other_money_in">Other money in</option>';
    // incomingTypes+='<option value="" disabled></option>';
    // incomingTypes+='<option value="personal_expense">Personal Expense</option>';
    // // incomingTypes+='<option value="sales_ec">(EC) Sales</option>';
    // // incomingTypes+='<option value="payment_refund_ec">(EC) Payment refund</option>';
    // // incomingTypes+='<option value="disposal_of_capital_asset_ec">(EC) Disposal of capital asset</option>';
    // // incomingTypes+='<option value="other_money_in_ec">(EC) Other money in</option>';
    //
    // let outgoingTypes='';
    // outgoingTypes+='<option value="payment">Payment</option>';
    // outgoingTypes+='<option value="sales_refund">Sales refund</option>';
    // outgoingTypes+='<option value="purchase_of_capital_asset">Purchase of capital asset</option>';
    // outgoingTypes+='<option value="other_money_out">Other money out</option>';
    // // outgoingTypes+='<option value="divider" disabled></option>';
    // // outgoingTypes+='<option value="payment_ec">(EC) Payment</option>';
    // // outgoingTypes+='<option value="sales_refund_ec">(EC) Sales refund</option>';
    // // outgoingTypes+='<option value="purchase_of_capital_asset_ec">(EC) Purchase of capital asset</option>';
    // // outgoingTypes+='<option value="other_money_out_ec">(EC) Other money out</option>';
    //
    // let output='';
    // output+='<select name="transaction-type" id="'+entryData[identifier]['guid']+'-transaction-type" class="form-control Xwidth-9-char transaction-type" onchange="transactionTypeChanged(\''+identifier+'\',this.value)">';
    //
    // output+='<option value="" disabled>Type...</option>';
    //
    // if(entryData[identifier]['polarity']==='incoming'){
    //     output+=incomingTypes;
    // }else if(entryData[identifier]['polarity']==='outgoing'){
    //     output+=outgoingTypes;
    // }else{
    //     output+=incomingTypes;
    //     output+=outgoingTypes;
    // }
    //
    // output+='</select>';
    //
    // return output;
}
/////////////////////////////////////////////////////////////////////////////////
function transactionCategorySelector(identifier, id_postfix){
    //
    // if(!id_postfix){id_postfix=''}
    //
    // let incomingTypes='';
    // incomingTypes+='<option value="divider" disabled>Sales</option>';
    // incomingTypes+='<option value="sales">Sales</option>';
    // incomingTypes+='<option value="divider" disabled>Sales refund</option>';
    // incomingTypes+='<option value="sales">Sales</option>';
    // incomingTypes+='<option value="divider" disabled>Disposal of capital asset</option>';
    // incomingTypes+='<option value="motor_vehicle_capital_sale">Motor vehicle capital sale</option>';
    // incomingTypes+='<option value="fixtures_and_fittings_capital_sale">Fixtures and fittings capital sale</option>';
    // incomingTypes+='<option value="computer_equipment_capital_sale">Computer equipment capital sale</option>';
    // incomingTypes+='<option value="other_capital_sale">Other capital sale</option>';
    // incomingTypes+='<option value="divider" disabled>Other money in</option>';
    // incomingTypes+='<option value="other_operating_income">Other operating income</option>';
    // incomingTypes+='<option value="income_from_investment">Income from investment</option>';
    // incomingTypes+='<option value="interest_receivable">Interest receivable</option>';
    // incomingTypes+='<option value="tax_refund">Tax refund</option>';
    // incomingTypes+='<option value="vat_refund">VAT refund</option>';
    //
    // let outgoingTypes='';
    // outgoingTypes+='<option value="divider" disabled>Payment</option>';
    // outgoingTypes+='<option value="purchases">Purchases</option>';
    // outgoingTypes+='<option value="wages_and_salaries">Wages and salaries</option>';
    //
    // let output='';
    // output+='<select name="transaction-category" id="'+entryData[identifier]['guid']+'-transaction-category" class="form-control Xwidth-10-char transaction-category" onchange="transactionCategoryChanged(\''+identifier+'\',this.value)">';
    // output+='<option value="" disabled>Category...</option>';
    //
    // output+=incomingTypes;
    // output+=outgoingTypes;
    //
    // output+='</select>';
    //
    // return output;
}
//////////////////////////////////////////////////////////////////////////////////
function transactionVatSelector(identifier, id_postfix){
    //
    // if(!id_postfix){id_postfix=''}
    //
    // let rates='';
    // // rates+='<option value="">--</option>';
    // rates+='<option value="20">20%</option>';
    // rates+='<option value="5">5%</option>';
    // rates+='<option value="0">0%</option>';
    // rates+='<option value="N/A">N/A</option>';
    //
    //
    // let output='';
    // output+='<select name="transaction-vat-selector" id="'+entryData[identifier]['guid']+'-transaction-vat-selector" class="form-control transaction-vat-selector text-end" onchange="transactionVatSelectorChanged(\''+identifier+'\',this.value)">';
    // // output+='<option value="" disabled>VAT...</option>';
    //
    // output+=rates;
    //
    //
    // output+='</select>';
    //
    // return output;
}
//////////////////////////////////////////////////////////////////////////////////
function ignoreConfirmSelector(identifier, id_postfix){
    //
    // if(!id_postfix){id_postfix=''}
    //
    // let options='';
    // // options+='<option value="">--</option>';
    // options+='<option value="confirm">Confirm</option>';
    // options+='<option value="ignore">Ignore</option>';
    //
    //
    //
    // let output='';
    // output+='<select name="transaction-ignoreConfirm-selector" id="transaction-ignoreConfirm-selector-'+identifier+id_postfix+'" class="mb-0 form-control Xwidth-4-5-char transaction-ignoreConfirm-selector" onchange="ignoreConfirmSelectorChanged(\''+identifier+'\',this.value)">';
    //
    // output+=options;
    //
    //
    // output+='</select>';
    //
    // return output;
}
//////////////////////////////////////////////////////////////////////////////////
function ignoreConfirmSelectorChanged(identifier,value){
    // let entry=document.getElementById('entry-'+entryData[identifier]['guid']);
    // if(entry) {
    //     let entity;
    //
    //     // set transaction-ignoreConfirm-selector
    //     entity=entry.getElementsByClassName('transaction-ignoreConfirm-selector');
    //     if(entity){
    //         [...entity].forEach((element) => element.value=value);
    //     }
    //
    //     // allow to confirm?
    //     entity=entry.getElementsByClassName('ignoreConfirmTickbox');
    //     if(entity){
    //         [...entity].forEach((element) => {
    //             if(
    //                 entry.getElementsByClassName('transaction-ignoreConfirm-selector')[0].value==='confirm' &&
    //                 (entry.getElementsByClassName('transaction-type')[0].value==='' ||
    //                     entry.getElementsByClassName('transaction-category')[0].value==='' ||
    //                     entry.getElementsByClassName('transaction-vat-selector')[0].value==='')
    //             ){
    //                 element.disabled=true;
    //             }else{
    //                 element.disabled=false;
    //             }
    //
    //         });
    //     }
    //
    // }
}
//////////////////////////////////////////////////////////////////////////////////
function ignoreConfirmTickboxChanged(identifier,checked){
    // let entry=document.getElementById('entry-'+entryData[identifier]['guid']);
    // if(entry) {
    //     let entity;
    //
    //     // set ignoreConfirmTickbox
    //     entity=entry.getElementsByClassName('ignoreConfirmTickbox');
    //     if(entity){
    //         [...entity].forEach((element) => element.checked=checked);
    //     }
    //
    // }
    // enableApplyButton();
}
//////////////////////////////////////////////////////////////////////////////////
function transactionTypeChanged(identifier,value){
    // let entry=document.getElementById('entry-'+entryData[identifier]['guid']);
    // if(entry) {
    //     let entity;
    //
    //     // set transaction-type
    //     entity=entry.getElementsByClassName('transaction-type');
    //     if(entity){
    //         [...entity].forEach((element) => element.value=value);
    //     }
    //
    //     // set transaction Categories for this type
    //     setTransactionCategory('entry-'+entryData[identifier]['guid']);
    //
    //     // deal with polarity
    //     let newPolarity;
    //     if(incomingTypes().includes('"'+entry.getElementsByClassName('transaction-type')[0].value+'"')){
    //         newPolarity='incoming';
    //     }else{
    //         newPolarity='outgoing';
    //     }
    //
    //     const elements=entry.getElementsByClassName('polarity');
    //     if(elements){
    //         [...elements].forEach((element) => {
    //             if(newPolarity==='incoming'){
    //                 element.value = ' ';
    //                 element.innerHTML = ' ';
    //             }else{
    //                 element.value = '-';
    //                 element.innerHTML = '-';
    //             }
    //
    //         });
    //     }
    //
    //
    //
    //     // allow to confirm?
    //     entity=entry.getElementsByClassName('ignoreConfirmTickbox');
    //     if(entity){
    //         [...entity].forEach((element) => {
    //             if(
    //                 entry.getElementsByClassName('transaction-ignoreConfirm-selector')[0].value==='confirm' &&
    //                 (entry.getElementsByClassName('transaction-type')[0].value==='' ||
    //                 entry.getElementsByClassName('transaction-category')[0].value==='' ||
    //                 entry.getElementsByClassName('transaction-vat-selector')[0].value==='')
    //             ){
    //                 element.disabled=true;
    //             }else{
    //                 element.disabled=false;
    //             }
    //
    //         });
    //     }
    //
    //
    //
    // }
    // validateFields();
}
//////////////////////////////////////////////////////////////////////////////////
function transactionCategoryChanged(identifier,value){
    // let entry=document.getElementById('entry-'+entryData[identifier]['guid']);
    // if(entry) {
    //     let entity;
    //
    //     // set transaction-type
    //     entity=entry.getElementsByClassName('transaction-category');
    //     if(entity){
    //         [...entity].forEach((element) => element.value=value);
    //     }
    //
    //     // allow to confirm?
    //     entity=entry.getElementsByClassName('ignoreConfirmTickbox');
    //     if(entity){
    //         [...entity].forEach((element) => {
    //             if(
    //                 entry.getElementsByClassName('transaction-type')[0].value==='' ||
    //                 entry.getElementsByClassName('transaction-category')[0].value==='' ||
    //                 entry.getElementsByClassName('transaction-vat-selector')[0].value===''
    //             ){
    //                 element.disabled=true;
    //             }else{
    //                 element.disabled=false;
    //             }
    //
    //         });
    //     }
    //
    // }
}
//////////////////////////////////////////////////////////////////////////////////
function transactionVatSelectorChanged(identifier,value){
    // let entry=document.getElementById('entry-'+entryData[identifier]['guid']);
    // if(entry) {
    //     let entity;
    //
    //     // set transaction-type
    //     entity=entry.getElementsByClassName('transaction-vat-selector');
    //     if(entity){
    //         [...entity].forEach((element) => element.value=value);
    //     }
    //
    // }
}
//////////////////////////////////////////////////////////////////////////////////
function transactionFlagSelector(identifier){
    //
    // let flags='';
    // for(let i=1;i<flagData.length;i++){
    //     flags+='<option value="'+i+'">'+flagData[i]['label']+'</option>';
    // }
    // let output='';
    // output+='<select name="transaction-flag" id="'+entryData[identifier]['guid']+'-transaction-flag" class="form-control flag">';
    // output+=flags;
    // output+='</select>';
    //
    // return output;
}
//////////////////////////////////////////////////////////////////////////////////
function transactionIgnoredSelector(identifier){

    // let flags='';
    //
    // flags+='<option value="true">Yes</option>';
    // flags+='<option value="false">No</option>';
    //
    // let output='';
    // output+='<select name="transaction-ignored" id="'+entryData[identifier]['guid']+'-ignored" class="form-control ignored-select">';
    //
    // output+=flags;
    //
    //
    // output+='</select>';
    //
    // return output;
}
// //////////////////////////////////////////////////////////////////////////////////
// function capitalize(s){
//     // This function capitalizes the first letter of the string
//     if(s==='')return;
//     return s[0].toUpperCase() + s.slice(1);
// }
//////////////////////////////////////////////////////////////////////////////////
function formatAmount(amount, polarity) {
    // // This function accepts an amount (unsigned) and a polarity, and returns a formatted string
    // let negative = false;
    // let output='';
    // // if (polarity==='outgoing') {
    // //     output+='- ';
    // // }
    // output+='£ ';
    // output+=amount.replace('-','');
    // return output;
}
//////////////////////////////////////////////////////////////////////////////////
function formatTransactionType(s){
    // if(s==='')return;
    // return capitalize(s.replaceAll('_',' '));
}
//////////////////////////////////////////////////////////////////////////////////
function deleteNote(identifier){
    // entryData[getEntryIndexFromId(identifier)]['note']='';
    // setupEntries();
}
//////////////////////////////////////////////////////////////////////////////////
function addNote(identifier){
    //
    // let entry=document.getElementById('entry-'+identifier);
    //
    // if(entry) {
    //     let entity;
    //
    //     // show/hide note-field-holder
    //     entity = entry.getElementsByClassName('note-field-holder');
    //     if (entity) {
    //         [...entity].forEach((element) => {
    //             element.style.display = "flex";
    //         });
    //     }
    //     entity = entry.getElementsByClassName('note-field-holder-inverse');
    //     if (entity) {
    //         [...entity].forEach((element) => {
    //             element.style.display = "none";
    //         });
    //     }
    //
    // }
}