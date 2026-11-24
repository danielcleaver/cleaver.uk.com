function sendTransferInvitationClicked(){

    if(transferRequested){
        transferRequested=!transferRequested; transferDeclined=false; validateOverview();
    }else{
        if (confirm('Are you sure you want transfer this cashbook?\n\nWARNING!\nOnce transferred, you cannot regain ownership and your client can remove your access to it entirely.')) {
            // Save it!
            transferRequested=!transferRequested; transferDeclined=false; validateOverview();
        } else {
            // Do nothing!
            // console.log('Thing was not saved to the database.');
        }
    }

}

//////////////////////////////////////////////////////////////////

function sendShareInvitationClicked(){

    if(shareRequested){
        shareRequested=!shareRequested; shareDeclined=false; validateOverview();
    }else{
        if (confirm('Are you sure you want share this cashbook?\n\nWARNING!\nOnce shared, the person you are sharing will be able to see and change all the information in your cashbook.\n\nYou will be able to stop sharing at any point in the future.')) {
            // Save it!
            shareRequested=!shareRequested; shareDeclined=false; validateOverview();
        } else {
            // Do nothing!
            // console.log('Thing was not saved to the database.');
        }
    }

}

//////////////////////////////////////////////////////////////////

function unshareClicked(){
    if(owned){
        shared=false; shareRequested=false; shareDeclined=false; panel['share']['completed']=false;
    }else{
        alert('Sorry, but no\n\nIn this demo, we don\'t handle people who don\'t own the cashbook and then stop sharing it.\n\nWe would remove the overview entirely and they would lose access.');
    }
}

//////////////////////////////////////////////////////////////////
function mutuallyExclusive(ids){
    // note that these must be id's of checkboxes and the first one is the one clicked.
    ids.forEach((id) => {
        if(id !== ids[0]){
            document.getElementById(id).checked=false;
        }
    })
}