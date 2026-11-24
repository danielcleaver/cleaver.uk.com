let entryData=[];

// let displayMode='transactions';  // transactions, bills or invoices

// let showIgnoredMode=false;

// let settings['hasTransactions']=false;
// let settings['hasInvoices']=false;
// letsettings['hasBills']=false;

// let settings['transactionsHaveErrors']=false;
// let settings['invoicesHaveErrors']=false;
// let settings['billsHaveErrors']=false;

entryData[0]=[];
entryData[0]['guid']=uuidv4();
entryData[0]['type']='transaction';  // invoice, bill or transaction
entryData[0]['status']='confirmed';  // confirmed, unconfirmed, incomplete
entryData[0]['ignored']='false';  // true, false
entryData[0]['source-type']='bank-feed';  // bank-feed, csv-import or manual
entryData[0]['source-id']='1';  // if source type is bank feed, id of that feed
entryData[0]['flag']='0';  // numeric id of a flag if set
entryData[0]['polarity']='outgoing';  // incoming or outgoing
entryData[0]['date']='2024-05-28';  // the date used to filter/display the entity
entryData[0]['invoice-number']='';
entryData[0]['issue-date']='';
entryData[0]['due-date']='';  // (only if type==invoice or bill)
entryData[0]['tax-point']='';
entryData[0]['description']='PJB DRAINAGE';
entryData[0]['vat-rate']='20';
entryData[0]['exvat-amount']='1265.25';
entryData[0]['gross-amount']='1518.30';
entryData[0]['recommendation']='';  // confirm or ignore
entryData[0]['eu']='false';  // true or false
entryData[0]['disallowable']='false';  // true or false
entryData[0]['paid-status']='';  // (only if type==invoice or bill) fully paid, partially paid, unpaid
entryData[0]['amount-outstanding']='';  // (only if type==invoice or bill)
entryData[0]['transaction-type']='payment';  // (only if type==transaction)
entryData[0]['transaction-category']='purchases';  // (only if type==transaction)
entryData[0]['link']='9';
entryData[0]['vat-obligation-id']='123-456-789-0';  // (only if type==transaction)
entryData[0]['itsa-obligation-id']='';  // (only if type==transaction)
entryData[0]['sa100-id']='';  // (only if type==transaction)
entryData[0]['ct600-id']='';  // (only if type==transaction)
entryData[0]['sa800-id']='';  // (only if type==transaction)
entryData[0]['sa900-id']='';  // (only if type==transaction)
entryData[0]['note']='a';  // (only if type==transaction)

entryData[1]=[];
entryData[1]['guid']=uuidv4();
entryData[1]['type']='transaction';  // invoice, bill or transaction
entryData[1]['status']='confirmed';  // confirmed, unconfirmed, incomplete
entryData[1]['ignored']='false';  // true, false
entryData[1]['source-type']='bank-feed';  // bank-feed, csv-import or manual
entryData[1]['source-id']='2';  // if source type is bank feed, id of that feed
entryData[1]['flag']='1';  // numeric id of a flag if set
entryData[1]['polarity']='outgoing';  // incoming or outgoing
entryData[1]['date']='2024-06-07';  // the date used to filter/display the entity
entryData[1]['invoice-number']='';
entryData[1]['issue-date']='';
entryData[1]['due-date']='';  // (only if type==invoice or bill)
entryData[1]['tax-point']='';
entryData[1]['description']='DAVE\'S ROOFERS';
entryData[1]['vat-rate']='20';
entryData[1]['exvat-amount']='351.17';
entryData[1]['gross-amount']='425.00';
entryData[1]['recommendation']='';  // confirm or ignore
entryData[1]['eu']='false';  // true or false
entryData[1]['disallowable']='false';  // true or false
entryData[1]['paid-status']='';  // (only if type==invoice or bill) fully paid, partially paid, unpaid
entryData[1]['amount-outstanding']='';  // (only if type==invoice or bill)
entryData[1]['transaction-type']='payment';  // (only if type==transaction)
entryData[1]['transaction-category']='purchases';  // (only if type==transaction)
entryData[1]['link']='9';
entryData[1]['vat-obligation-id']='';  // (only if type==transaction)
entryData[1]['itsa-obligation-id']='';  // (only if type==transaction)
entryData[1]['sa100-id']='';  // (only if type==transaction)
entryData[1]['ct600-id']='';  // (only if type==transaction)
entryData[1]['sa800-id']='';  // (only if type==transaction)
entryData[1]['sa900-id']='';  // (only if type==transaction)
entryData[1]['note']='';  // (only if type==transaction)

