function overviewToggleRow(rowName){
    panel[rowName]['open']=!panel[rowName]['open'];
    overviewRefresh();
}