function overviewToggleTurnover(){
    if(turnover===8000){
        turnover=12000;
    }else{
        turnover=8000;
    }
    overviewRefresh();
}

////////////////////////////////////////////////////

function overviewToggleDevnotes(){
    showDevnotes=!showDevnotes;
    overviewRefresh();
}