entryData[2]=[];
entryData[2]['guid']=uuidv4();
entryData[2]['type']='transaction';  // invoice, bill or transaction
entryData[2]['status']='confirmed';  // confirmed, unconfirmed, incomplete
entryData[2]['ignored']='false';  // true, false
entryData[2]['source-type']='bank-feed';  // bank-feed, csv-import or manual
entryData[2]['source-id']='2';  // if source type is bank feed, id of that feed
entryData[2]['flag']='0';  // numeric id of a flag if set
entryData[2]['polarity']='incoming';  // incoming or outgoing
entryData[2]['date']='2024-06-09';  // the date used to filter/display the entity
entryData[2]['invoice-number']='abcde';
entryData[2]['issue-date']='';
entryData[2]['due-date']='';  // (only if type==invoice or bill)
entryData[2]['tax-point']='';
entryData[2]['description']='British Rail';
entryData[2]['vat-rate']='20';
entryData[2]['exvat-amount']='2116.67';
entryData[2]['gross-amount']='2540.00';
entryData[2]['recommendation']='';  // confirm or ignore
entryData[2]['eu']='false';  // true or false
entryData[2]['disallowable']='false';  // true or false
entryData[2]['paid-status']='';  // (only if type==invoice or bill) fully paid, partially paid, unpaid
entryData[2]['amount-outstanding']='';  // (only if type==invoice or bill)
entryData[2]['transaction-type']='disposal_of_capital_asset';  // (only if type==transaction)
entryData[2]['transaction-category']='motor_vehicle_capital_sale';  // (only if type==transaction)
entryData[2]['link']='9';
entryData[2]['vat-obligation-id']='';  // (only if type==transaction)
entryData[2]['itsa-obligation-id']='';  // (only if type==transaction)
entryData[2]['sa100-id']='';  // (only if type==transaction)
entryData[2]['ct600-id']='';  // (only if type==transaction)
entryData[2]['sa800-id']='';  // (only if type==transaction)
entryData[2]['sa900-id']='';  // (only if type==transaction)
entryData[2]['note']='';  // (only if type==transaction)

entryData[3]=[];
entryData[3]['guid']=uuidv4();
entryData[3]['type']='transaction';  // invoice, bill or transaction
entryData[3]['status']='confirmed';  // confirmed, unconfirmed, incomplete
entryData[3]['ignored']='false';  // true, false
entryData[3]['source-type']='bank-feed';  // bank-feed, csv-import or manual
entryData[3]['source-id']='1';  // if source type is bank feed, id of that feed
entryData[3]['flag']='0';  // numeric id of a flag if set
entryData[3]['polarity']='outgoing';  // incoming or outgoing
entryData[3]['date']='2024-06-12';  // the date used to filter/display the entity
entryData[3]['invoice-number']='abcde';
entryData[3]['issue-date']='';
entryData[3]['due-date']='';  // (only if type==invoice or bill)
entryData[3]['tax-point']='';
entryData[3]['description']='Jaffas Cakes';
entryData[3]['vat-rate']='20';
entryData[3]['exvat-amount']='50.00';
entryData[3]['gross-amount']='50.00';
entryData[3]['recommendation']='';  // confirm or ignore
entryData[3]['eu']='false';  // true or false
entryData[3]['disallowable']='false';  // true or false
entryData[3]['paid-status']='';  // (only if type==invoice or bill) fully paid, partially paid, unpaid
entryData[3]['amount-outstanding']='';  // (only if type==invoice or bill)
entryData[3]['transaction-type']='payment';  // (only if type==transaction)
entryData[3]['transaction-category']='purchases';  // (only if type==transaction)
entryData[3]['link']='9';
entryData[3]['vat-obligation-id']='s';  // (only if type==transaction)
entryData[3]['itsa-obligation-id']='';  // (only if type==transaction)
entryData[3]['sa100-id']='';  // (only if type==transaction)
entryData[3]['ct600-id']='';  // (only if type==transaction)
entryData[3]['sa800-id']='';  // (only if type==transaction)
entryData[3]['sa900-id']='';  // (only if type==transaction)
entryData[3]['note']='';  // (only if type==transaction)

