function addBankFeed(){

  for(let i=0;i<panel['bankfeed']['display'].length;i++){
      if(panel['bankfeed']['display'][i]===false){
          panel['bankfeed']['display'][i]=true;
          overviewRefresh();
          return
      }
  }

  alert('This demo does not contain any more bank feeds.');

}



////////////////////////////////////////////////////////////////
function addBankFeedAgentIntercept(){
    if(agent){
        if(confirm('WARNING!\n\nYou should share this Cashbook with your client to add their own bank feeds.\nThey will be responsible for re-authorising their bank feeds (usually every 90 days) and they will be able to remove their bank feeds at any time.\n\nClick "Cancel" to ignore and continue to add a bank feed yourself.')){

        }else{
            addBankFeed();
        }
    }else{
        addBankFeed();
    }
}

////////////////////////////////////////////////////////////////
function reauthBankFeed(id){
    alert('This demo does not support re-authorising of bank feeds')
}

