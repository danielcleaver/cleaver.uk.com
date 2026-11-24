function populate(element,s){
     // console.log('xxx populate',element.classList,element.nodeName,element.value);

    switch(element.nodeName){
        case 'INPUT':
            // for inputs that are not disabled, only overwrite value if they are empty
            if((element.value==='' && element.type!=='checkbox')||element.disabled){

                if(element.type==='checkbox'){
                    element.checked=s;
                    break;
                }else{
                    if(element.classList.contains('amount-input')){
                        element.value=s.replace('£','').replaceAll(',','');

                        // look for INVERSEDISPLAY fields
                        element.classList.forEach((cls)=>{
                            [...element.parentNode.getElementsByClassName(cls+'-INVERSEDISPLAY')].forEach((INVERSEDISPLAYelement) => {
                                if(isNaN(Number(s.replace('£','').replaceAll(',','')))){
                                    INVERSEDISPLAYelement.value=s;
                                }else{
                                    INVERSEDISPLAYelement.value=(0-Number(s.replace('£','').replaceAll(',',''))).toFixed(2);
                                }

                            });
                        });
                        break;
                    }
                    element.value=s;
                    break;
                }
            }
            if(element.type==='checkbox'){
                element.checked=s;
            }
            break;
        case 'SELECT':
            element.value=s;
            break;
        default:
            element.innerHTML=s;
    }
}