entryData[4]=[];
entryData[4]['guid']=uuidv4();
entryData[4]['type']='transaction';  // invoice, bill or transaction
entryData[4]['status']='incomplete';  // confirmed, unconfirmed, incomplete
entryData[4]['ignored']='false';  // true, false
entryData[4]['source-type']='bank-feed';  // bank-feed, csv-import or manual
entryData[4]['source-id']='1';  // if source type is bank feed, id of that feed
entryData[4]['flag']='0';  // numeric id of a flag if set
entryData[4]['polarity']='incoming';  // incoming or outgoing
entryData[4]['date']='2024-06-12';  // the date used to filter/display the entity
entryData[4]['invoice-number']='';
entryData[4]['issue-date']='';
entryData[4]['due-date']='';  // (only if type==invoice or bill)
entryData[4]['tax-point']='';
entryData[4]['description']='Dept of Health';
entryData[4]['vat-rate']='20';
entryData[4]['exvat-amount']='1000.00';
entryData[4]['gross-amount']='1200.00';
entryData[4]['recommendation']='confirm';  // confirm or ignore
entryData[4]['eu']='falseconfirm';  // true or false
entryData[4]['disallowable']='falseconfirm';  // true or false
entryData[4]['paid-status']='';  // (only if type==invoice or bill) fully paid, partially paid, unpaid
entryData[4]['amount-outstanding']='';  // (only if type==invoice or bill)
entryData[4]['transaction-type']='';  // (only if type==transaction)
entryData[4]['transaction-category']='';  // (only if type==transaction)
entryData[4]['link']='';
entryData[4]['vat-obligation-id']='';  // (only if type==transaction)
entryData[4]['itsa-obligation-id']='';  // (only if type==transaction)
entryData[4]['sa100-id']='';  // (only if type==transaction)
entryData[4]['ct600-id']='';  // (only if type==transaction)
entryData[4]['sa800-id']='';  // (only if type==transaction)
entryData[4]['sa900-id']='';  // (only if type==transaction)
entryData[4]['note']='';  // (only if type==transaction)

entryData[5]=[];
entryData[5]['guid']=uuidv4();
entryData[5]['type']='transaction';  // invoice, bill or transaction
entryData[5]['status']='confirmed';  // confirmed, unconfirmed, incomplete
entryData[5]['ignored']='false';  // true, false
entryData[5]['source-type']='manual';  // bank-feed, csv-import or manual
entryData[5]['source-id']='1';  // if source type is bank feed, id of that feed
entryData[5]['flag']='0';  // numeric id of a flag if set
entryData[5]['polarity']='incoming';  // incoming or outgoing
entryData[5]['date']='2024-06-13';  // the date used to filter/display the entity
entryData[5]['invoice-number']='abcde';
entryData[5]['issue-date']='';
entryData[5]['due-date']='';  // (only if type==invoice or bill)
entryData[5]['tax-point']='';
entryData[5]['description']='SPD NORTHANTS';
entryData[5]['vat-rate']='20';
entryData[5]['exvat-amount']='2083.33';
entryData[5]['gross-amount']='2500.00';
entryData[5]['recommendation']='';  // confirm or ignore
entryData[5]['eu']='false';  // true or false
entryData[5]['disallowable']='false';  // true or false
entryData[5]['paid-status']='';  // (only if type==invoice or bill) fully paid, partially paid, unpaid
entryData[5]['amount-outstanding']='';  // (only if type==invoice or bill)
entryData[5]['transaction-type']='sales';  // (only if type==transaction)
entryData[5]['transaction-category']='sales';  // (only if type==transaction)
entryData[5]['link']='9';
entryData[5]['vat-obligation-id']='';  // (only if type==transaction)
entryData[5]['itsa-obligation-id']='';  // (only if type==transaction)
entryData[5]['sa100-id']='';  // (only if type==transaction)
entryData[5]['ct600-id']='';  // (only if type==transaction)
entryData[5]['sa800-id']='';  // (only if type==transaction)
entryData[5]['sa900-id']='';  // (only if type==transaction)
entryData[5]['note']='This is a little note to remind me about something.';  // (only if type==transaction)

