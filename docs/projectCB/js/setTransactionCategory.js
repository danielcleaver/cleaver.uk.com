function setTransactionCategory(id){

    // const entry=document.getElementById(id);
    //
    // // console.log(entry);
    //
    // const selectItems=entry.getElementsByClassName('transaction-category');
    // const typeSelectItemValue=entry.getElementsByClassName('transaction-type')[0]?.value;
    //
    // if(selectItems){
    //     [...selectItems].forEach((selectItem) => {
    //
    //         let generatedInnerHTML='';
    //         const uuid=entry.id.replace('entry-','');
    //         const identifier=getEntryIndexFromId(uuid);
    //
    //         generatedInnerHTML+=categoriesFromType(typeSelectItemValue);
    //
    //
    //         selectItem.innerHTML=generatedInnerHTML;
    //     });
    // }

}
////////////////////////////////////////////////////////////////
function getFlagTypes(){
    let output='';

    for(let i=0;i<flagLabel.length;i++){
        output+='<option value="'+i+'">'+flagLabel[i]+'</option>';
    }

    return output;
}
////////////////////////////////////////////////////////////////
function getVatratesQe(){
    let output='';
    output+=getVatrates();
    output+='<option disabled value="" class="mul"></option>';
    output+='<option disabled value="multiple" class="mul">Multiple</option>';
    return output;
}
////////////////////////////////////////////////////////////////
function getVatrates(){
    let output='';

    output+='<option Xdisabled value="">VAT...</option>';
    output+='<option value="20">20%</option>';
    output+='<option value="5">5%</option>';
    output+='<option value="0">0%</option>';
    output+='<option value="N/A">N/A</option>';

    return output;
}
////////////////////////////////////////////////////////////////
function getTypesQe(amount,all){
    let output='';
    output+=getTypes(amount,all);
    output+='<option disabled value="" class="mul"></option>';
    output+='<option disabled value="multiple" class="mul">Multiple</option>';
    return output;
}
////////////////////////////////////////////////////////////////
function getTypes(amount,all,typeGroup){
    // console.log('========= getTypes',amount,all,typeGroup);

    let output='';

    output+='<option Xdisabled value="">Select type...</option>';

    if((amount===0 || amount==='') && !typeGroup){
        all=true;
    }

    if(all){
        output+= incomingTypes() + '<option value="-" disabled></option>' + outgoingTypes();
    }else{
        if(typeGroup){
            if(typeGroup==='for_invoice'){
                output+= forInvoiceTypes();
            }
            if(typeGroup==='for_invoice_refund'){
                output+= forInvoiceRefundTypes();
            }
            if(typeGroup==='for_bill'){
                output+= forBillTypes();
            }
            if(typeGroup==='for_bill_refund'){
                output+= forBillRefundTypes();
            }
        }else{
            if(amount>0){
                output+= incomingTypes();
            }
            if(amount<0){
                output+= outgoingTypes();
            }
        }
    }

    return output;

}

////////////////////////////////////////////////////////////////
function getCategoriesQe(type){
    let output='';
    output+=getCategories(type);
    output+='<option disabled value="" class="mul"></option>';
    output+='<option disabled value="multiple" class="mul">Multiple</option>';
    return output;
}
////////////////////////////////////////////////////////////////
function getCategories(type){

return categoriesFromType(type);
}

