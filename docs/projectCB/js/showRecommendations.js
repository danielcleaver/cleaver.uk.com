function showRecommendations(){
    // instanciate new modal
    var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function() {
            console.log('modal open');
        },
        onClose: function() {
            console.log('modal closed');
        },
        beforeClose: function() {
            // here's goes some logic
            // e.g. save content before closing the modal
            // console.log(document.getElementById('myCheck').checked);
            return true; // close the modal
            return false; // nothing happens
        }
    });

    // set content
    var content='<h2>Recommendations</h2>';

    content+='<p>This will allow you to manage the recommended types, categories and VAT rates for various customers.</p>';
    content+='<p>The recommendations are used to pre-fill the type, category and VAT rate for new transactions (bank feed, CSV and manual entry).</p>';
    modal.setContent(content);

    // add a button
    modal.addFooterBtn('Cancel', 'btn btn-outline-primary me-3', function() {
        // here goes some logic
        modal.close();
    });

    // add another button
    modal.addFooterBtn('Apply', 'btn btn-primary', function() {
        // here goes some logic
        modal.close();
    });

    // open modal
    modal.open();
}