entryData[6]=[];
entryData[6]['guid']=uuidv4();
entryData[6]['type']='transaction';  // invoice, bill or transaction
entryData[6]['status']='unconfirmed';  // confirmed, unconfirmed, incomplete
entryData[6]['ignored']='false';  // true, false
entryData[6]['source-type']='csv-import';  // bank-feed, csv-import or manual
entryData[6]['source-id']='1';  // if source type is bank feed, id of that feed
entryData[6]['flag']='0';  // numeric id of a flag if set
entryData[6]['polarity']='outgoing';  // incoming or outgoing
entryData[6]['date']='2024-06-15';  // the date used to filter/display the entity
entryData[6]['invoice-number']='abcde';
entryData[6]['issue-date']='';
entryData[6]['due-date']='';  // (only if type==invoice or bill)
entryData[6]['tax-point']='';
entryData[6]['description']='JDF CLEAN';
entryData[6]['vat-rate']='20';
entryData[6]['exvat-amount']='451.00';
entryData[6]['gross-amount']='451.00';
entryData[6]['recommendation']='confirm';  // confirm or ignore
entryData[6]['eu']='falseconfirm';  // true or false
entryData[6]['disallowable']='falseconfirm';  // true or false
entryData[6]['paid-status']='';  // (only if type==invoice or bill) fully paid, partially paid, unpaid
entryData[6]['amount-outstanding']='';  // (only if type==invoice or bill)
entryData[6]['transaction-type']='payment';  // (only if type==transaction)
entryData[6]['transaction-category']='purchases';  // (only if type==transaction)
entryData[6]['link']='9';
entryData[6]['vat-obligation-id']='';  // (only if type==transaction)
entryData[6]['itsa-obligation-id']='';  // (only if type==transaction)
entryData[6]['sa100-id']='';  // (only if type==transaction)
entryData[6]['ct600-id']='';  // (only if type==transaction)
entryData[6]['sa800-id']='';  // (only if type==transaction)
entryData[6]['sa900-id']='';  // (only if type==transaction)
entryData[6]['note']='';  // (only if type==transaction)

entryData[7]=[];
entryData[7]['guid']=uuidv4();
entryData[7]['type']='transaction';  // invoice, bill or transaction
entryData[7]['status']='unconfirmed';  // confirmed, unconfirmed, incomplete
entryData[7]['ignored']='false';  // true, false
entryData[7]['source-type']='bank-feed';  // bank-feed, csv-import or manual
entryData[7]['source-id']='1';  // if source type is bank feed, id of that feed
entryData[7]['flag']='0';  // numeric id of a flag if set
entryData[7]['polarity']='incoming';  // incoming or outgoing
entryData[7]['date']='2024-06-17';  // the date used to filter/display the entity
entryData[7]['invoice-number']='abcde';
entryData[7]['issue-date']='';
entryData[7]['due-date']='';  // (only if type==invoice or bill)
entryData[7]['tax-point']='';
entryData[7]['description']='HND DEGRES';
entryData[7]['vat-rate']='20';
entryData[7]['exvat-amount']='350.00';
entryData[7]['gross-amount']='350.00';
entryData[7]['recommendation']='ignore';  // confirm or ignore
entryData[7]['eu']='falseignore';  // true or false
entryData[7]['disallowable']='falseignore';  // true or false
entryData[7]['paid-status']='';  // (only if type==invoice or bill) fully paid, partially paid, unpaid
entryData[7]['amount-outstanding']='';  // (only if type==invoice or bill)
entryData[7]['transaction-type']='sales';  // (only if type==transaction)
entryData[7]['transaction-category']='sales';  // (only if type==transaction)
entryData[7]['link']='';
entryData[7]['vat-obligation-id']='';  // (only if type==transaction)
entryData[7]['itsa-obligation-id']='';  // (only if type==transaction)
entryData[7]['sa100-id']='';  // (only if type==transaction)
entryData[7]['ct600-id']='';  // (only if type==transaction)
entryData[7]['sa800-id']='';  // (only if type==transaction)
entryData[7]['sa900-id']='';  // (only if type==transaction)
entryData[7]['note']='';  // (only if type==transaction)

