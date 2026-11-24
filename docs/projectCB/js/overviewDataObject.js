let panel =[];
let agent=true;


let taxFilerName='';
let overviewPeriod='';
let businessType='';
let transferRequested=false;
let shareRequested=false;
let transferDeclined=false;
let shareDeclined=false;
let transferred=false;
let shared=false;
let hasBankfeeds=false;
let turnover=8000;
let turnoverThreshold=10000;
let creditRequired=false;
let credited=false;
let creditedArray=[];
let pdfcopied=false;
let setupAndTransfer;
let bankfeedRequired;
let owned=true;
let showDevnotes=false;

creditedArray['credit2019']=true;
creditedArray['credit2023']=true;

let showNewlyCratedLabel=false;

panel['business']=[];
panel['business']['open']=true;
panel['business']['tick']='';
panel['business']['locked']=false;
panel['business']['completed']=false;
panel['business']['ghosted']=false;

panel['period']=[];
panel['period']['open']=false;
panel['period']['tick']='';
panel['period']['locked']=false;
panel['period']['completed']=false;
panel['period']['ghosted']=false

panel['options']=[];
panel['options']['open']=false;
panel['options']['tick']='';
panel['options']['locked']=false;
panel['options']['completed']=false;
panel['options']['ghosted']=true;

panel['share']=[];
panel['share']['open']=false;
panel['share']['tick']='';
panel['share']['locked']=false;
panel['share']['completed']=false;
panel['share']['ghosted']=true;

panel['bankfeed']=[];
panel['bankfeed']['open']=false;
panel['bankfeed']['tick']='';
panel['bankfeed']['locked']=false;
panel['bankfeed']['completed']=false;
panel['bankfeed']['ghosted']=true;
panel['bankfeed']['display']=[false,false];

panel['credit']=[];
panel['credit']['open']=false;
panel['credit']['tick']='';
panel['credit']['locked']=false;
panel['credit']['completed']=false;
panel['credit']['ghosted']=true;

panel['edit']=[];
panel['edit']['open']=false;
panel['edit']['tick']='';
panel['edit']['locked']=false;
panel['edit']['completed']=false;
panel['edit']['ghosted']=true;

// panel['pdfcopy']=[];
// panel['pdfcopy']['open']=false;
// panel['pdfcopy']['tick']='';
// panel['pdfcopy']['locked']=false;
// panel['pdfcopy']['completed']=false;
// panel['pdfcopy']['ghosted']=true;
