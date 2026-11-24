let flagData=[];

flagData[0]=[];
flagData[0]['label']="";

flagData[1]=[];
flagData[1]['label']="Blue";

flagData[2]=[];
flagData[2]['label']="Green";

flagData[3]=[];
flagData[3]['label']="Red";

flagData[4]=[];
flagData[4]['label']="Yellow";

flagData[5]=[];
flagData[5]['label']="Orange";

flagData[6]=[];
flagData[6]['label']="Purple";

/////////////////////////////////////////////
function getFlagIndexFromEntry(entry){
    let index=0;
    for(let i=0;i<flagData.length;i++){
        if(flagData[i]===entry){
            index=i;
        }
    }
    return String(index);
}
/////////////////////////////////////////////
function manageFlags(){
    alert('Show flags and allow users to manage them');
}
/////////////////////////////////////////////
function flagItem(id){
    showFlagChooser(getEntryIndexFromId(id));
}

/////////////////////////////////////////////
function unflagItem(id){
    // entryData[getEntryIndexFromId(id)]['flag']='0';
    // refreshEntryList();
    showFlagChooser(getEntryIndexFromId(id));
}

/////////////////////////////////////////////
function getEntryIndexFromId(id){
    for(let i=0; i<entryData.length; i++){
        // console.log(entryData[i]);
        if(entryData[i]['guid']===id) {
           return i;
        }
    }
    return -1;
}
/////////////////////////////////////////////
function showFlagChooser(id){
    // instanciate new modal
    var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function() {
            console.log('modal open');
        },
        onClose: function() {
            refreshEntryList();
            console.log('modal closed');
        },
        beforeClose: function() {
            // here's goes some logic
            // e.g. save content before closing the modal
            return true; // close the modal
            return false; // nothing happens
        }
    });

    // set content
    var content='<div class="flag-chooser p-3 pe-3">';
    content+='<h2>Choose a flag </h2>';

    content+='<p class="small mb-3">Click the flag to assign to this entry</p>';

    content+='<div class="flag-row flag--1 mb-2">';
    content+='    <i class="fa-regular fa-flag"></i> ';
    content+='    <input type="text" class="form-control input-12 d-inline-block" id="flag-name-field-0" readonly aria-label="Label" value="No flag">';
    content+='<div id="flag-click-target-0" class="flag-click-target" onclick="assignFlag('+id+',0);"></div>';
    content+='</div>';

    for(let i=1;i<flagData.length;i++){
        content+='<div class="flag-row flag-'+i+' mb-2">';
        content+='    <i class="fa-solid fa-flag"></i> ';
        content+='    <input type="text" class="form-control input-12 d-inline-block" id="flag-name-field-'+i+'" readonly aria-label="Label" value="'+flagData[i]['label']+'">';
        content+='<div id="flag-click-target-'+i+'" class="flag-click-target" onclick="assignFlag('+id+','+i+');"></div>';
        content+='</div>';
    }


    content+='</div>';

    modal.setContent(content);

    //add a button
    modal.addFooterBtn('<i class="fa-solid fa-pencil"></i> Edit', 'edit-flags-button btn btn-outline-primary btn-sm me-3', function() {
        // here goes some logic
        editFlagNames();
    });
    //add a button
    modal.addFooterBtn('<i class="fa-solid fa-check"></i> Done', 'unedit-flags-button btn btn-outline-primary btn-sm me-3', function() {
        // here goes some logic
        unEditFlagNames();
    });

    // add another button
    modal.addFooterBtn('Close', 'btn btn-primary btn-sm', function() {
        // here goes some logic
        modal.close();
    });

    // open modal
    modal.open();
}

/////////////////////////////////////////////
function assignFlag(id, category){
    entryData[id]['flag']=category.toString();
}
/////////////////////////////////////////////
function editFlagNames(){
    for(let i=1;i<flagData.length;i++) {
        document.getElementById('flag-name-field-'+i).readOnly=false;
    }
    for(let i=0;i<flagData.length;i++) {
        document.getElementById('flag-click-target-' + i).style.display = "none";
    }
    document.getElementsByClassName('edit-flags-button')[0].style.display="none";
    document.getElementsByClassName('unedit-flags-button')[0].style.display="inline-block";
}
/////////////////////////////////////////////
function unEditFlagNames(){
    for(let i=1;i<flagData.length;i++) {
        document.getElementById('flag-name-field-'+i).readOnly=true;
    }
    for(let i=0;i<flagData.length;i++) {
        document.getElementById('flag-click-target-' + i).style.display = "block";
    }
    document.getElementsByClassName('edit-flags-button')[0].style.display="inline-block";
    document.getElementsByClassName('unedit-flags-button')[0].style.display="none";

    // store values
    for(let i=1;i<flagData.length;i++) {
        flagData[i]['label']=document.getElementById('flag-name-field-'+i).value;
    }
}