entryData[8]=[];
entryData[8]['guid']=uuidv4();
entryData[8]['type']='transaction';  // invoice, bill or transaction
entryData[8]['status']='confirmed';  // confirmed, unconfirmed, incomplete
entryData[8]['ignored']='true';  // true, false
entryData[8]['source-type']='bank-feed';  // bank-feed, csv-import or manual
entryData[8]['source-id']='1';  // if source type is bank feed, id of that feed
entryData[8]['flag']='0';  // numeric id of a flag if set
entryData[8]['polarity']='outgoing';  // incoming or outgoing
entryData[8]['date']='2024-06-21';  // the date used to filter/display the entity
entryData[8]['invoice-number']='abcde';
entryData[8]['issue-date']='';
entryData[8]['due-date']='';  // (only if type==invoice or bill)
entryData[8]['tax-point']='';
entryData[8]['description']='Cup\'s Cakes';
entryData[8]['vat-rate']='20';
entryData[8]['exvat-amount']='50.00';
entryData[8]['gross-amount']='50.00';
entryData[8]['recommendation']='';  // confirm or ignore
entryData[8]['eu']='false';  // true or false
entryData[8]['disallowable']='false';  // true or false
entryData[8]['paid-status']='';  // (only if type==invoice or bill) fully paid, partially paid, unpaid
entryData[8]['amount-outstanding']='';  // (only if type==invoice or bill)
entryData[8]['transaction-type']='payment';  // (only if type==transaction)
entryData[8]['transaction-category']='purchases';  // (only if type==transaction)
entryData[8]['link']='9';
entryData[8]['vat-obligation-id']='';  // (only if type==transaction)
entryData[8]['itsa-obligation-id']='';  // (only if type==transaction)
entryData[8]['sa100-id']='';  // (only if type==transaction)
entryData[8]['ct600-id']='';  // (only if type==transaction)
entryData[8]['sa800-id']='';  // (only if type==transaction)
entryData[8]['sa900-id']='';  // (only if type==transaction)
entryData[8]['note']='';  // (only if type==transaction)

entryData[9]=[];
entryData[9]['guid']=uuidv4();
entryData[9]['type']='bill';  // invoice, bill or transaction
entryData[9]['status']='confirmed';  // confirmed, unconfirmed, incomplete
entryData[9]['ignored']='false';  // true, false
entryData[9]['source-type']='manual';  // bank-feed, csv-import or manual
entryData[9]['source-id']='1';  // if source type is bank feed, id of that feed
entryData[9]['flag']='0';  // numeric id of a flag if set
entryData[9]['polarity']='outgoing';  // incoming or outgoing
entryData[9]['date']='2024-06-21';  // the date used to filter/display the entity
entryData[9]['invoice-number']='JAFFA 20333';
entryData[9]['issue-date']='';
entryData[9]['due-date']='2024-07-21';  // (only if type==invoice or bill)
entryData[9]['tax-point']='';
entryData[9]['description']='Jaffas Cakes';
entryData[9]['vat-rate']='20';
entryData[9]['exvat-amount']='70.00';
entryData[9]['gross-amount']='70.00';
entryData[9]['recommendation']='';  // confirm or ignore
entryData[9]['eu']='false';  // true or false
entryData[9]['disallowable']='false';  // true or false
entryData[9]['paid-status']='partially paid';  // (only if type==invoice or bill) fully paid, partially paid, unpaid
entryData[9]['amount-outstanding']='0.00';  // (only if type==invoice or bill)
entryData[9]['transaction-type']='payment';  // (only if type==transaction)
entryData[9]['transaction-category']='utilities_costs';  // (only if type==transaction)
entryData[9]['link']='3';
entryData[9]['vat-obligation-id']='';  // (only if type==transaction)
entryData[9]['itsa-obligation-id']='';  // (only if type==transaction)
entryData[9]['sa100-id']='';  // (only if type==transaction)
entryData[9]['ct600-id']='';  // (only if type==transaction)
entryData[9]['sa800-id']='';  // (only if type==transaction)
entryData[9]['sa900-id']='';  // (only if type==transaction)
entryData[9]['note']='';  // (only if type==transaction)

