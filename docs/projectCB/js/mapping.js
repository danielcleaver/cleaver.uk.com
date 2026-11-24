let ftaxHexIdCounter=4368;
let userHexIdCounter=4368;
//////////////////////////////////////////////////////////////////////////////////////////////////
function ftaxHexId(){
    ftaxHexIdCounter=(ftaxHexIdCounter+1)%16777216;
    return 'ff'+ftaxHexIdCounter.toString(16);
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function userHexId(){
    userHexIdCounter=(userHexIdCounter+1)%16777216;
    return '00'+userHexIdCounter.toString(16);
}
//////////////////////////////////////////////////////////////////////////////////////////////////
let ftaxMap=[];
let userMap=[];
let importMap=[];

let blankMapping=[];
let tempMapping=[];

function refreshImportMap(){
    // 1. start with the ftax map
    importMap=clone(ftaxMap);

    // 2. go through userMap one item at a time
    userMap.forEach((userMapMapping) => {
        // does this already exist?
        const importMapMappingMatchIndex=importMap.findIndex((importMapMapping) => {return importMapMapping['id']===userMapMapping['id']});
        if(importMapMappingMatchIndex!==-1){
            // userMapMapping matches importMap[importMapMappingMatchIndex]

            if(userMapMapping['cancel']===true){
                // the user has chosen to cancel the ftax mapping, mark it as cancelled in the importMap
                importMap[importMapMappingMatchIndex]['cancel']=true;
            }else{
                // the user has overridden and setting in the ftax mapping, so copy theirs into the importMap
                importMap[importMapMappingMatchIndex]=clone(userMapMapping);
            }
        }else{
            // userMapMapping does not occur in importMap, so add it
            importMap.push(clone(userMapMapping));

        }

    });
}


blankMapping['id']='';
blankMapping['cancel']=false;                   // can only be true in usermap and importMap, and cancels the ftax entry
blankMapping['inputs']=[];
blankMapping['outputs']=[];
blankMapping['inputs']['description']='';
blankMapping['inputs']['polarity']='';          // 1 or -1 or ''
blankMapping['outputs']['type']='';
blankMapping['outputs']['category']='';
blankMapping['outputs']['vatRate']='20';
blankMapping['outputs']['eu']=false;            // true or false
blankMapping['outputs']['disallowable']=false;  // true or false
blankMapping['outputs']['ignoreConfirm']='';    // 'ignore' or 'confirm'

// ================= FTAX MAP =========================
tempMapping=clone(blankMapping);
tempMapping['id']=ftaxHexId();
tempMapping['inputs']['description']='EDF Energy';
tempMapping['inputs']['polarity']=-1
tempMapping['outputs']['type']='payment';
tempMapping['outputs']['category']='utilities_costs';
tempMapping['outputs']['ignoreConfirm']='confirm';
ftaxMap.push(clone(tempMapping));

tempMapping=clone(blankMapping);
tempMapping['id']=ftaxHexId();
tempMapping['inputs']['description']='Octopus Energy';
tempMapping['inputs']['polarity']=-1
tempMapping['outputs']['type']='payment';
tempMapping['outputs']['category']='utilities_costs';
tempMapping['outputs']['ignoreConfirm']='confirm';
ftaxMap.push(clone(tempMapping));

tempMapping=clone(blankMapping);
tempMapping['id']=ftaxHexId();
tempMapping['inputs']['description']='Co-operative Energy';
tempMapping['inputs']['polarity']=-1
tempMapping['outputs']['type']='payment';
tempMapping['outputs']['category']='utilities_costs';
tempMapping['outputs']['ignoreConfirm']='confirm';
ftaxMap.push(clone(tempMapping));

tempMapping=clone(blankMapping);
tempMapping['id']=ftaxHexId();
tempMapping['inputs']['description']='ScottishPower';
tempMapping['inputs']['polarity']=-1
tempMapping['outputs']['type']='payment';
tempMapping['outputs']['category']='utilities_costs';
tempMapping['outputs']['ignoreConfirm']='confirm';
ftaxMap.push(clone(tempMapping));

tempMapping=clone(blankMapping);
tempMapping['id']=ftaxHexId();
tempMapping['inputs']['description']='E.ON';
tempMapping['inputs']['polarity']=-1
tempMapping['outputs']['type']='payment';
tempMapping['outputs']['category']='utilities_costs';
tempMapping['outputs']['ignoreConfirm']='confirm';
ftaxMap.push(clone(tempMapping));

tempMapping=clone(blankMapping);
tempMapping['id']=ftaxHexId();
tempMapping['inputs']['description']='British Gas';
tempMapping['inputs']['polarity']=-1
tempMapping['outputs']['type']='payment';
tempMapping['outputs']['category']='utilities_costs';
tempMapping['outputs']['ignoreConfirm']='confirm';
ftaxMap.push(clone(tempMapping));

tempMapping=clone(blankMapping);
tempMapping['id']=ftaxHexId();
tempMapping['inputs']['description']='Bristol Energy';
tempMapping['inputs']['polarity']=-1
tempMapping['outputs']['type']='payment';
tempMapping['outputs']['category']='utilities_costs';
tempMapping['outputs']['ignoreConfirm']='confirm';
ftaxMap.push(clone(tempMapping));

tempMapping=clone(blankMapping);
tempMapping['id']=ftaxHexId();
tempMapping['inputs']['description']='OVO Energy';
tempMapping['inputs']['polarity']=-1
tempMapping['outputs']['type']='payment';
tempMapping['outputs']['category']='utilities_costs';
tempMapping['outputs']['ignoreConfirm']='confirm';
ftaxMap.push(clone(tempMapping));

tempMapping=clone(blankMapping);
tempMapping['id']=ftaxHexId();
tempMapping['inputs']['description']='Shell';
tempMapping['inputs']['polarity']=-1
tempMapping['outputs']['type']='payment';
tempMapping['outputs']['category']='utilities_costs';
tempMapping['outputs']['ignoreConfirm']='confirm';
ftaxMap.push(clone(tempMapping));




// ================= USER MAP =========================
tempMapping=clone(blankMapping);
tempMapping['id']=userHexId();
tempMapping['inputs']['description']='Npower';
tempMapping['inputs']['polarity']=-1
tempMapping['outputs']['type']='payment';
tempMapping['outputs']['category']='utilities_costs';
tempMapping['outputs']['ignoreConfirm']='confirm';
userMap.push(clone(tempMapping));

tempMapping=clone(blankMapping);
tempMapping['id']=userHexId();
tempMapping['inputs']['description']='Powergen';
tempMapping['inputs']['polarity']=-1
tempMapping['outputs']['type']='payment';
tempMapping['outputs']['category']='utilities_costs';
tempMapping['outputs']['ignoreConfirm']='confirm';
userMap.push(clone(tempMapping));

tempMapping=clone(blankMapping);
tempMapping['id']='ff1118';
tempMapping['inputs']['description']='OVO Energy';
tempMapping['inputs']['polarity']=-1
tempMapping['outputs']['type']='payment';
tempMapping['outputs']['category']='consultancy_fees';
tempMapping['outputs']['ignoreConfirm']='confirm';
userMap.push(clone(tempMapping));

tempMapping=clone(blankMapping);
tempMapping['id']='ff1119';
tempMapping['cancel']=true;
tempMapping['inputs']['description']='Powergen';
tempMapping['inputs']['polarity']=-1
tempMapping['outputs']['type']='payment';
tempMapping['outputs']['category']='utilities_costs';
tempMapping['outputs']['ignoreConfirm']='confirm';
userMap.push(clone(tempMapping));

refreshImportMap();



