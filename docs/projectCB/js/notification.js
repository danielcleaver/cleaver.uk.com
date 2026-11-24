function setNotification(message){
    const display=document.getElementById('notification');
    display.innerHTML='<i class="fa-regular fa-lightbulb"></i>&nbsp; &nbsp;'+message;
    display.classList.remove('fade-in');
    display.classList.remove('fade-out');
    display.classList.add('fade-in');
    setTimeout(()=>{display.classList.add('fade-out')},10000);
}