entryData[10]=[];
entryData[10]['guid']=uuidv4();
entryData[10]['type']='invoice';  // invoice, bill or transaction
entryData[10]['status']='confirmed';  // confirmed, unconfirmed, incomplete
entryData[10]['ignored']='false';  // true, false
entryData[10]['source-type']='manual';  // bank-feed, csv-import or manual
entryData[10]['source-id']='1';  // if source type is bank feed, id of that feed
entryData[10]['flag']='0';  // numeric id of a flag if set
entryData[10]['polarity']='incoming';  // incoming or outgoing
entryData[10]['date']='2024-06-22';  // the date used to filter/display the entity
entryData[10]['invoice-number']='SHINE 21345';
entryData[10]['issue-date']='';
entryData[10]['due-date']='';  // (only if type==invoice or bill)
entryData[10]['tax-point']='';
entryData[10]['description']='The Duchy Estates';
entryData[10]['vat-rate']='5';
entryData[10]['exvat-amount']='1200.00';
entryData[10]['gross-amount']='1260.00';
entryData[10]['recommendation']='';  // confirm or ignore
entryData[10]['eu']='false';  // true or false
entryData[10]['disallowable']='false';  // true or false
entryData[10]['paid-status']='partially paid';  // (only if type==invoice or bill) fully paid, partially paid, unpaid
entryData[10]['amount-outstanding']='20.00';  // (only if type==invoice or bill)
entryData[10]['transaction-type']='payment';  // (only if type==transaction)
entryData[10]['transaction-category']='utilities_costs';  // (only if type==transaction)
entryData[10]['link']='-1';
entryData[10]['vat-obligation-id']='';  // (only if type==transaction)
entryData[10]['itsa-obligation-id']='';  // (only if type==transaction)
entryData[10]['sa100-id']='';  // (only if type==transaction)
entryData[10]['ct600-id']='';  // (only if type==transaction)
entryData[10]['sa800-id']='';  // (only if type==transaction)
entryData[10]['sa900-id']='';  // (only if type==transaction)
entryData[10]['note']='';  // (only if type==transaction)

entryData[11]=[];
entryData[11]['guid']=uuidv4();
entryData[11]['type']='invoice';  // invoice, bill or transaction
entryData[11]['status']='confirmed';  // confirmed, unconfirmed, incomplete
entryData[11]['ignored']='false';  // true, false
entryData[11]['source-type']='manual';  // bank-feed, csv-import or manual
entryData[11]['source-id']='1';  // if source type is bank feed, id of that feed
entryData[11]['flag']='0';  // numeric id of a flag if set
entryData[11]['polarity']='incoming';  // incoming or outgoing
entryData[11]['date']='2024-06-23';  // the date used to filter/display the entity
entryData[11]['invoice-number']='SHINE 21346';
entryData[11]['issue-date']='';
entryData[11]['due-date']='';  // (only if type==invoice or bill)
entryData[11]['tax-point']='';
entryData[11]['description']='Woburn Abbey';
entryData[11]['vat-rate']='20';
entryData[11]['exvat-amount']='1000.00';
entryData[11]['gross-amount']='1200.00';
entryData[11]['recommendation']='';  // confirm or ignore
entryData[11]['eu']='false';  // true or false
entryData[11]['disallowable']='false';  // true or false
entryData[11]['paid-status']='fully paid';  // (only if type==invoice or bill) fully paid, partially paid, unpaid
entryData[11]['amount-outstanding']='0.00';  // (only if type==invoice or bill)
entryData[11]['transaction-type']='payment';  // (only if type==transaction)
entryData[11]['transaction-category']='utilities_costs';  // (only if type==transaction)
entryData[11]['link']='-2';
entryData[11]['vat-obligation-id']='';  // (only if type==transaction)
entryData[11]['itsa-obligation-id']='';  // (only if type==transaction)
entryData[11]['sa100-id']='';  // (only if type==transaction)
entryData[11]['ct600-id']='';  // (only if type==transaction)
entryData[11]['sa800-id']='';  // (only if type==transaction)
entryData[11]['sa900-id']='';  // (only if type==transaction)
entryData[11]['note']='';  // (only if type==transaction)

entryData.reverse();

generateCalculatedEntryData();

////////////////////////////////
function formatAmount2dp(input){
    return(String(input));
}