////////////////////////////////////////////////////////////////
function categoriesFromType(type){
    let output='';

    output+='<option value="">Select category...</option>';
    switch(type){
        // incoming categories
        case 'sale':
        case 'sale_refund':
            output+='<option value="income">Income</option>';
            break;
        case 'purchase':
        case 'purchase_refund':
            output+='<option value="stock_purchase">Stock purchases</option>';
            output+='<option value="wages_and_salaries">Wages and salaries</option>';
            output+='<option value="directors_salaries">Directors\' salaries</option>';
            output+='<option value="travel_and_subsistence">Travel & subsistence costs</option>';
            output+='<option value="motors_expenses">Motors expenses</option>';
            output+='<option value="other_direct_sales_costs">Other direct (sales) costs</option>';
            output+='<option value="distribution_costs">Distribution costs</option>';
            output+='<option value="subcontractor_costs">Subcontractor costs</option>';
            output+='<option value="rent_rates_and_service_charges">Rent, rates & service charges</option>';
            output+='<option value="utilities_costs">Utilities costs</option>';
            output+='<option value="telecommunications_costs">Telecommunications costs</option>';
            output+='<option value="computing_and_other_it_costs">Computing & other IT costs</option>';
            output+='<option value="advertising_and_marketing_costs">Advertising & marketing costs</option>';
            output+='<option value="consultancy_fees">Consultancy fees</option>';
            output+='<option value="pensions">Pensions</option>';
            output+='<option value="employers_ni">Employer\'s NI</option>';
            output+='<option value="other_employment_costs">Other employment costs</option>';
            output+='<option value="insurance_costs">Insurance costs</option>';
            output+='<option value="repair_and_maintenance_costs">Repair & maintenance costs</option>';
            output+='<option value="cleaning_and_refuse_costs">Cleaning & refuse costs</option>';
            output+='<option value="printing_post_and_stationery_costs">Printing, post & stationery costs</option>';
            output+='<option value="business_entertainment_costs">Business entertainment costs</option>';
            output+='<option value="finance_leases_and_hp_costs">Finance, leases & HP costs</option>';
            output+='<option value="bank_charges">Bank charges</option>';
            output+='<option value="bad_debt">Bad debt</option>';
            output+='<option value="accountancy_fees">Accountancy fees</option>';
            output+='<option value="legal_fees">Legal fees</option>';
            output+='<option value="subscription_costs">Subscription costs</option>';
            output+='<option value="other_costs">Other costs</option>';
            break;
        case 'disposal_of_capital_asset':
        case 'disposal_of_capital_asset_refund':
        case 'purchase_of_capital_asset':
        case 'purchase_of_capital_asset_refund':
            output+='<option value="motor_vehicle">Motor vehicle</option>';
            output+='<option value="fixtures_and_fittings">Fixtures & fittings</option>';
            output+='<option value="computer_equipment">Computer equipment</option>';
            output+='<option value="other">Other</option>';
            break;
        case 'other_money_in':
        case 'other_money_in_refund':
            output+='<option value="other_operating_income">Other operating income</option>';
            output+='<option value="income_from_investments">Income from investments</option>';
            output+='<option value="interest_receivable">Interest receivable</option>';
            output+='<option value="other">Other</option>';
            break;
        case 'other_money_out':
        case 'other_money_out_refund':
            output+='<option value="tax">Tax</option>';
            output+='<option value="vat">VAT</option>';
            output+='<option value="other">Other</option>';
            break;
        // case 'na_income':
        // case 'na_expense':
        //     output+='<option value="ignored">Ignored</option>';
        //     break;
        default:
            output='<option disabled value="">Select type first</option>';
    }
    return output;
}
////////////////////////////////////////////////////////////////
function incomingTypes(){
    let output='';
    output+=forInvoiceTypes();
    output+=forBillRefundTypes();
    return output;
}
////////////////////////////////////////////////////////////////
function outgoingTypes(){
    let output='';
    output+=forBillTypes();
    output+=forInvoiceRefundTypes();
    return output;
}
////////////////////////////////////////////////////////////////
function forInvoiceTypes(){
    let output='';
    output+='<option value="sale">Sale</option>';
    output+='<option value="disposal_of_capital_asset">Disposal of capital asset</option>';
    output+='<option value="other_money_in">Other money in</option>';
    return output;
}
////////////////////////////////////////////////////////////////
function forInvoiceRefundTypes(){
    let output='';
    output+='<option value="sale_refund">Refund - Sale</option>';
    output+='<option value="disposal_of_capital_asset_refund">Refund - Disposal of c. a.</option>';
    output+='<option value="other_money_in_refund">Refund - Other money in</option>';
    return output;
}
////////////////////////////////////////////////////////////////
function forBillTypes(){
    let output='';
    output+='<option value="purchase">Expense</option>';
    output+='<option value="purchase_of_capital_asset">Purchase of capital asset</option>';
    output+='<option value="other_money_out">Other money out</option>';
    return output;
}
////////////////////////////////////////////////////////////////
function forBillRefundTypes(){
    let output='';
    output+='<option value="purchase_refund">Refund - Purchase</option>';
    output+='<option value="purchase_of_capital_asset_refund">Refund - Purchase of c. a.</option>';
    output+='<option value="other_money_out_refund">Refund - Other money out</option>';
    return output;
}
////////////////////////////////////////////////////////////////

function getTypeGroup(categorisationType){
    switch(categorisationType){

        case 'sale':
        case 'disposal_of_capital_asset':
        case 'other_money_in':
            return 'for_invoice';

        case 'sale_refund':
        case 'disposal_of_capital_asset_refund':
        case 'other_money_in_refund':
            return 'for_invoice_refund';

        case 'purchase':
        case 'purchase_of_capital_asset':
        case 'other_money_out':
            return 'for_bill';

        case 'purchase_refund':
        case 'purchase_of_capital_asset_refund':
        case 'other_money_out_refund':
            return 'for_bill_refund';

        default:
            return '';
    }
}