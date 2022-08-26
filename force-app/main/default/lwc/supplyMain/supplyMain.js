import getAcrylic from '@salesforce/apex/AcrylicController.getAcrylic';
import ID_FIELD from "@salesforce/schema/Acrylic__c.Id";
import QUANTITY__C__FIELD from "@salesforce/schema/Acrylic__c.Quantity__c"
import { updateRecord } from 'lightning/uiRecordApi';
import { LightningElement, track, wire } from 'lwc';
export default class SupplyMain extends LightningElement {
    @track optionsArray = []; 
    @track value = '';
    @track label = '';
    @track addedQuantity = 0;
    @track acrylicName = '';
    
   /* get options(){
        return [ 
            {label : 'new', value : 'new'},
            {label : 'new', value : 'new'}
        ];
    }
    handleChange(event){
        this.value = event.detail.value;
    }*/

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
                arr.push({ label : result[i].Name , value : result[i].Id })
            }
            this.optionsArray = arr;
        })
    }

    handleChange(event){
        this.value = event.detail.value;
        if(this.template.querySelector("lightning-input") != null){
            const btn = this.template.querySelector("lightning-button");
            btn.disabled = false;
            console.log(btn);
        }else{
            console.log('empty');
        }
            
        
    }

    handleClick(event){
       this.addedQuantity = this.template.querySelector("lightning-input").value;
       this.acrylicName = this.value;
       console.log(this.addedQuantity);
       console.log(this.acrylicName);


       const fields = {};

       fields[ID_FIELD.fieldApiName] = this.value;
       fields[QUANTITY__C__FIELD.fieldApiName] = this.addedQuantity;
       
       const recordInput = { fields: fields };

       updateRecord(recordInput).then((record) => {
        console.log(record);
      });
            
        
    }
        
       
}

