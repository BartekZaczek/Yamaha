import getAcrylic from '@salesforce/apex/AcrylicController.getAcrylic';
import { updateRecord } from 'lightning/uiRecordApi';
import { LightningElement, track, wire } from 'lwc';
import ID_FIELD from "@salesforce/schema/Acrylic__c.Id";
import QUANTITY__C__FIELD from "@salesforce/schema/Acrylic__c.Quantity__c"
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AcrylicPlates extends LightningElement {

    @track optionsArray = [];
    @track valueId = '';
    @track valueOfQuantityInput = 0;
    @track quantity = 0;
    @track quantityToShow = 0;
    status = '';
    message = '';
    title = '';
    mode = 'dismissible';
    @track addOrDelete = '';
    @track disabledButton = true;
    @track disabledQuantityInput = true;
    @track isLoading = false;
    @track buttonLabel = 'Confirm';
    @track labelP = 'picked acrylic plate';

    @wire(getAcrylic)
        acrylics;

    get optionsAddDelete() {
         return [
            { label: 'Add', value: 'Add' },
            { label: 'Delete', value: 'Delete' },
        ];
    }    

    connectedCallback(){
        getAcrylic()
        .then( result => {
            let arr = [];
            for(var i=0; i<result.length; i++){
                arr.push({label : result[i].Name, value : result[i].Id, quantity : result[i].Quantity__c})
                console.log(this.optionsAddDelete[1].value)
            }
            this.optionsArray = arr;
        })
    }

    handleChange(event){
        this.valueId = event.detail.value;
        for(var i = 0; i<this.optionsArray.length; i++){
            if(this.valueId == this.optionsArray[i].value){
                this.quantity = this.optionsArray[i].quantity;
                this.quantityToShow = this.quantity;
                this.labelP = this.optionsArray[i].label;
                this.template.querySelector("[data-field='quantity']").value = '';
            }
        }
        this.validationOfInputActive();
    }
    
    handleChangeAddOrDelete(event){
        this.addOrDelete = event.detail.value;
        this.buttonLabel = event.detail.value;
        this.validationOfInputActive();
    }

    handleChangeInput(event){
        
        if(this.addOrDelete == this.optionsAddDelete[0].value){
            this.valueOfQuantityInput = event.detail.value;
            this.disabledButton = false;
            this.status = 'success';
            this.message = 'Acrylic plates have been successfully added to the warehouse.';
            this.title = 'Delivery confirmed!';
        }else if(this.addOrDelete == this.optionsAddDelete[1].value){
            this.valueOfQuantityInput = event.detail.value;
            this.status = 'warning';
            this.message = 'Acrylic plates have been successfully deleted.';
            this.title = 'Material pickup approved!';
            if(this.valueOfQuantityInput <= this.quantity && this.valueOfQuantityInput != 0){
                this.disabledButton = false;
            }else {
                this.disabledButton = true;
            }
        }
    }

    validationOfInputActive(){
        if((this.addOrDelete != '' && this.addOrDelete != null) && (this.valueId != '' && this.valueId != null)){
            this.disabledQuantityInput = false;
        }
    }

    showToast(title, message, variant, mode) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(event);
    }

    handleIsLoading(isLoading) {
        this.isLoading = isLoading;
    }

    handleClick(){
        this.handleIsLoading(true);
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.valueId;
        if(this.addOrDelete == this.optionsAddDelete[0].value){
            fields[QUANTITY__C__FIELD.fieldApiName] = parseInt(this.valueOfQuantityInput) + parseInt(this.quantity);
        }else if(this.addOrDelete == this.optionsAddDelete[1].value){
            fields[QUANTITY__C__FIELD.fieldApiName] = parseInt(this.quantity) - parseInt(this.valueOfQuantityInput);
        }
        const recordInput = { fields };
        updateRecord(recordInput).then((record) => {
            refreshApex(this.acrylics);
            this.showToast(this.tittle, this.message, this.status, this.mode);
            this.updateRecordView();
        }).catch(error => {
            this.showToast('Error updating or refreshing records', error.body.message, 'Error', this.mode);
        }).finally(() => {
            this.handleIsLoading(false);
        })
        
    }

    updateRecordView() {
        setTimeout(() => {
             eval("$A.get('e.force:refreshView').fire();");
        }, 200); 
     }
}