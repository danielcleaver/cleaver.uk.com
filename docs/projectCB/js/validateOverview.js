function validateOverview(){

    let entity=document.getElementsByClassName('required');
    if(entity){
        [...entity].forEach((element) => {
            // console.log(element.id);
            // console.log(businessType);

            // deal with specials
            if(
                element.id==='business-type'
            ){
                if(element.value===''){
                    element.classList.add('missing');
                }else{
                    element.classList.remove('missing');
                }

            }

            if(
                element.id==='taxfiler-title' ||
                element.id==='taxfiler-firstname' ||
                element.id==='taxfiler-surname'
            ){
                if(
                    businessType!=='selfAssessmentSa100' &&
                    businessType!=='selfAssessmentItsa'
                    // businessType!=='selfEmployedSa100' &&
                    // businessType!=='selfEmployedItsa' &&
                    // businessType!=='landlordSa100' &&
                    // businessType!=='landlordItsa'
                ){
                    element.classList.remove('missing');
                    return;
                }
            }

            if(document.getElementById('taxfiler-vatregistered').value!=='yes'){
                if(
                    element.id==='taxfiler-vatscheme1' ||
                    element.id==='taxfiler-vatscheme2' ||
                    element.id==='taxfiler-vrn' ||
                    element.id==='taxfiler-vatflatrate1' ||
                    element.id==='taxfiler-vatflatrate2'
                ){
                    element.classList.remove('missing');
                    return
                }
            }

            if(document.getElementById('business-type').value!=='vatOnly'){
                if(
                    element.id==='taxfiler-accountingmethod1' ||
                    element.id==='taxfiler-vatscheme1' ||
                    element.id==='taxfiler-vatflatrate1'
                ){
                    element.classList.remove('missing');
                    return
                }
                if(
                    element.id==='taxfiler-vatflatrate2' &&
                    document.getElementById('taxfiler-vatscheme2').value!=='flatRate'
                ){
                    element.classList.remove('missing');
                    return
                }
            }else{
                if(
                    element.id==='taxfiler-accountingmethod2' ||
                    element.id==='taxfiler-vatscheme2' ||
                    element.id==='taxfiler-vatflatrate2'
                ){
                    element.classList.remove('missing');
                    return
                }
                if(
                    element.id==='taxfiler-vatflatrate1' &&
                    document.getElementById('taxfiler-vatscheme1').value!=='flatRate'
                ){
                    element.classList.remove('missing');
                    return
                }
            }


            if(!element.value){
                element.classList.add('missing');
            }else{
                element.classList.remove('missing');
            }
        });
    }

    overviewRefresh();

}


function touch(element){
    element.setAttribute('data-touched', true);
}