import getAcrylic from '@salesforce/apex/AcrylicController.getAcrylic';
import ID_FIELD from "@salesforce/schema/Acrylic__c.Id";
import QUANTITY__C__FIELD from "@salesforce/schema/Acrylic__c.Quantity__c"
import { updateRecord } from 'lightning/uiRecordApi';
import { LightningElement, track, wire } from 'lwc';
export default class SupplyMain extends LightningElement {
    @track optionsArray = []; 
    @track value = '';
    @track label = '';
    @track quantity = 0;
    @track addedQuantity = 0;
    

    @wire(getAcrylic)
    acrylics;
    

    get options(){
        return this.optionsArray;
    }

    connectedCallback(){
        getAcrylic()
        .then( result=> {
            let arr = [];
            for( var i = 0; i < result.length; i++){
                arr.push({ label : result[i].Name , value : result[i].Id, quantity : result[i].Quantity__c })
                console.log(arr[i]);
            }
            this.optionsArray = arr;
        })
    }

    handleChange(event){
        this.value = event.detail.value;
        this.validation();
        for(var i = 0; i<this.optionsArray.length; i++){
            if(this.value == this.optionsArray[i].value){
                this.quantity = this.optionsArray[i].quantity;
            }
        }  
    }

    validation(){
        this.addedQuantity = this.template.querySelector("lightning-input").value;
        const btn = this.template.querySelector("lightning-button");
        if(this.template.querySelector("lightning-combobox").value != '' && this.addedQuantity > 0 ){
            btn.disabled = false;
        }else{
            btn.disabled = true;
            console.log('empty');
        }
        
    }

    handleClick(){
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.value;
        fields[QUANTITY__C__FIELD.fieldApiName] = parseInt(this.addedQuantity) + parseInt(this.quantity);
        const recordInput = { fields: fields };
        updateRecord(recordInput).then((record) => {
        console.log(record);
      });
            
        
    }
        
       
}

