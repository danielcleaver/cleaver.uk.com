function overviewRefresh(){
    let element;
    let entity;
    let result;
    // let rowNames=['business','period','options','bankfeed','credit','edit','pdfcopy'];
    // let rowNames=['business','period','options','bankfeed','credit','edit'];
    let rowNames=['business','options','bankfeed','credit','edit'];

    if(!!creditedArray['credit'+getSelectedCreditYear()]){
        credited=true;
    }else {
        credited=false;
    }


    // console.log('businessType',businessType);
    // console.log('overviewRefresh()');

    // ==== username ====================================================
    entity=document.getElementsByClassName('username');
    let username="business@ftaxqa.co.uk";
    if(agent){
        username="agent@ftaxqa.co.uk";
        document.getElementById('toggle-agent').innerHTML='YOU ARE AN AGENT';
    }else{
        document.getElementById('toggle-agent').innerHTML='YOU ARE A NON-AGENT';
    }
    if(entity){
        [...entity].forEach((element) => {
            element.innerHTML = username;
        });
    }

    // ==== taxFilerName====================================================
    taxFilerName=document.getElementById('taxfiler-businessname').value;


    // ==== turnover ====================================================
    document.getElementById('toggle-turnover').innerHTML='YOUR TURNOVER IS £ '+turnover;


    // ==== devnotes ====================================================
    if(showDevnotes){
        document.getElementById('toggle-devnotes').innerHTML='SHOWING DEV NOTES';
        [...document.getElementsByClassName('devnote')].forEach((element) => unhide(element));
    }else{
        document.getElementById('toggle-devnotes').innerHTML='HIDING DEV NOTES';
        [...document.getElementsByClassName('devnote')].forEach((element) => hide(element));
    }

    // ==== lock panels that are not yet ready for us ====================================================
    // ---- first unlock and ghost all panels
    rowNames.forEach((rowName) => panel[rowName]['locked']=true);
    rowNames.forEach((rowName) => panel[rowName]['ghosted']=true);

    // ---- now lock those depending on the state of the overview
    panel['business']['locked']=false;
    panel['business']['ghosted']=false;

    if(panel['business']['completed']===true){
        panel['business']['locked']=true;
        // panel['period']['locked']=false;
        // panel['period']['ghosted']=false;
        panel['options']['locked']=false;
        panel['options']['ghosted']=false;

        // if(panel['period']['completed']===true){
        //     panel['period']['locked']=true;
        //     panel['options']['locked']=false;
        //     panel['options']['ghosted']=false;

        if(panel['options']['completed']===true){
            // panel['options']['locked']=true;
            panel['credit']['locked']=false;
            panel['credit']['ghosted']=false;

            if(panel['credit']['completed']===true){
                // panel['credit']['locked']=true;
                panel['bankfeed']['locked']=false;
                panel['bankfeed']['ghosted']=false;

                if(panel['bankfeed']['completed']===true){
                    // panel['bankfeed']['locked']=true;
                    panel['edit']['locked']=false;
                    panel['edit']['ghosted']=false;

                    // if(panel['edit']['completed']===true){
                    //     // panel['edit']['locked']=true;
                    //     panel['pdfcopy']['locked']=false;
                    //     panel['pdfcopy']['ghosted']=false;
                    // }
                }
            }
        }
    }
    // }

    // panel['period']['open']=true;
    // panel['period']['locked']=false;
    // panel['period']['ghosted']=false;

    // panel['credit']['ghosted']=false;
    // panel['credit']['open']=true;
    // panel['credit']['locked']=false;

    // show/hide agent/non-agent content
    if(agent){
        [...document.getElementsByClassName('agent-only')].forEach((element) => unhide(element));
        [...document.getElementsByClassName('non-agent-only')].forEach((element) => hide(element));
    }else{
        [...document.getElementsByClassName('agent-only')].forEach((element) => hide(element));
        [...document.getElementsByClassName('non-agent-only')].forEach((element) => unhide(element));
    }

    // show/hide transferred content
    if(transferred){
        [...document.getElementsByClassName('if-transferred')].forEach((element) => unhide(element));
        [...document.getElementsByClassName('if-not-transferred')].forEach((element) => hide(element));
    }else{
        [...document.getElementsByClassName('if-transferred')].forEach((element) => hide(element));
        [...document.getElementsByClassName('if-not-transferred')].forEach((element) => unhide(element));
    }

    // show/hide shared content
    if(shared){
        [...document.getElementsByClassName('if-shared')].forEach((element) => unhide(element));
        [...document.getElementsByClassName('if-not-shared')].forEach((element) => hide(element));
    }else{
        [...document.getElementsByClassName('if-shared')].forEach((element) => hide(element));
        [...document.getElementsByClassName('if-not-shared')].forEach((element) => unhide(element));
    }

    // show/hide owned content
    if(owned){
        [...document.getElementsByClassName('if-owned')].forEach((element) => unhide(element));
        [...document.getElementsByClassName('if-not-owned')].forEach((element) => hide(element));
    }else{
        [...document.getElementsByClassName('if-owned')].forEach((element) => hide(element));
        [...document.getElementsByClassName('if-not-owned')].forEach((element) => unhide(element));
    }

    // show/hide credit-required content
    if(creditRequired){
        [...document.getElementsByClassName('credit-required')].forEach((element) => unhide(element));
        [...document.getElementsByClassName('not-credit-required')].forEach((element) => hide(element));
    }else{
        [...document.getElementsByClassName('credit-required')].forEach((element) => hide(element));
        [...document.getElementsByClassName('not-credit-required')].forEach((element) => unhide(element));
    }

    // show/hide credited content
    if(credited){
        [...document.getElementsByClassName('credited')].forEach((element) => unhide(element));
        [...document.getElementsByClassName('not-credited')].forEach((element) => hide(element));
    }else{
        [...document.getElementsByClassName('credited')].forEach((element) => hide(element));
        [...document.getElementsByClassName('not-credited')].forEach((element) => unhide(element));
    }

    // show/hide transfer required content
    if(document.getElementById('enable-transfer').checked){
        [...document.getElementsByClassName('transfer-required')].forEach((element) =>unhide(element));
        [...document.getElementsByClassName('transfer-not-required')].forEach((element) =>hide(element));
    }else{
        [...document.getElementsByClassName('transfer-required')].forEach((element) => hide(element));
        [...document.getElementsByClassName('transfer-not-required')].forEach((element) => unhide(element));
    }

    // show/hide share required content
    if(document.getElementById('enable-sharing').checked){
        [...document.getElementsByClassName('share-required')].forEach((element) =>unhide(element));
        [...document.getElementsByClassName('share-not-required')].forEach((element) =>hide(element));
    }else{
        [...document.getElementsByClassName('share-required')].forEach((element) => hide(element));
        [...document.getElementsByClassName('share-not-required')].forEach((element) => unhide(element));
    }


    // deal with status-display
    if(owned){
        document.getElementById('status-display-owner').innerHTML='you';
    }else{
        document.getElementById('status-display-owner').innerHTML=document.getElementById('transfer-eml-address').value;
    }

    if(shared){
        if(owned){
            document.getElementById('status-display-shared').innerHTML='shared with '+document.getElementById('share-eml-address').innerHTML;
        }else{
            document.getElementById('status-display-shared').innerHTML='shared with you';
        }

    }else{
        document.getElementById('status-display-shared').innerHTML='not shared';
    }

    // ==== panels - generic ====================================================
    rowNames.forEach((rowName) =>{

        // ==== get panel
        element=document.getElementById(rowName);

        // ---- ghosting
        if(panel[rowName]['ghosted']){
            element.classList.add('ghosted');
            [...element.getElementsByClassName('row-click-target')].forEach((target)=>hide(target));
        }else{
            element.classList.remove('ghosted');
            [...element.getElementsByClassName('row-click-target')].forEach((target)=>unhide(target))
        }

        // ---- plus-minus
        result='+';
        if(panel[rowName]['open']){
            result='-';
        }
        element.getElementsByClassName('plus-minus')[0].innerHTML=result;

        // ---- title
        switch (rowName){
            case 'period':
                result="Period / Create";
                break;
            case 'options':
                if(agent){
                    result="Transfer / Share";
                }else{
                    result="Share";
                }
                break;
            case 'credit':
                if(credited){
                    result="Periods / Credits";
                }else{
                    if(creditRequired){
                        result="Periods / Credits <span class='smaller'>(required)</span>";
                    }else{
                        result="Periods / Credits <span class='smaller'>(not yet required)</span>";
                    }
                }
                break;
            case 'share':
                result="Share Cashbook";
                break;
            case 'bankfeed':
                result="Bank Feed";
                break;
            case'edit':
                result="Edit Cashbook";
                break;
            default:
                result=rowName.charAt(0).toUpperCase() + rowName.slice(1);
        }
        element.getElementsByClassName('title')[0].innerHTML=result;

        // ---- tick
        result='<i class="fa-solid fa-circle" style="visibility: hidden;"></i>';
        if(panel[rowName]['tick']==='tick'){
            result='<i class=\"fa-solid fa-circle-check\"></i>';
        }
        if(panel[rowName]['tick']==='dash'){
            result='<i class="fa-solid fa-circle-minus"></i>';
        }
        if(panel[rowName]['tick']==='excl'){
            result='<i class="fa-solid fa-circle-exclamation"></i>';
        }
        element.getElementsByClassName('tick')[0].innerHTML=result;

        // ---- expanded
        if(panel[rowName]['open']){
            [...element.getElementsByClassName('expanded')].forEach((element) => unhide(element));
            [...element.getElementsByClassName('expanded-negative')].forEach((element) => hide(element));
        }else{
            [...element.getElementsByClassName('expanded')].forEach((element) => hide(element));
            [...element.getElementsByClassName('expanded-negative')].forEach((element) => unhide(element));
        }

        // ---- lock the panel
        if(panel[rowName]['locked']===true){
            lockPanel(rowName);
        }else{
            unlockPanel(rowName);
        }

    });


    // ==== Business panel ====================================================

    // ---- select-tax-filer button caption
    if(agent){
        document.getElementById('select-tax-filer').innerHTML='SELECT EXISTING CLIENT';
    }else{
        document.getElementById('select-tax-filer').innerHTML='SELECT EXISTING TAX FILER';
    }

    // ---- show/hide business-type-notes
    if(panel['business']['completed']){
        hide(document.getElementById('business-type-notes'));
    }else{
        unhide(document.getElementById('business-type-notes'));
    }

    if(!panel['business']['locked']){

        // ---- select-tax-filer
        if(businessType){
            document.getElementById('select-tax-filer').disabled=false;
        }else{
            document.getElementById('select-tax-filer').disabled=true;
        }

        // ---- businesstype
        document.getElementById('business-type').value = businessType;

        // ---- hideOnBusinessType
        [...document.getElementsByClassName('hideOnBusinessType')].forEach((element) => {
            hide(element);
        });
        [...document.getElementsByClassName(businessType)].forEach((element) => {
            unhide(element);
        });

        // ---- Pre-fill VAT registered
        if(businessType==='vatOnly'){
            document.getElementById('taxfiler-vatregistered').value='yes';
            document.getElementById('taxfiler-vatregistered').disabled=true;
            document.getElementById('taxfiler-vatregistered').classList.remove('missing');
            document.getElementById('taxfiler-vrn').value=document.getElementById('taxfiler-utr').value;
            document.getElementById('taxfiler-vrn').disabled=true;
            document.getElementById('taxfiler-vrn').classList.remove('missing');
        }else{
            document.getElementById('taxfiler-vatregistered').disabled=false;
            document.getElementById('taxfiler-vrn').disabled=false;
        }

        // ---- Show/hide only-if-vat-registered
        if(document.getElementById('taxfiler-vatregistered').value==='yes'){
            [...document.getElementsByClassName('only-if-vat-registered')].forEach((element) => unhide(element));
        }else{
            [...document.getElementsByClassName('only-if-vat-registered')].forEach((element) => {
                hide(element);
            });
        }

        // ---- show/hide flatrate box
        // if(document.getElementById('taxfiler-vatscheme1').value==='flatRate'){
        //     document.getElementById('taxfiler-vatflatrate1').disabled=false;
        //     hide(document.getElementById('taxfiler-vatflatrate1-wrapper'));
        // }else{
        //     document.getElementById('taxfiler-vatflatrate1').disabled=true;
        //     element.classList.remove('missing');
        //     unhide(document.getElementById('taxfiler-vatflatrate1-wrapper'));
        // }
        if(document.getElementById('taxfiler-vatscheme2').value==='flatRate'){
            document.getElementById('taxfiler-vatflatrate2').disabled=false;
            unhide(document.getElementById('taxfiler-vatflatrate2-wrapper'));
        }else{
            document.getElementById('taxfiler-vatflatrate2').disabled=true;
            element.classList.remove('missing');
            hide(document.getElementById('taxfiler-vatflatrate2-wrapper'));
        }



        // ---- enable action button
        entity=document.getElementById('set-period');
        if(
            document.getElementById('business-type').value &&
            document.getElementById('business').getElementsByClassName('missing').length===0
        ){
            entity.disabled=false;
        }else{
            entity.disabled=true;
        }

}

    // ==== Period panel ====================================================

    // // ---- set from year from to year
    // document.getElementById('period-from-year').value=document.getElementById('period-to-year').value-1;
    //
    // // ---- set period from and to
    // document.getElementById('period-from').value=document.getElementById('period-from-days').value+'/'+document.getElementById('period-from-year').value;
    // document.getElementById('period-to').value=document.getElementById('period-to-days').value+'/'+document.getElementById('period-to-year').value;
    //
    // // ---- set overviewPeriod
    // overviewPeriod=document.getElementById('period-from').value+' - '+ document.getElementById('period-to').value;
    //
    // // ---- set credit dates
    // document.getElementById('credit-period-short').innerHTML=document.getElementById('period-from-year').value+'/'+document.getElementById('period-to-year').value.substring(2);
    // document.getElementById('credit-period-long').innerHTML=overviewPeriod.replace(' - ',' to ');



    // ==== Options panel ====================================================

    // ---- Populate transfer-eml-address
    // if(document.getElementById('transfer-eml-address').value ===''){
    //     document.getElementById('transfer-eml-address').value=document.getElementById('taxfiler-email').value;
    // }

    // ---- Populate share-eml-address
    // if(document.getElementById('share-eml-address').value ==='' && agent){
    //     document.getElementById('share-eml-address').value=document.getElementById('taxfiler-email').value;
    // }

    // ---- Populate transfer-status-display
    let label='';
    let label2='';
    let ownershipTitle='';
    let buttonText='';

    document.getElementById('send-transfer-invitation').classList.remove('btn-outline-primary');
    document.getElementById('send-transfer-invitation').classList.add('btn-primary');
    document.getElementById('transfer-controls').classList.add('mb-3','p-2','pt-0','blue');

    if(transferred){
        label2=document.getElementById('transfer-eml-address').value.toUpperCase()+' OWNS THIS CASHBOOK<br/><span class="small">They are sharing it with you</span>';
        ownershipTitle=document.getElementById('transfer-eml-address').value.toUpperCase()+' OWNS THIS CASHBOOK<br/><span class="small">They are sharing it with you</span>';
        buttonText='';
        hide(document.getElementById('transfer-eml-address'));
        hide(document.getElementById('send-transfer-invitation'));
        // unhide(document.getElementById('agent-unshare-cashbook'));
        document.getElementById('accept-transfer').hidden=true;
    }else{
        if(transferDeclined){
            label2='YOU OWN THIS CASHBOOK<br/><span class="small">'+document.getElementById('transfer-eml-address').value+' has declined the transfer request</span>';
            ownershipTitle='YOU OWN THIS CASHBOOK<br/><span class="small">'+document.getElementById('transfer-eml-address').value+' has declined the transfer request</span>';
            buttonText='SEND ANOTHER TRANSFER INVITATION TO:';
            unhide(document.getElementById('transfer-eml-address'));
            unhide(document.getElementById('send-transfer-invitation'));
            // hide(document.getElementById('agent-unshare-cashbook'));
            document.getElementById('accept-transfer').hidden=true;
        }else{
            if(transferRequested){
                label2='YOU OWN THIS CASHBOOK<br/><span class="small">Invitation to transfer (and share) this cashbook has been sent to '+document.getElementById('transfer-eml-address').value+' but not yet accepted.</span>';
                ownershipTitle='YOU OWN THIS CASHBOOK<br/><span class="small">Invitation to transfer (and share) this cashbook has been sent to '+document.getElementById('transfer-eml-address').value+' but not yet accepted.</span>';
                buttonText='CANCEL INVITATION';
                hide(document.getElementById('transfer-eml-address'));
                unhide(document.getElementById('send-transfer-invitation'));
                // hide(document.getElementById('agent-unshare-cashbook'));
                document.getElementById('accept-transfer').hidden=false;
                document.getElementById('send-transfer-invitation').classList.add('btn-outline-primary');
                document.getElementById('send-transfer-invitation').classList.remove('btn-primary');
                document.getElementById('transfer-controls').classList.remove('mb-3','p-2','pt-0','blue');
            }else{
                label2='YOU OWN THIS CASHBOOK';
                ownershipTitle='YOU OWN THIS CASHBOOK<br/><span class="small">Cashbook not currently shared</span>';
                buttonText='SEND TRANSFER INVITATION TO:';
                unhide(document.getElementById('transfer-eml-address'));
                unhide(document.getElementById('send-transfer-invitation'));
                // hide(document.getElementById('agent-unshare-cashbook'));
                document.getElementById('accept-transfer').hidden=true;
            }
        }
    }

    document.getElementById('options-ownership-title').innerHTML=ownershipTitle;

    // document.getElementById('options-ownership-label').innerHTML=label2;
    document.getElementById('send-transfer-invitation').innerHTML=buttonText;

    // ---- enable transfer button
    if(document.getElementById('transfer-eml-address').value==='' || panel['options']['locked']===true){
        document.getElementById('send-transfer-invitation').disabled=true;
    }else{
        document.getElementById('send-transfer-invitation').disabled=false;
    }


    // ---- Populate share-status-display
    label='';
    label2='';
    buttonText='';

    document.getElementById('send-share-invitation').classList.remove('btn-outline-primary');
    document.getElementById('send-share-invitation').classList.add('btn-primary');
    document.getElementById('share-controls').classList.add('mb-3','p-2','pt-0','blue');

    if(shared){
        if(owned){
            label2='You are sharing this cashbook with '+document.getElementById('share-eml-address').value;
            ownershipTitle='YOU OWN THIS CASHBOOK<br/><span class="small">You are sharing this cashbook with '+document.getElementById('share-eml-address').value+'</span>';
        }else{
            label2=document.getElementById('transfer-eml-address').value+' is sharing this cashbook with you'
            ownershipTitle=document.getElementById('transfer-eml-address').value.toUpperCase()+' OWNS THIS CASHBOOK<br/><span class="small">They are sharing this cashbook with you'
        }

        buttonText='';
        hide(document.getElementById('share-eml-address'));
        hide(document.getElementById('send-share-invitation'));
        unhide(document.getElementById('unshare-cashbook'));
        document.getElementById('accept-share').hidden=true;

        // hide(document.getElementById('enable-sharing-wrapper'));
    }else{
        if(shareDeclined){
            label2=document.getElementById('share-eml-address').value+' has declined the share request';
            ownershipTitle='YOU OWN THIS CASHBOOK<br/><span class="small">'+document.getElementById('share-eml-address').value+' has declined the share request</span>';
            buttonText='SEND ANOTHER SHARE INVITATION TO:';
            unhide(document.getElementById('share-eml-address'));
            unhide(document.getElementById('send-share-invitation'));
            hide(document.getElementById('unshare-cashbook'));
            document.getElementById('accept-share').hidden=true;

            // unhide(document.getElementById('enable-sharing-wrapper'));
        }else{
            if(shareRequested){
                label2='Invitation to share this cashbook has been sent to '+document.getElementById('share-eml-address').value+' but not yet accepted';
                ownershipTitle='YOU OWN THIS CASHBOOK<br/><span class="small">Invitation to share this cashbook has been sent to '+document.getElementById('share-eml-address').value+' but not yet accepted</span>';
                buttonText='CANCEL INVITATION';
                hide(document.getElementById('share-eml-address'));
                unhide(document.getElementById('send-share-invitation'));
                hide(document.getElementById('unshare-cashbook'));
                document.getElementById('accept-share').hidden=false;

                // hide(document.getElementById('enable-share-wrapper'));

                document.getElementById('send-share-invitation').classList.add('btn-outline-primary');
                document.getElementById('send-share-invitation').classList.remove('btn-primary');

                document.getElementById('share-controls').classList.remove('mb-3','p-2','pt-0','blue');

            }else{
                label2='Cashbook not shared';
                ownershipTitle='YOU OWN THIS CASHBOOK<br/><span class="small">Cashbook currently not shared</span>';
                buttonText='SEND SHARE INVITATION TO:';
                unhide(document.getElementById('share-eml-address'));
                unhide(document.getElementById('send-share-invitation'));
                hide(document.getElementById('unshare-cashbook'));
                document.getElementById('accept-share').hidden=true;

                // unhide(document.getElementById('enable-sharing-wrapper'));
            }
        }
    }


    // document.getElementById('share-sharing-label').innerHTML=label2.toUpperCase();
    document.getElementById('send-share-invitation').innerHTML=buttonText;
    if(document.getElementById('enable-sharing').checked){
        document.getElementById('options-ownership-title').innerHTML=ownershipTitle;
    }

    // ---- enable share button
    if(document.getElementById('share-eml-address').value==='' || panel['options']['locked']===true){
        document.getElementById('send-share-invitation').disabled=true;
    }else{
        document.getElementById('send-share-invitation').disabled=false;
    }

    // ---- show/hide options and notes
    if(!owned || shared){
        hide(document.getElementById('enable-transfer-wrapper'));
        hide(document.getElementById('enable-sharing-wrapper'));
        hide(document.getElementById('enable-noshare-wrapper'));

        hide(document.getElementById('transfer-required-notes'));
        hide(document.getElementById('share-required-notes'));
        hide(document.getElementById('transfer-share-not-required-notes'));

    }else{
        // ---- show/hide options
        if(transferRequested || shareRequested){
            hide(document.getElementById('enable-transfer-wrapper'));
            hide(document.getElementById('enable-sharing-wrapper'));
            hide(document.getElementById('enable-noshare-wrapper'));

            hide(document.getElementById('transfer-required-notes'));
            hide(document.getElementById('share-required-notes'));
            hide(document.getElementById('transfer-share-not-required-notes'));
        }else{
            unhide(document.getElementById('enable-transfer-wrapper'));
            unhide(document.getElementById('enable-sharing-wrapper'));
            unhide(document.getElementById('enable-noshare-wrapper'));

            // ---- show/hide notes
            if(document.getElementById('enable-transfer').checked){
                unhide(document.getElementById('transfer-required-notes'));
                hide(document.getElementById('share-required-notes'));
                hide(document.getElementById('transfer-share-not-required-notes'));
            }else{
                if(document.getElementById('enable-sharing').checked){
                    hide(document.getElementById('transfer-required-notes'));
                    unhide(document.getElementById('share-required-notes'));
                    hide(document.getElementById('transfer-share-not-required-notes'));
                }else{
                    if(document.getElementById('enable-nothing').checked){
                        hide(document.getElementById('transfer-required-notes'));
                        hide(document.getElementById('share-required-notes'));
                        unhide(document.getElementById('transfer-share-not-required-notes'));
                    }else{
                        hide(document.getElementById('transfer-required-notes'));
                        hide(document.getElementById('share-required-notes'));
                        hide(document.getElementById('transfer-share-not-required-notes'));
                    }
                }
            }
        }


    }



    // ---- show/hide the newly-created-label
    if(showNewlyCratedLabel){
        unhide(document.getElementById('newly-created-label'));
    }else{
        hide(document.getElementById('newly-created-label'));
    }


    // ---- enable action button
    entity=document.getElementById('options-continue');
    if(panel['options']['locked']===true){
        entity.disabled=true;
    }else{
        if(
            (
                document.getElementById('enable-transfer').checked ||
                document.getElementById('enable-sharing').checked ||
                document.getElementById('enable-nothing').checked
            )
            // &&
            // (
            //     document.getElementById('bankfeed-required').checked ||
            //     document.getElementById('bankfeed-not-required').checked
            // )
        ){
            entity.disabled=false;
        } else{
            entity.disabled=true;
            if(panel['options']['completed']){
                panel['options']['completed']=false;
                panel['options']['tick']='';
                overviewRefresh();
            }
        }

    }






    // ==== Credit panel ====================================================

    // ---- set from year from to year
    document.getElementById('period-from-year').value=document.getElementById('period-to-year').value-1;

    // ---- set period from and to
    document.getElementById('period-from').value=document.getElementById('period-from-days').value+'/'+document.getElementById('period-from-year').value;
    document.getElementById('period-to').value=document.getElementById('period-to-days').value+'/'+document.getElementById('period-to-year').value;

    // ---- set overviewPeriod
    overviewPeriod=document.getElementById('period-from').value+' - '+ document.getElementById('period-to').value;

    // ---- set credit dates
    document.getElementById('credit-period-short').innerHTML=document.getElementById('period-from-year').value+'/'+document.getElementById('period-to-year').value.substring(2);
    document.getElementById('credit-period-long').innerHTML=overviewPeriod.replace(' - ',' to ');



    // ---- deal with bankfeed-notes
    if(bankfeedRequired && !credited){
        unhide(document.getElementById('bankfeed-notes'));
        unhide(document.getElementById('bankfeed-notes-2'));
    }else{
        hide(document.getElementById('bankfeed-notes'));
        hide(document.getElementById('bankfeed-notes-2'));
    }

    // ---- determine if credit is required
    if(bankfeedRequired ||hasBankfeeds || turnover>turnoverThreshold){
        if(!creditRequired){
            creditRequired=true;
                overviewRefresh();
        }
    }else{
        if(creditRequired){
            creditRequired=false;
            overviewRefresh();
        }
    }

    // ---- populate credit-label and populate credit-action-button-note-agent
    let creditLabelTitle;
    let creditLabelBody;
    let creditButtonLabel='CREDIT';
    let noteText='';
    if(credited){
        creditLabelTitle='CREDITED';
        creditLabelBody='A credit has already been applied for this year.';
        noteText='A credit has already been applied for this year.<br/>Click below to continue.';
        if(panel['credit']['tick']!=='tick'){
            panel['credit']['tick']='tick';
            overviewRefresh();
        }
    }else{
        if(!creditRequired) {
            creditLabelTitle = 'CREDIT NOT YET REQUIRED';
            creditLabelBody = 'The cashbook may be used for free until the total revenue for the tax year exceeds '+formatPounds(turnoverThreshold)+', and while no bank feeds are not enabled.<br/>If you intend to enable bank feeds now, you should apply a credit here.';
            if(!document.getElementById('apply-credit-anyway').checked){
                creditButtonLabel='CONTINUE';
            }
            noteText = 'The cashbook may currently be used with or without assigning a credit.<br/>Click to assign a credit from this account, or continue below to edit the cashbook.';
            if(panel['credit']['completed']){
                if(panel['credit']['tick']!=='tick'){
                    panel['credit']['tick']='tick';
                    overviewRefresh();
                }
            }else{
                if(panel['credit']['tick']!==''){
                    panel['credit']['tick']='';
                    overviewRefresh();
                }
            }

        }else{
            // credit is required
            if((hasBankfeeds||bankfeedRequired) && !(turnover>turnoverThreshold)){
                creditLabelTitle='CREDIT REQUIRED';
                creditLabelBody='The cashbook may be used for free until the total revenue for the tax year exceeds '+formatPounds(turnoverThreshold)+', and while bank feeds are not enabled.<br/>Bank feeds have been enabled below, so a credit needs to be assigned for the cashbook to operate.';
                noteText='Click to assign a credit from this account.'
                if(panel['credit']['tick']!=='excl'){
                    panel['credit']['tick']='excl';
                    overviewRefresh();
                }
            }
            if(!(hasBankfeeds||bankfeedRequired) && (turnover>turnoverThreshold)){
                creditLabelTitle='CREDIT REQUIRED';
                creditLabelBody='The cashbook may be used for free until the total revenue for the tax year exceeds '+formatPounds(turnoverThreshold)+', and while bank feeds are not enabled.<br/>A credit needs to be assigned as total revenue for the tax year now exceeds '+formatPounds(turnoverThreshold)+'.';
                noteText='Click to assign a credit from this account.'
                if(panel['credit']['tick']!=='excl'){
                    panel['credit']['tick']='excl';
                    overviewRefresh();
                }
            }

            if((hasBankfeeds||bankfeedRequired) && (turnover>turnoverThreshold)){
                creditLabelTitle='CREDIT REQUIRED';
                creditLabelBody='The cashbook may be used for free until the total revenue for the tax year exceeds '+formatPounds(turnoverThreshold)+', and while no bank feeds are not enabled.<br/>A credit needs to be assigned as total revenue for the tax year now exceeds '+formatPounds(turnoverThreshold)+' and a bank feed has been setup.';
                noteText='Click to assign a credit from this account.'
                if(panel['credit']['tick']!=='excl'){
                    panel['credit']['tick']='excl';
                    overviewRefresh();
                }
            }
        }
    }

    // ---- enable action button
    entity=document.getElementById('credit-continue');
    if(panel['credit']['locked']===true){
        entity.disabled=true;
    }else{
        if(credited){
            entity.disabled=true;
        } else{
            entity.disabled=false;
        }

    }

    document.getElementById('credit-label-title').innerHTML=creditLabelTitle;
    document.getElementById('credit-label-body').innerHTML=creditLabelBody;
    document.getElementById('credit-action-button-note-agent').innerHTML=noteText;
    document.getElementById('credit-continue').innerHTML=creditButtonLabel;



    // ==== Bankfeed panel ====================================================

    // ---- deal with bankfeed-controls
    // if(agent && !ignoreBankfeedWarning){
    //     [...document.getElementsByClassName('bankfeed-controls')].forEach((element) => hide(element));
    //     [...document.getElementsByClassName('bankfeed-controls-negative')].forEach((element) => unhide(element));
    // }else{
    //     [...document.getElementsByClassName('bankfeed-controls')].forEach((element) => unhide(element));
    //     [...document.getElementsByClassName('bankfeed-controls-negative')].forEach((element) => hide(element));
    // }

    // ---- enable add-bank-feed button
    entity=document.getElementById('add-bank-feed');
    if(panel['bankfeed']['locked']!==true  && bankfeedRequired && credited){
        entity.disabled=false;
    }else{
        entity.disabled=true;
    }
    entity.innerHTML='ADD BANK FEED';

    // ---- show/hide bank feeds
    for (let i=0;i<panel['bankfeed']['display'].length;i++){
        element=document.getElementById('bank-feed-'+i);
        if(panel['bankfeed']['display'][i]===true){
            unhide(element);
        }else
        {
            hide(element);
        }
    }

    // ---- set hasBankfeeds
    hasBankfeeds=false;
    for(let i = 0; i<panel['bankfeed']['display'].length;i++){
        if(panel['bankfeed']['display'][i]===true){
            hasBankfeeds = true;
        }
    }

    // ---- populate bankfeed-action-button-note
    noteText = 'Either setup a bank feed, or disable bank feeds to confirm this is not required.';

    if(hasBankfeeds){
        noteText='Click below when all required bank feeds have been setup and authorised.'
    }

    if(!bankfeedRequired){
        noteText='All transactions, invoices, and bills must be entered manually.';
    }
    document.getElementById('bankfeed-action-button-note').innerHTML=noteText;

    // ---- reset completed if needed
    if(panel['bankfeed']['completed']){
        if(!agent && !document.getElementById('bankfeed-not-required').checked && !hasBankfeeds){
            panel['bankfeed']['completed']=false;
            // console.log('AAAA');
        }
    }

    // ---- populate tick
    if(!panel['bankfeed']['completed'] && panel['bankfeed']['tick']!==''){
        panel['bankfeed']['tick']='';
        overviewRefresh();
    }else{
        if(panel['bankfeed']['completed'] && panel['bankfeed']['tick']!=='tick'){
            panel['bankfeed']['tick']='tick';
        }
    }

    // ---- enable action button
    entity=document.getElementById('bankfeed-continue');
    if(panel['bankfeed']['locked']===true){
        entity.disabled=true;
    }else{
        if(!bankfeedRequired){
            entity.disabled=false;
        }else{
            if(!hasBankfeeds && !credited){
                entity.disabled=true;
                if(panel['bankfeed']['completed']) {
                    panel['bankfeed']['completed'] = false;
                    panel['bankfeed']['tick'] = '';
                    overviewRefresh();
                }
            }else{
                entity.disabled=false;
            }
        }
    }


    // ==== Edit panel ====================================================



    // ==== Pdfcopy panel ====================================================
    // if(document.getElementById('pdfcopy-not-required').checked){
    //     document.getElementById('pdfcopy-type').disabled=true;
    //     document.getElementById('generate-pdfcopy').disabled=true;
    // }else{
    //     document.getElementById('pdfcopy-type').disabled=false;
    //     document.getElementById('generate-pdfcopy').disabled=false;
    // }
    //
    // if(document.getElementById('pdfcopy-not-required').checked || pdfcopied){
    //     if(!panel['pdfcopy']['completed']){
    //         panel['pdfcopy']['completed']=true;
    //         panel['pdfcopy']['tick']='tick';
    //         overviewRefresh();
    //     }
    // }else{
    //     if(panel['pdfcopy']['completed']){
    //         panel['pdfcopy']['completed']=false;
    //         panel['pdfcopy']['tick']='';
    //         overviewRefresh();
    //     }
    // }

    // ======================================================================
    // ==== taxFilerName ====================================================
    [...document.getElementsByClassName('taxFilerName')].forEach((element) => element.innerHTML=taxFilerName);

    // ==== overviewPeriod
    if(panel['period']['completed']){
        [...document.getElementsByClassName('overviewPeriod')].forEach((element) => element.innerHTML=overviewPeriod);
    }

    showNewlyCratedLabel=false;
}