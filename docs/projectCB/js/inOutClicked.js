function inClicked() {
    if(settings['inOnly']===false){
        settings['inOnly']=true;
        settings['outOnly']=false;
    }else{
        settings['inOnly']=false;
        settings['outOnly']=false;
    }
}

////////////////////////////////////////////////
function outClicked() {
    if(settings['outOnly']===false){
        settings['inOnly']=false;
        settings['outOnly']=true;
    }else{
        settings['inOnly']=false;
        settings['outOnly']=false;
    }
}