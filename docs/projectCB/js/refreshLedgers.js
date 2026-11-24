function refreshLedgers(){
    // ==== This function is used to refresh all ledgers

    // ==== add classes to ledgers
    [...document.getElementsByClassName('ledger')].forEach((ledger) =>{

        // ---- add/remove show-ignored class
        settings['showIgnored'] ? ledger.classList.add('show-ignored') : ledger.classList.remove('show-ignored');

        // ---- add/remove colourblind-friendly class
        settings['colourblindFriendly'] ? ledger.classList.add('colourblind-friendly') : ledger.classList.remove('colourblind-friendly');

    });


    // ==== add classes to header
    const header=document.getElementById('page-header');
    // ---- add/remove in-only
    settings['inOnly'] ? header.classList.add('in-only') : header.classList.remove('in-only');
    // ---- add/remove out-only
    settings['outOnly'] ? header.classList.add('out-only') : header.classList.remove('out-only');


    // ==== set title
    [...document.getElementsByClassName('titlebar-caption')].forEach((element) =>{
        element.innerText = 'Dan\'s Deli Supplies';
    });


}