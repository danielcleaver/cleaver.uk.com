//define a global filecontent
filecontent='';
xpath=new Array();
function inflate(){

   
   //load HMRC mtrboxes xml
   filename = 'HMRCfiles/'+document.getElementsByTagName('body')[0].dataset.boxPath;
   
   
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         filecontent = this.responseText;
      }
      if(filecontent=='' || filecontent=='Page not found.') {
         //console.log('oops');
         return;
      }
      
      //extract array of mnemonics (ids) and paths (xpaths)
      pieces=filecontent.match(/<Box mnemonic="(.*)"|<Xpath>(.*)<\/Xpath>/gm);
      
      for(var i=0;i<pieces.length;i=i+2) {
         //xpath[pieces[i].replace('<Box mnemonic="','').replace('"','')]=pieces[i+1].replace('<Xpath>','').replace('</Xpath>','');
         xpath[pieces[i].replace('<Box mnemonic="','').replace('"','')]=new Array();
         xpath[pieces[i].replace('<Box mnemonic="','').replace('"','')]['xpath']=pieces[i+1].replace('<Xpath>','').replace('</Xpath>','');
         xpath[pieces[i].replace('<Box mnemonic="','').replace('"','')]['used']=false;
      }
      
      //debug output
      /*for(var id in xpath){
         console.log('xpath['+id+'][\'xpath\']'+':'+xpath[id]['xpath']+'            xpath['+id+'][\'used\']'+':'+xpath[id]['used']);
      }*/
      
      addXpaths();
   }
   

   xhttp.open("GET", filename, true);
   xhttp.send();
   

}
///////////////////////////////////////////////
function addXpaths(){
   
   //get all form input elements
   var a = Array.prototype.slice.call(document.getElementsByTagName("input"), 0);
   var b = Array.prototype.slice.call(document.getElementsByTagName("select"), 0);
   var c = Array.prototype.slice.call(document.getElementsByTagName("textarea"), 0);
   var d = Array.prototype.slice.call(document.getElementsByTagName("fieldset"), 0);
   var e = Array.prototype.slice.call(document.getElementsByTagName("datalist"), 0);
   var f = Array.prototype.slice.call(document.getElementsByTagName("optgroup"), 0);
   
   var allitems;
   allitems=a.concat(b,c,d,e,f)
   
   //console.log(allitems);
   
   var att = document.createAttribute("hmrcxpath"); 
   var id='';
   //add xpaths if they dont already exist
   for(var i=0;i<allitems.length;i++){
      id=allitems[i].id.replace(/\./,'').toUpperCase();
      //console.log(allitems[i].id);
      //console.log(!!allitems[i].getAttribute("hmrcxpath"));
      if(!!!allitems[i].getAttribute("hmrcxpath")){
         //console.log(id);
         //console.log(xpath[id]);
         //attribute is null, so set it
         if(!!xpath[id]){
            allitems[i].setAttribute("hmrcxpath",xpath[id]['xpath']);
            xpath[id]['used']=true;
         }
         
      }
      
      //add tooltip!
      if(!!allitems[i].getAttribute("hmrcxpath")){
         //console.log('add tooltip to:'+allitems[i].id);
         newTip=document.createElement("SPAN");
         newTip.innerHTML=id+'&nbsp;&nbsp;&nbsp;&nbsp;'+xpath[id]['xpath'];
         newTip.className = 'ftax-tooltiptext';
         parentDiv = allitems[i].parentNode;
         parentDiv.className=parentDiv.className.replace(/ ftax-tooltip/g,'')+' ftax-tooltip';
         //newTip.innerHTML='a';
         parentDiv.insertBefore(newTip,allitems[i]);
      }
      
      //allitems[i].setAttribute("hmrcxpath",'DD');

   }
   
   for(var id in xpath){
      //console.log('xpath['+id+'][\'xpath\']'+':'+xpath[id]['xpath']+'            xpath['+id+'][\'used\']'+':'+xpath[id]['used']);
   }
}