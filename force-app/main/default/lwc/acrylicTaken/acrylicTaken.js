import getAcrylic from '@salesforce/apex/AcrylicController.getAcrylic';
import LightningAlert from 'lightning/alert';
import ID_FIELD from "@salesforce/schema/Acrylic__c.Id";
import QUANTITY__C__FIELD from "@salesforce/schema/Acrylic__c.Quantity__c"
import { updateRecord } from 'lightning/uiRecordApi';
import { LightningElement, track } from 'lwc';

export default class AcrylicTaken extends LightningElement {

    @track optionsArray = [];
    @track value = '';
    @track label = '';
    @track quantity = 0;
    @track reducedQuantity = 0;
    get options(){
        return this.optionsArray;
    }

    connectedCallback(){
        getAcrylic()
            .then( result => {
                let arr = [];
                for(var i = 0; i < result.length; i++){
                    arr.push({ label : result[i].Name , value : result[i].Id , quantity : result[i].Quantity__c})
                    console.log(arr[i]);
                }
                this.optionsArray = arr;
            })
    }

    handleChange(event){
        this.value = event.detail.value;
        
        for(var i = 0; i<this.optionsArray.length; i++){
            if(this.value == this.optionsArray[i].value){
                this.quantity = this.optionsArray[i].quantity;
            }
        }
        console.log(event.detail.value);
        this.validation();
        
    }

    validation(){
        this.reducedQuantity = this.template.querySelector("lightning-input").value;
        const btn = this.template.querySelector("lightning-button");
        console.log(this.reducedQuantity);
        if(this.template.querySelector("lightning-combobox").value != '' && this.reducedQuantity > 0 && this.quantity >= this.reducedQuantity ){
            btn.disabled = false;
        }else{
            btn.disabled = true;
            console.log('empty');
        }
    }

    async handleAlert() {
        await LightningAlert.open({
            message: 'Acrylic plates have been successfully deleted.',
            theme: 'warning', 
            label: ' Material pickup approved!', 
        });
        
    }

    handleClick(){
        const fields = {};
        
        fields[ID_FIELD.fieldApiName] = this.value;
        fields[QUANTITY__C__FIELD.fieldApiName] = parseInt(this.quantity) - parseInt(this.reducedQuantity);
        console.log('red:' + this.reducedQuantity + 'q:' + this.quantity);
        const recordInput = {fields: fields};
        updateRecord(recordInput).then((record) => {
            console.log(record);
            this.handleAlert();
            this.template.querySelector("lightning-input").value = 0;
        })
    }
}