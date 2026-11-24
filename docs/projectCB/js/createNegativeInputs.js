function inverseDisplayFieldChanged(element){
    // console.log(element.classList);
    // find class which contains '-INVERSEDISPLAY'
    let classname='';
    element.classList.forEach((cls) => {
        if(cls.endsWith('-INVERSEDISPLAY')){
            classname=cls.replace('-INVERSEDISPLAY','');
        }
    });

    if(classname===''){
        return;
    }

    const trueInput=element.parentNode.getElementsByClassName(classname)[0];

    if(!trueInput){
        return;
    }

    if(element.value===''){
        trueInput.value='';
    }else{
        trueInput.value=-Number(element.value);
    }


    trueInput.dispatchEvent(new Event('change'));
    // console.log(classname);
}