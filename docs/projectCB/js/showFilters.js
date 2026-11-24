function showFilters(){
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
    var content='<h2>Filters</h2>';

    content+='<p>This will allow you to change the default filter settings:</p>';
    content+='<ul>';
    content+='   <li>Date range (default will be take year)</li>';
    content+='   <li>Description contains...</li>';
    content+='   <li>Filter by Type</li>';
    content+='   <li>Filter by Category</li>';
    content+='   <li>Flag</li>';
    content+='   <li>Status (confirmed-paid in full vs unconfirmed-not paid in full)</li>';
    content+='</ul>';
    content+='<p>The filters will affect transactions, bills and invoices.</p>';
    content+='<p>When filters are set, the word "filtered" will appear after the page title:</br> - eg Transactions (filtered).</p>';
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

