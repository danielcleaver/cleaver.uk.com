function lockPanel(panel){

    // console.log('lock ',panel);

    // ==== get panel
    let element=document.getElementById(panel);

    // inputs
    [...element.getElementsByTagName('input')].forEach((input) => {
        if(input.type==="checkbox"){
            input.disabled = true;
        }else{
            // input.readOnly = true;
            input.disabled = true;
        }
    });

    // selects
    [...element.getElementsByTagName('select')].forEach((input) => {
        input.disabled = true;
    });

    // non-action buttons
    [...element.getElementsByTagName('button')].forEach((input) => {
        input.disabled = true;
    });

    // action button
    [...element.getElementsByClassName('overview-content-row-action-button')].forEach((input) => {
        input.disabled = true
    });

}


//////////////////////////////////////////
function unlockPanel(panel){

     // console.log('unlock ',panel);

    // ==== get panel
    let element=document.getElementById(panel);

    // inputs
    [...element.getElementsByTagName('input')].forEach((input) => {
        if(input.getAttribute('data-readonly')===''){
            if(input.type==="checkbox"){
                input.disabled = true;
            }else{
                // input.readOnly = true;
                input.disabled = true;
            }
            input.readOnly = true;
        }else{
            if(input.type==="checkbox"){
                input.disabled = false;
            }else{
                // input.readOnly = false;
                input.disabled = false;
            }
        }
    });

    // selects
    [...element.getElementsByTagName('select')].forEach((input) => {
        if(input.getAttribute('data-readonly')===''){
            input.disabled = true;
        }else{
            input.disabled = false;
        }
    });

    // non-action buttons
    [...element.getElementsByTagName('button')].forEach((input) => {
        if(input.getAttribute('data-readonly')===''){
            input.disabled = true;
        }else{
            input.disabled = false;
        }
    });

    // action button
    [...element.getElementsByClassName('overview-content-row-action-button')].forEach((input) => {
        if(input.getAttribute('data-readonly')===''){
            input.disabled = true;
        }else{
            input.disabled = false;
        }
    });

}