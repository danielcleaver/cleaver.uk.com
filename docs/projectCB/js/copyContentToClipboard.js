function copyContentToClipboard(element){
    navigator.clipboard.writeText(element.getElementsByClassName('id')[0].innerHTML.replace('ID: ',''));
}